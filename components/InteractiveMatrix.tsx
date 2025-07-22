'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Maximize2, Minimize2, Grid, Target, TrendingUp, Users, BarChart3, X, Calendar, User, Info } from 'lucide-react';
import { useHoshinStore } from '@/store/hoshinStore';
import { createPortal } from 'react-dom';

// Enhanced types for correlations with strength and coordinates
interface CorrelationSymbol {
  id: string;
  symbol: '●' | '◐' | '○' | '◦' | '×' | '▼';
  meaning: string;
  color: string;
  strength: number; // 0-5 rating for relationship strength
}

interface CorrelationCell {
  rowId: string;
  colId: string;
  coordinate: string; // A1, B2, etc.
  symbol?: CorrelationSymbol;
  reasoning?: string; // Explanation of correlation calculation
  editable: boolean;
}


// Union type for matrix items
type MatrixItem = {
  id: string;
  title?: string;
  name?: string;
  description?: string;
  progress?: number;
  owner?: string;
  status?: string;
  targetDate?: string;
  startDate?: string;
  endDate?: string;
  resources?: string[];
  current?: number;
  target?: number;
  unit?: string;
  frequency?: string;
  priority?: string;
  targetYear?: string | number;
} | string;

// Enhanced correlation symbols with professional design and strength indicators
const CORRELATION_SYMBOLS: CorrelationSymbol[] = [
  { id: 'strong-positive', symbol: '●', meaning: 'Strong Positive', color: '#059669', strength: 5 },
  { id: 'moderate-positive', symbol: '◐', meaning: 'Moderate Positive', color: '#0891b2', strength: 4 },
  { id: 'weak-positive', symbol: '○', meaning: 'Weak Positive', color: '#0284c7', strength: 3 },
  { id: 'minimal-impact', symbol: '◦', meaning: 'Minimal Impact', color: '#64748b', strength: 2 },
  { id: 'no-relationship', symbol: '×', meaning: 'No Relationship', color: '#94a3b8', strength: 1 },
  { id: 'negative-impact', symbol: '▼', meaning: 'Negative Impact', color: '#dc2626', strength: 0 }
];


const InteractiveMatrix: React.FC = () => {
  const { strategicObjectives, annualObjectives, processes, metrics, loadDataset, hasDummyData } = useHoshinStore();
  const [correlations, setCorrelations] = useState<CorrelationCell[]>([]);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<MatrixItem | null>(null);
  const [highlightedCards, setHighlightedCards] = useState<Set<string>>(new Set());
  const [highlightedCorrelationType, setHighlightedCorrelationType] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Ensure component is mounted before using portals and load sample data if empty
  useEffect(() => {
    setIsMounted(true);
    
    // Load sample data if no data exists
    if (!hasDummyData()) {
      loadDataset('foreign-policy');
    }
  }, [hasDummyData, loadDataset]);

  // Get unique owners for WHO section
  const uniqueOwners = React.useMemo(() => {
    const owners = new Set<string>();
    [...strategicObjectives, ...annualObjectives, ...processes, ...metrics].forEach(item => {
      if ('owner' in item && item.owner) owners.add(item.owner);
    });
    return Array.from(owners).slice(0, 6);
  }, [strategicObjectives, annualObjectives, processes, metrics]);

  // State for correlation matrix type
  const [correlationMatrixType, setCorrelationMatrixType] = useState<{
    rowType: string;
    colType: string;
    rowItems: any[];
    colItems: any[];
    rowLabel: string;
    colLabel: string;
  }>({ rowType: '', colType: '', rowItems: [], colItems: [], rowLabel: '', colLabel: '' });

  // Determine the best correlation matrix to show based on available data
  useEffect(() => {
    const determineCorrelationMatrix = () => {
      // Priority order for correlations based on Hoshin Kanri methodology
      const correlationOptions = [
        {
          condition: strategicObjectives.length > 0 && processes.length > 0,
          rowType: 'strategic',
          colType: 'processes', 
          rowItems: strategicObjectives.slice(0, 3),
          colItems: processes.slice(0, 3),
          rowLabel: 'WHAT',
          colLabel: 'HOW'
        },
        {
          condition: annualObjectives.length > 0 && processes.length > 0,
          rowType: 'annual',
          colType: 'processes',
          rowItems: annualObjectives.slice(0, 3), 
          colItems: processes.slice(0, 3),
          rowLabel: 'HOW FAR',
          colLabel: 'HOW'
        },
        {
          condition: processes.length > 0 && metrics.length > 0,
          rowType: 'processes',
          colType: 'metrics',
          rowItems: processes.slice(0, 3),
          colItems: metrics.slice(0, 3),
          rowLabel: 'HOW',
          colLabel: 'HOW MUCH'
        },
        {
          condition: strategicObjectives.length > 0 && annualObjectives.length > 0,
          rowType: 'strategic',
          colType: 'annual',
          rowItems: strategicObjectives.slice(0, 3),
          colItems: annualObjectives.slice(0, 3),
          rowLabel: 'WHAT',
          colLabel: 'HOW FAR'
        }
      ];

      // Select the first available correlation type
      const selectedCorrelation = correlationOptions.find(option => option.condition);
      
      if (selectedCorrelation) {
        setCorrelationMatrixType({
          rowType: selectedCorrelation.rowType,
          colType: selectedCorrelation.colType,
          rowItems: selectedCorrelation.rowItems,
          colItems: selectedCorrelation.colItems,
          rowLabel: selectedCorrelation.rowLabel,
          colLabel: selectedCorrelation.colLabel
        });
      }
    };

    determineCorrelationMatrix();
  }, [strategicObjectives, annualObjectives, processes, metrics]);

  // Calculate intelligent correlations based on actual data relationships
  useEffect(() => {
    if (!correlationMatrixType.rowItems?.length || !correlationMatrixType.colItems?.length) {
      setCorrelations([]);
      return;
    }

    const calculateIntelligentCorrelations = () => {
      const newCorrelations: CorrelationCell[] = [];
      
      correlationMatrixType.rowItems.forEach((rowItem, rowIndex) => {
        correlationMatrixType.colItems.forEach((colItem, colIndex) => {
          const coordinate = `${String.fromCharCode(65 + rowIndex)}${colIndex + 1}`;
          
          // Calculate correlation strength based on multiple factors
          const correlation = calculateCorrelationStrength(
            rowItem, 
            colItem, 
            correlationMatrixType.rowType, 
            correlationMatrixType.colType
          );
          
          newCorrelations.push({
            rowId: rowItem.id,
            colId: colItem.id,
            coordinate,
            symbol: correlation.symbol,
            reasoning: correlation.reasoning,
            editable: true
          });
        });
      });
      
      setCorrelations(newCorrelations);
    };

    // Specific correlation calculation functions
    const calculateStrategicProcessCorrelation = (strategic: any, process: any, factors: string[]) => {
      let score = 0;
      // Check if process supports any annual objectives linked to this strategic objective
      const linkedAnnuals = annualObjectives.filter(annual => 
        annual.strategicObjectiveIds?.includes(strategic.id)
      );
      const processSupportsStrategy = linkedAnnuals.some(annual =>
        process.annualObjectiveIds?.includes(annual.id)
      );
      
      if (processSupportsStrategy) {
        score += 40;
        factors.push('Process supports strategic objective through annual objectives');
      }
      return score;
    };

    const calculateAnnualProcessCorrelation = (annual: any, process: any, factors: string[]) => {
      let score = 0;
      // Direct relationship (process supports this annual objective)
      if (process.annualObjectiveIds?.includes(annual.id)) {
        score += 40;
        factors.push('Direct support relationship');
      }

      // Progress correlation
      if (annual.progress !== undefined && annual.progress > 0) {
        if (annual.progress >= 75) {
          score += 15;
          factors.push('High annual progress');
        } else if (annual.progress >= 50) {
          score += 10;
          factors.push('Moderate annual progress');
        } else if (annual.progress >= 25) {
          score += 5;
          factors.push('Some annual progress');
        }
      }
      return score;
    };

    const calculateProcessMetricCorrelation = (process: any, metric: any, factors: string[]) => {
      let score = 0;
      // Check if metric measures this process (if metrics have processIds)
      // For now, use common factors like same owner, similar timeline
      return score;
    };

    const calculateStrategicAnnualCorrelation = (strategic: any, annual: any, factors: string[]) => {
      let score = 0;
      // Direct relationship (annual objective supports this strategic objective)
      if (annual.strategicObjectiveIds?.includes(strategic.id)) {
        score += 40;
        factors.push('Annual objective directly supports strategic objective');
      }

      // Priority alignment
      if (strategic.priority === 'high' && annual.progress >= 75) {
        score += 15;
        factors.push('High priority strategic with high annual progress');
      }
      return score;
    };

    const calculateCommonFactors = (item1: any, item2: any, factors: string[]) => {
      let score = 0;

      // Status alignment
      const status1Score = getStatusScore(item1.status);
      const status2Score = getStatusScore(item2.status);
      const statusAlignment = Math.abs(status1Score - status2Score);
      
      if (statusAlignment === 0) {
        score += 20;
        factors.push('Perfect status alignment');
      } else if (statusAlignment <= 1) {
        score += 10;
        factors.push('Good status alignment');
      }

      // Owner relationship
      if (item1.owner && item2.owner && item1.owner === item2.owner) {
        score += 15;
        factors.push('Same owner');
      }

      // Priority alignment
      if (item1.priority === 'high' || item2.priority === 'high') {
        score += 5;
        factors.push('High priority item');
      }

      return score;
    };

    const calculateCorrelationStrength = (rowItem: any, colItem: any, rowType: string, colType: string) => {
      let score = 0;
      let factors = [];

      // Calculate correlation based on the types being compared
      if (rowType === 'strategic' && colType === 'processes') {
        // WHAT ↔ HOW: Strategic Objectives vs Processes
        score += calculateStrategicProcessCorrelation(rowItem, colItem, factors);
      } else if (rowType === 'annual' && colType === 'processes') {
        // HOW FAR ↔ HOW: Annual Objectives vs Processes  
        score += calculateAnnualProcessCorrelation(rowItem, colItem, factors);
      } else if (rowType === 'processes' && colType === 'metrics') {
        // HOW ↔ HOW MUCH: Processes vs Metrics
        score += calculateProcessMetricCorrelation(rowItem, colItem, factors);
      } else if (rowType === 'strategic' && colType === 'annual') {
        // WHAT ↔ HOW FAR: Strategic vs Annual Objectives
        score += calculateStrategicAnnualCorrelation(rowItem, colItem, factors);
      }

      // Common factors that apply to all correlation types
      score += calculateCommonFactors(rowItem, colItem, factors);

      // Determine correlation symbol based on total score
      let symbol;
      if (score >= 70) {
        symbol = CORRELATION_SYMBOLS.find(s => s.id === 'strong-positive');
      } else if (score >= 50) {
        symbol = CORRELATION_SYMBOLS.find(s => s.id === 'moderate-positive');
      } else if (score >= 30) {
        symbol = CORRELATION_SYMBOLS.find(s => s.id === 'weak-positive');
      } else if (score >= 15) {
        symbol = CORRELATION_SYMBOLS.find(s => s.id === 'minimal-impact');
      } else if (score > 0) {
        symbol = CORRELATION_SYMBOLS.find(s => s.id === 'minimal-impact');
      } else {
        symbol = CORRELATION_SYMBOLS.find(s => s.id === 'no-relationship');
      }

      return {
        symbol,
        score,
        factors,
        reasoning: `Score: ${score}/100. Factors: ${factors.join(', ')}`
      };
    };

    const getStatusScore = (status: string): number => {
      switch (status) {
        case 'completed': return 4;
        case 'in-progress': return 3;
        case 'planning': return 2;
        case 'not-started': return 1;
        case 'on-hold': return 0;
        case 'at-risk': return 0;
        default: return 1;
      }
    };

    calculateIntelligentCorrelations();
  }, [correlationMatrixType, annualObjectives, processes, strategicObjectives, metrics]);

  // Handle fullscreen toggle with proper body scroll management
  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(prev => {
      const newValue = !prev;
      
      // Prevent body scroll when in fullscreen
      if (newValue) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
      
      return newValue;
    });
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Handle ESC key to exit fullscreen
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFullscreen) {
        toggleFullscreen();
      }
    };

    if (isFullscreen) {
      document.addEventListener('keydown', handleEscKey);
      return () => document.removeEventListener('keydown', handleEscKey);
    }
  }, [isFullscreen, toggleFullscreen]);

  // Handle card click
  const handleCardClick = useCallback((item: MatrixItem) => {
    setSelectedCard(item);
    
    // Find related cards
    const related = new Set<string>();
    const itemId = isStringItem(item) ? item : item.id;
    const itemOwner = isObjectItem(item) ? item.owner : undefined;
    
    // Add cards with same owner
    if (itemOwner) {
      [...strategicObjectives, ...annualObjectives, ...processes, ...metrics].forEach(otherItem => {
        if (isObjectItem(otherItem) && otherItem.owner === itemOwner && otherItem.id !== itemId) {
          related.add(otherItem.id);
        }
      });
    }
    
    // Add cards with correlations
    correlations.forEach(corr => {
      if (corr.rowId === itemId) {
        related.add(corr.colId);
      } else if (corr.colId === itemId) {
        related.add(corr.rowId);
      }
    });
    
    setHighlightedCards(related);
  }, [correlations, strategicObjectives, annualObjectives, processes, metrics]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setSelectedCard(null);
        setHighlightedCards(new Set());
      }
    };

    if (selectedCard) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [selectedCard]);




  // Type guard functions
  const isStringItem = (item: MatrixItem): item is string => {
    return typeof item === 'string';
  };

  const isObjectItem = (item: MatrixItem): item is Exclude<MatrixItem, string> => {
    return typeof item === 'object' && item !== null;
  };

  // Enhanced render clickable item with professional styling
  const renderClickableItem = (
    item: MatrixItem, 
    bgColor: string, 
    textColor: string = 'text-gray-800',
    borderColor: string = 'border-gray-200'
  ) => {
    const itemId = isStringItem(item) ? item : item.id;
    const displayText = isStringItem(item) ? item : (item.title || item.name || '');
    const isHighlighted = highlightedCards.has(itemId);
    
    return (
      <div 
        key={itemId}
        className={`${bgColor} ${textColor} ${borderColor} p-2 rounded-lg border h-full flex flex-col cursor-pointer transition-all duration-200 group relative overflow-hidden ${
          isHighlighted 
            ? 'scale-[1.02] shadow-lg ring-1 ring-blue-400/50 z-20 transform' 
            : 'hover:shadow-md hover:scale-[1.01] hover:border-opacity-60'
        }`}
        onClick={() => handleCardClick(item)}
        style={{ minHeight: '80px' }}
      >
        {/* Professional gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="relative z-10 flex-1 flex flex-col">
          {/* Compact title */}
          <div className="font-semibold leading-tight mb-1 flex-shrink-0">
            <div className="line-clamp-1 break-words text-xs" title={displayText}>
              {displayText}
            </div>
          </div>
          
          {/* Compact description */}
          {isObjectItem(item) && item.description && (
            <div className="text-xs opacity-60 font-normal leading-tight mb-1 flex-1">
              <div className="line-clamp-1 break-words" title={item.description}>
                {item.description.length > 40 ? item.description.substring(0, 40) + '...' : item.description}
              </div>
            </div>
          )}
          
          {/* Compact progress bar */}
          {isObjectItem(item) && item.progress !== undefined && (
            <div className="mt-auto mb-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs opacity-60">Progress</span>
                <span className="text-xs font-semibold">{item.progress}%</span>
              </div>
              <div className="w-full bg-white/60 rounded-full h-1.5">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-1.5 rounded-full transition-all duration-300" 
                  style={{ width: `${item.progress}%` }}
                ></div>
              </div>
            </div>
          )}
          
          {/* Compact owner */}
          {isObjectItem(item) && item.owner && (
            <div className="text-xs mt-auto pt-1 border-t border-white/20 flex items-center gap-1 flex-shrink-0 opacity-70">
              <User size={10} className="text-current" />
              <span className="truncate text-xs" title={item.owner}>
                {item.owner}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Clean and organized Modal Component
  const renderModal = () => {
    if (!selectedCard) return null;

    const item = selectedCard;
    const isString = isStringItem(item);
    const displayTitle = isString ? item : (item.title || item.name || 'Untitled');

    // Organize data into logical groups
    const hasBasicInfo = !isString && (item.description || item.owner || item.status);
    const hasProgress = !isString && item.progress !== undefined;
    const hasTimeline = !isString && (item.targetDate || item.startDate || item.endDate || item.targetYear);
    const hasMetrics = !isString && (item.current !== undefined || item.target !== undefined);
    const hasResources = !isString && item.resources && item.resources.length > 0;
    const hasPriority = !isString && item.priority;

    return (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-[10000] p-6">
        <div 
          ref={modalRef}
          className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] max-w-5xl w-full max-h-[90vh] overflow-hidden border border-white/20"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.2)'
          }}
        >
          {/* Minimal Clean Header */}
          <div className="relative px-8 py-6 border-b border-gray-200/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Grid className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{displayTitle}</h2>
                  <p className="text-sm text-gray-500 font-medium mt-0.5">Strategic Element Details</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedCard(null);
                  setHighlightedCards(new Set());
                }}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-100/50 rounded-xl transition-all duration-200 group"
              >
                <X className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
              </button>
            </div>
            {/* Subtle header decoration */}
            <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
          </div>

          {/* Clean Modal Content with better scrolling */}
          <div className="overflow-y-auto max-h-[calc(90vh-120px)] modal-scroll">
            {!isString ? (
              <div className="p-8 space-y-8">
                
                {/* Description Section - Full Width */}
                {item.description && (
                  <div className="bg-gray-50/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Info className="w-5 h-5 text-blue-600" />
                      Description
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-base">{item.description}</p>
                  </div>
                )}

                {/* Key Information Row */}
                {(hasProgress || hasBasicInfo) && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Progress Card */}
                    {hasProgress && (
                      <div className="bg-gradient-to-br from-emerald-50/80 to-emerald-100/80 backdrop-blur-sm p-6 rounded-xl border border-emerald-200/50">
                        <div className="flex items-center gap-2 mb-4">
                          <TrendingUp className="w-5 h-5 text-emerald-600" />
                          <h4 className="font-semibold text-emerald-800">Progress</h4>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-emerald-700 mb-2">{item.progress}%</div>
                          <div className="w-full bg-emerald-200/60 rounded-full h-3 mb-2">
                            <div 
                              className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full transition-all duration-1000" 
                              style={{ width: `${item.progress}%` }}
                            ></div>
                          </div>
                          <p className="text-sm text-emerald-600 font-medium">Complete</p>
                        </div>
                      </div>
                    )}

                    {/* Owner Card */}
                    {item.owner && (
                      <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/80 backdrop-blur-sm p-6 rounded-xl border border-blue-200/50">
                        <div className="flex items-center gap-2 mb-4">
                          <User className="w-5 h-5 text-blue-600" />
                          <h4 className="font-semibold text-blue-800">Owner</h4>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-blue-800">{item.owner}</p>
                          <p className="text-sm text-blue-600 mt-1">Responsible</p>
                        </div>
                      </div>
                    )}

                    {/* Status Card */}
                    {item.status && (
                      <div className="bg-gradient-to-br from-purple-50/80 to-purple-100/80 backdrop-blur-sm p-6 rounded-xl border border-purple-200/50">
                        <h4 className="font-semibold text-purple-800 mb-4">Status</h4>
                        <div className="text-center">
                          <span className={`inline-block px-4 py-2 rounded-lg text-sm font-bold capitalize backdrop-blur-sm ${
                            item.status === 'completed' ? 'bg-green-200/80 text-green-800' :
                            item.status === 'in-progress' ? 'bg-blue-200/80 text-blue-800' :
                            item.status === 'pending' ? 'bg-yellow-200/80 text-yellow-800' :
                            'bg-purple-200/80 text-purple-800'
                          }`}>
                            {item.status.replace('-', ' ')}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Metrics Section - Prominent Display */}
                {hasMetrics && (
                  <div className="bg-gradient-to-r from-pink-50/80 to-rose-50/80 backdrop-blur-sm rounded-xl p-8 border border-pink-200/50">
                    <div className="flex items-center gap-2 mb-6">
                      <BarChart3 className="w-6 h-6 text-pink-600" />
                      <h3 className="text-xl font-bold text-pink-800">Performance Metrics</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                      <div>
                        <div className="flex items-baseline gap-2 mb-4">
                          <span className="text-4xl font-bold text-pink-700">
                            {item.current?.toLocaleString() || '0'}
                          </span>
                          <span className="text-2xl text-pink-400">/</span>
                          <span className="text-3xl font-semibold text-pink-600">
                            {item.target?.toLocaleString() || '0'}
                          </span>
                          {item.unit && <span className="text-xl text-pink-500 ml-1">{item.unit}</span>}
                        </div>
                        {item.frequency && (
                          <span className="inline-block px-3 py-1 bg-pink-200/80 text-pink-700 rounded-lg text-sm font-semibold backdrop-blur-sm">
                            {item.frequency}
                          </span>
                        )}
                      </div>
                      
                      {item.current && item.target && (
                        <div>
                          <div className="w-full bg-pink-200/60 rounded-full h-4 mb-3">
                            <div 
                              className="bg-gradient-to-r from-pink-500 to-rose-500 h-4 rounded-full transition-all duration-1000" 
                              style={{ width: `${Math.min((item.current / item.target) * 100, 100)}%` }}
                            ></div>
                          </div>
                          <p className="text-center text-pink-600 font-semibold">
                            {((item.current / item.target) * 100).toFixed(1)}% of target
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Secondary Information Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Timeline */}
                  {hasTimeline && (
                    <div className="bg-gradient-to-br from-orange-50/80 to-amber-50/80 backdrop-blur-sm p-6 rounded-xl border border-orange-200/50">
                      <div className="flex items-center gap-2 mb-4">
                        <Calendar className="w-5 h-5 text-orange-600" />
                        <h4 className="font-semibold text-orange-800">Timeline</h4>
                      </div>
                      <div className="space-y-3">
                        {item.startDate && (
                          <div className="flex justify-between">
                            <span className="text-orange-700 font-medium">Start:</span>
                            <span className="text-orange-600">{new Date(item.startDate).toLocaleDateString()}</span>
                          </div>
                        )}
                        {item.endDate && (
                          <div className="flex justify-between">
                            <span className="text-orange-700 font-medium">End:</span>
                            <span className="text-orange-600">{new Date(item.endDate).toLocaleDateString()}</span>
                          </div>
                        )}
                        {item.targetDate && (
                          <div className="flex justify-between">
                            <span className="text-orange-700 font-medium">Target:</span>
                            <span className="text-orange-600">{new Date(item.targetDate).toLocaleDateString()}</span>
                          </div>
                        )}
                        {item.targetYear && (
                          <div className="flex justify-between">
                            <span className="text-orange-700 font-medium">Target Year:</span>
                            <span className="text-orange-600 font-bold">{item.targetYear}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Priority */}
                  {hasPriority && (
                    <div className="bg-gradient-to-br from-yellow-50/80 to-amber-50/80 backdrop-blur-sm p-6 rounded-xl border border-yellow-200/50">
                      <h4 className="font-semibold text-yellow-800 mb-4">Priority Level</h4>
                      <div className="text-center">
                        <span className={`inline-block px-6 py-3 rounded-xl text-base font-bold capitalize backdrop-blur-sm ${
                          item.priority === 'high' ? 'bg-red-200/80 text-red-800' :
                          item.priority === 'medium' ? 'bg-yellow-200/80 text-yellow-800' :
                          'bg-green-200/80 text-green-800'
                        }`}>
                          {item.priority} Priority
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Resources Section - Fixed with proper type checking */}
                {hasResources && !isString && item.resources && (
                  <div className="bg-gradient-to-br from-indigo-50/80 to-blue-50/80 backdrop-blur-sm p-6 rounded-xl border border-indigo-200/50">
                    <h4 className="font-semibold text-indigo-800 mb-4 text-lg">Resources</h4>
                    <div className="flex flex-wrap gap-3">
                      {item.resources.map((resource, index) => (
                        <span 
                          key={index}
                          className="px-4 py-2 bg-indigo-200/80 text-indigo-800 rounded-lg text-sm font-semibold backdrop-blur-sm"
                        >
                          {resource}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Connections Footer */}
                {highlightedCards.size > 0 && (
                  <div className="bg-gradient-to-r from-gray-50/80 to-blue-50/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 border-dashed">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <h4 className="font-semibold text-gray-800">Strategic Connections</h4>
                    </div>
                    <p className="text-gray-600">
                      Connected to <span className="font-bold text-blue-600">{highlightedCards.size}</span> other elements through strategic alignment, correlations, or shared ownership.
                    </p>
                  </div>
                )}
                
              </div>
            ) : (
              // Simple view for string items
              <div className="p-8 text-center">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Simple Element</h3>
                <p className="text-gray-600">This is a simple text element in the matrix.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Enhanced Matrix Content Component
  const MatrixContent = () => (
    <>
      <style jsx>{`
        :root {
          /* Professional color system for quadrants */
          --strategic-objectives: #10b981; /* Green - WHAT */
          --annual-objectives: #f59e0b;    /* Amber - HOW FAR */
          --key-processes: #3b82f6;        /* Blue - HOW */
          --metrics: #ec4899;              /* Pink - HOW MUCH */
          --owners: #8b5cf6;               /* Purple - WHO */
          
          /* Grid and structure colors */
          --grid-border: #e2e8f0;
          --grid-background: #f8fafc;
          --cell-hover: #f1f5f9;
          --cell-selected: #dbeafe;
          
          /* Enhanced gradient backgrounds */
          --strategic-bg: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
          --annual-bg: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
          --process-bg: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
          --metrics-bg: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%);
          --owners-bg: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .scrollable-section {
          scrollbar-width: thin;
          scrollbar-color: rgba(156, 163, 175, 0.4) transparent;
        }
        
        .scrollable-section::-webkit-scrollbar {
          width: 8px;
        }
        
        .scrollable-section::-webkit-scrollbar-track {
          background: rgba(241, 245, 249, 0.5);
          border-radius: 4px;
        }
        
        .scrollable-section::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, rgba(148, 163, 184, 0.6) 0%, rgba(148, 163, 184, 0.4) 100%);
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        .scrollable-section::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, rgba(100, 116, 139, 0.7) 0%, rgba(100, 116, 139, 0.5) 100%);
        }
        
        /* Enhanced modal scrollbar */
        .modal-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(156, 163, 175, 0.3) transparent;
        }
        
        .modal-scroll::-webkit-scrollbar {
          width: 8px;
        }
        
        .modal-scroll::-webkit-scrollbar-track {
          background: rgba(241, 245, 249, 0.3);
          border-radius: 4px;
        }
        
        .modal-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, rgba(148, 163, 184, 0.4) 0%, rgba(148, 163, 184, 0.2) 100%);
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }
        
        .modal-scroll::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, rgba(100, 116, 139, 0.6) 0%, rgba(100, 116, 139, 0.4) 100%);
        }
        
        /* Professional quadrant styling */
        .quadrant-strategic {
          background: var(--strategic-bg);
          border-color: var(--strategic-objectives);
        }
        
        .quadrant-annual {
          background: var(--annual-bg);
          border-color: var(--annual-objectives);
        }
        
        .quadrant-process {
          background: var(--process-bg);
          border-color: var(--key-processes);
        }
        
        .quadrant-metrics {
          background: var(--metrics-bg);
          border-color: var(--metrics);
        }
        
        .quadrant-owners {
          background: var(--owners-bg);
          border-color: var(--owners);
        }
        
        /* Enhanced grid styling */
        .matrix-grid {
          background: var(--grid-background);
          border: 3px solid var(--grid-border);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15), 
                      0 0 0 1px rgba(255, 255, 255, 0.8),
                      inset 0 1px 0 rgba(255, 255, 255, 0.6);
        }
        
        .matrix-cell:hover {
          background-color: var(--cell-hover);
          transform: translateZ(0) scale(1.01);
        }
        
        .matrix-cell.selected {
          background-color: var(--cell-selected);
          box-shadow: 0 0 0 2px #3b82f6;
        }
        
        /* Responsive design */
        @media (max-width: 1200px) {
          .matrix-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: auto;
            gap: 1.5rem;
            height: auto !important;
            min-height: auto !important;
          }
          
          .matrix-grid > div {
            grid-column: span 1 !important;
            grid-row: auto !important;
            min-height: 300px;
          }
          
          /* Stack quadrants in mobile-friendly order */
          .quadrant-strategic { order: 1; }
          .quadrant-annual { order: 2; }
          .quadrant-process { order: 3; }
          .quadrant-metrics { order: 4; }
          .quadrant-owners { order: 5; }
          
          /* Hide correlation matrix on smaller screens */
          .matrix-grid > div[class*="col-span-6 row-span-6"] {
            display: none;
          }
        }
        
        @media (max-width: 768px) {
          .matrix-grid {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
            gap: 1rem;
            padding: 1rem;
          }
          
          .matrix-grid > div {
            grid-column: span 1 !important;
            grid-row: auto !important;
            min-height: 250px;
            padding: 1rem !important;
          }
        }
      `}</style>

      <div className={`${isFullscreen ? 'p-10' : 'p-8'} ${isFullscreen ? 'h-full overflow-auto' : ''} bg-gradient-to-br from-gray-50 to-white`}>
        {/* Compact Professional Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-md">
              <Grid className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">X-Matrix</h1>
              <p className="text-sm text-gray-600">Hoshin Kanri Strategic Framework</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              className="p-2 bg-white hover:bg-gray-50 rounded-lg shadow border border-gray-200 transition-all duration-200"
              title={isFullscreen ? "Exit Fullscreen (ESC)" : "Enter Fullscreen"}
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4 text-gray-600" />
              ) : (
                <Maximize2 className="w-4 h-4 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Enhanced Professional Matrix Grid */}
        <div className="relative">
          <div className="matrix-grid grid grid-cols-12 grid-rows-12 gap-4 rounded-2xl p-4 transition-all duration-300" 
               style={{ minHeight: isFullscreen ? '80vh' : '800px', height: 'auto' }}>
            
            {/* Enhanced corner with branding */}
            <div className="col-span-3 row-span-3 bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl border-2 border-gray-300 flex items-center justify-center">
              <div className="text-center">
                <div className="text-gray-500 font-bold text-lg mb-1">X-MATRIX</div>
                <div className="text-gray-400 text-sm font-medium">Strategic Framework</div>
              </div>
            </div>
            
            {/* HOW (Top - Processes) - Compact */}
            <div className="col-span-6 row-span-3 quadrant-process rounded-lg border-2 p-3 shadow-lg flex flex-col transition-all duration-300 hover:shadow-xl">
              <div className="text-center font-bold text-gray-800 mb-2 text-sm flex items-center justify-center gap-2">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-md">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-lg font-bold text-blue-800">HOW</div>
                  <div className="text-xs font-medium text-blue-600 opacity-80">Key Processes</div>
                </div>
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="grid grid-cols-3 gap-4 h-full scrollable-section overflow-y-auto">
                  {processes.length === 0 ? (
                    <div className="col-span-3 flex items-center justify-center p-6 text-blue-600 bg-blue-50 rounded-lg border-2 border-dashed border-blue-200">
                      <div className="text-center">
                        <Target className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm font-medium">No processes defined</p>
                      </div>
                    </div>
                  ) : (
                    processes.slice(0, 6).map(process => 
                      renderClickableItem(process, 'bg-gradient-to-br from-blue-50 to-blue-100', 'text-blue-900', 'border-blue-400')
                    )
                  )}
                </div>
              </div>
            </div>
            
            {/* WHO (Top-right - Responsibilities) - Compact */}
            <div className="col-span-3 row-span-3 quadrant-owners rounded-lg border-2 p-3 shadow-lg flex flex-col transition-all duration-300 hover:shadow-xl">
              <div className="text-center font-bold text-gray-800 mb-2 text-sm flex items-center justify-center gap-2">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-md">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-lg font-bold text-purple-800">WHO</div>
                  <div className="text-xs font-medium text-purple-600 opacity-80">Resources</div>
                </div>
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="grid grid-cols-1 gap-3 h-full scrollable-section overflow-y-auto">
                  {uniqueOwners.length === 0 ? (
                    <div className="flex items-center justify-center p-4 text-purple-600 bg-purple-50 rounded-lg border-2 border-dashed border-purple-200">
                      <div className="text-center">
                        <Users className="w-6 h-6 mx-auto mb-2 opacity-50" />
                        <p className="text-xs font-medium">No owners assigned</p>
                      </div>
                    </div>
                  ) : (
                    uniqueOwners.slice(0, 6).map(owner => 
                      renderClickableItem(owner, 'bg-gradient-to-br from-purple-50 to-purple-100', 'text-purple-900', 'border-purple-400')
                    )
                  )}
                </div>
              </div>
            </div>

            {/* HOW FAR (Left - Annual Objectives) - Compact */}
            <div className="col-span-3 row-span-6 quadrant-annual rounded-lg border-2 p-3 shadow-lg flex flex-col transition-all duration-300 hover:shadow-xl">
              <div className="text-center font-bold text-gray-800 mb-2 text-sm flex items-center justify-center gap-2">
                <div className="p-2 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg shadow-md">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-lg font-bold text-amber-800">HOW FAR</div>
                  <div className="text-xs font-medium text-amber-600 opacity-80">Objectives</div>
                </div>
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="grid grid-cols-1 gap-4 h-full scrollable-section overflow-y-auto">
                  {annualObjectives.length === 0 ? (
                    <div className="flex items-center justify-center p-6 text-amber-600 bg-amber-50 rounded-lg border-2 border-dashed border-amber-200">
                      <div className="text-center">
                        <TrendingUp className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm font-medium">No annual objectives</p>
                      </div>
                    </div>
                  ) : (
                    annualObjectives.slice(0, 6).map(objective => 
                      renderClickableItem(objective, 'bg-gradient-to-br from-amber-50 to-amber-100', 'text-amber-900', 'border-amber-400')
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Enhanced Correlation Matrix (Center) with professional design and labels */}
            <div className="col-span-6 row-span-6 relative bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-gray-300 shadow-inner">
              {/* Correlation Matrix Title */}
              <div className="absolute top-2 left-2 right-2 text-center">
                <div className="text-sm font-bold text-gray-700 bg-white/80 rounded-lg px-3 py-1 shadow-sm">
                  {correlationMatrixType.rowLabel && correlationMatrixType.colLabel 
                    ? `${correlationMatrixType.rowLabel} ↔ ${correlationMatrixType.colLabel} Matrix`
                    : 'Correlation Matrix'
                  }
                </div>
              </div>
              
              {/* Show message if no data */}
              {(!correlationMatrixType.rowItems?.length || !correlationMatrixType.colItems?.length) ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-gray-500 bg-gray-50/80 rounded-xl p-6 border-2 border-dashed border-gray-200">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-2xl">×</span>
                    </div>
                    <p className="text-sm font-medium mb-2">Correlation Matrix</p>
                    <p className="text-xs text-gray-400">
                      Load demo data to see intelligent correlations between strategic elements
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      The matrix will automatically show the most relevant relationships (WHAT↔HOW, HOW FAR↔HOW, etc.)
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Traditional Hoshin Kanri Correlation Grid */}
                  <div className="absolute inset-4 top-8">
                    <div className="h-full grid grid-cols-4 grid-rows-4 gap-1">
                      {/* Top-left corner indicator */}
                      <div className="flex items-center justify-center bg-blue-100 border border-blue-200 rounded text-xs font-bold text-blue-700">
                        ↕
                      </div>
                      
                      {/* Column headers */}
                      {correlationMatrixType.colItems?.map((colItem, colIndex) => (
                        <div key={`header-${colItem.id}`} className="flex items-center justify-center bg-blue-50 border border-blue-200 rounded text-xs font-semibold text-blue-700 p-1" title={colItem.title}>
                          {colIndex + 1}
                        </div>
                      ))}
                      
                      {/* Rows with headers and correlation cells */}
                      {correlationMatrixType.rowItems?.map((rowItem, rowIndex) => (
                        <React.Fragment key={`row-${rowItem.id}`}>
                          {/* Row header */}
                          <div className="flex items-center justify-center bg-amber-50 border border-amber-200 rounded text-xs font-semibold text-amber-700" title={rowItem.title}>
                            {String.fromCharCode(65 + rowIndex)}
                          </div>
                          
                          {/* Correlation cells */}
                          {correlationMatrixType.colItems?.map((colItem, colIndex) => {
                            const correlation = correlations.find(c => c.rowId === rowItem.id && c.colId === colItem.id);
                            const symbol = correlation?.symbol;
                            const coordinate = `${String.fromCharCode(65 + rowIndex)}${colIndex + 1}`;
                            
                            return (
                              <div 
                                key={`cell-${rowItem.id}-${colItem.id}`} 
                                className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded cursor-pointer hover:bg-gray-50 transition-colors relative group"
                                style={{ 
                                  backgroundColor: symbol ? `${symbol.color}15` : '#ffffff',
                                  borderColor: symbol ? symbol.color : '#e5e7eb'
                                }}
                                title={`${coordinate}: ${rowItem.title} ↔ ${colItem.title}${symbol ? `\n${symbol.meaning}` : '\nNo relationship'}${correlation?.reasoning ? `\n\n${correlation.reasoning}` : ''}`}
                              >
                                {/* Correlation Symbol */}
                                <div 
                                  className="text-xl font-bold"
                                  style={{ color: symbol?.color || '#9ca3af' }}
                                >
                                  {symbol?.symbol || ''}
                                </div>
                                
                                {/* Correlation Label */}
                                <div className="text-xs text-gray-500 mt-1 font-medium">
                                  {correlationMatrixType.rowLabel?.toLowerCase() || 'row'}{rowIndex + 1},{correlationMatrixType.colLabel?.toLowerCase() || 'col'}{colIndex + 1}
                                </div>
                                
                                {/* Coordinate label on hover */}
                                <div className="absolute top-0 left-0 text-xs bg-gray-800 text-white px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity -mt-5 -ml-1">
                                  {coordinate}
                                </div>
                              </div>
                            );
                          })}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  
                </>
              )}
            </div>

            {/* HOW MUCH (Right - Metrics) - Compact */}
            <div className="col-span-3 row-span-6 quadrant-metrics rounded-lg border-2 p-3 shadow-lg flex flex-col transition-all duration-300 hover:shadow-xl">
              <div className="text-center font-bold text-gray-800 mb-2 text-sm flex items-center justify-center gap-2">
                <div className="p-2 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg shadow-md">
                  <BarChart3 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-lg font-bold text-pink-800">HOW MUCH</div>
                  <div className="text-xs font-medium text-pink-600 opacity-80">Metrics</div>
                </div>
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="grid grid-cols-1 gap-4 h-full scrollable-section overflow-y-auto">
                  {metrics.length === 0 ? (
                    <div className="flex items-center justify-center p-6 text-pink-600 bg-pink-50 rounded-lg border-2 border-dashed border-pink-200">
                      <div className="text-center">
                        <BarChart3 className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm font-medium">No metrics defined</p>
                      </div>
                    </div>
                  ) : (
                    metrics.slice(0, 6).map(metric => 
                      renderClickableItem(metric, 'bg-gradient-to-br from-pink-50 to-pink-100', 'text-pink-900', 'border-pink-400')
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Enhanced bottom-left corner */}
            <div className="col-span-3 row-span-3 bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl border-2 border-gray-300"></div>
            
            {/* WHAT (Bottom - Strategic Objectives) - Compact */}
            <div className="col-span-6 row-span-3 quadrant-strategic rounded-lg border-2 p-3 shadow-lg flex flex-col transition-all duration-300 hover:shadow-xl">
              <div className="text-center font-bold text-gray-800 mb-2 text-sm flex items-center justify-center gap-2">
                <div className="p-2 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg shadow-md">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-lg font-bold text-emerald-800">WHAT</div>
                  <div className="text-xs font-medium text-emerald-600 opacity-80">Strategic Goals</div>
                </div>
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="grid grid-cols-3 gap-4 h-full scrollable-section overflow-y-auto">
                  {strategicObjectives.length === 0 ? (
                    <div className="col-span-3 flex items-center justify-center p-6 text-emerald-600 bg-emerald-50 rounded-lg border-2 border-dashed border-emerald-200">
                      <div className="text-center">
                        <Target className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm font-medium">No strategic objectives</p>
                      </div>
                    </div>
                  ) : (
                    strategicObjectives.slice(0, 6).map(objective => 
                      renderClickableItem(objective, 'bg-gradient-to-br from-emerald-50 to-emerald-100', 'text-emerald-900', 'border-emerald-400')
                    )
                  )}
                </div>
              </div>
            </div>
            
            {/* Enhanced bottom-right corner */}
            <div className="col-span-3 row-span-3 bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl border-2 border-gray-300"></div>
          </div>

          {/* Professional X-Lines Overlay */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <svg width="60%" height="60%" className="absolute opacity-15">
              <defs>
                <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor:'#3b82f6', stopOpacity:1}} />
                  <stop offset="100%" style={{stopColor:'#8b5cf6', stopOpacity:1}} />
                </linearGradient>
                <linearGradient id="lineGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{stopColor:'#8b5cf6', stopOpacity:1}} />
                  <stop offset="100%" style={{stopColor:'#3b82f6', stopOpacity:1}} />
                </linearGradient>
              </defs>
              <line x1="0" y1="0" x2="100%" y2="100%" stroke="url(#lineGradient1)" strokeWidth="4" />
              <line x1="100%" y1="0" x2="0" y2="100%" stroke="url(#lineGradient2)" strokeWidth="4" />
            </svg>
          </div>
        </div>

        {/* Enhanced Interactive Correlation Legend */}
        <div className="mt-12 bg-white rounded-2xl border-2 border-gray-200 p-8 shadow-xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            Interactive Correlation Matrix Guide
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Interactive Correlation Symbols */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <span>Relationship Indicators</span>
                <div className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                  Click to highlight
                </div>
              </h4>
              <div className="space-y-3">
                {CORRELATION_SYMBOLS.map((symbol) => {
                  const isHighlighted = highlightedCorrelationType === symbol.id;
                  const correlationsOfThisType = correlations.filter(c => c.symbol?.id === symbol.id);
                  
                  return (
                    <div
                      key={symbol.id}
                      className={`flex items-center gap-4 px-4 py-3 rounded-xl border-2 transition-all duration-300 cursor-pointer group ${
                        isHighlighted 
                          ? 'border-blue-400 bg-blue-50 shadow-md scale-[1.02] transform'
                          : 'border-gray-200 bg-gray-50 hover:bg-white hover:border-gray-300 hover:shadow-sm'
                      }`}
                      onClick={() => setHighlightedCorrelationType(isHighlighted ? null : symbol.id)}
                    >
                      <div className="flex items-center gap-3">
                        <span 
                          style={{ color: symbol.color }} 
                          className={`text-3xl font-bold w-8 text-center transition-transform duration-200 ${
                            isHighlighted ? 'scale-110' : 'group-hover:scale-105'
                          }`}
                        >
                          {symbol.symbol}
                        </span>
                        <div>
                          <div className="text-sm font-bold text-gray-800">{symbol.meaning}</div>
                          <div className="text-xs text-gray-600 mt-1">
                            Strength: {symbol.strength}/5 • {correlationsOfThisType.length} instances
                          </div>
                        </div>
                      </div>
                      {/* Strength indicator bars */}
                      <div className="ml-auto flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-1.5 h-6 rounded-full transition-opacity duration-200 ${
                              i < symbol.strength ? 'opacity-100' : 'opacity-20'
                            }`}
                            style={{ backgroundColor: symbol.color }}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
              {highlightedCorrelationType && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-sm text-blue-700">
                    <strong>Highlighting:</strong> All {CORRELATION_SYMBOLS.find(s => s.id === highlightedCorrelationType)?.meaning} relationships in the matrix
                  </div>
                  <button
                    onClick={() => setHighlightedCorrelationType(null)}
                    className="text-xs text-blue-600 hover:text-blue-800 mt-1 underline"
                  >
                    Clear highlight
                  </button>
                </div>
              )}
            </div>

            {/* Matrix Navigation */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Matrix Reference System</h4>
              <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded text-white text-xs flex items-center justify-center font-bold">A</div>
                    <span className="font-semibold">Rows (A, B, C)</span>
                  </div>
                  <p className="text-xs">Annual Objectives displayed vertically</p>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 bg-orange-500 rounded text-white text-xs flex items-center justify-center font-bold">1</div>
                    <span className="font-semibold">Columns (1, 2, 3)</span>
                  </div>
                  <p className="text-xs">Key Processes displayed horizontally</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 bg-blue-500 rounded text-white text-xs flex items-center justify-center">A1</div>
                    <span className="font-semibold">Cell Reference</span>
                  </div>
                  <p className="text-xs">Each cell shows relationship between row objective and column process</p>
                </div>
              </div>
            </div>
            
            {/* Instructions */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">How to Use</h4>
              <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong>Interactive Elements:</strong> Click any card to view detailed information and highlight related strategic elements.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong>Hover for Details:</strong> Hover over correlation symbols to see detailed relationship information.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong>Grid Reference:</strong> Use the A1, B2, C3 system to reference specific correlations in discussions.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong>Strategic Flow:</strong> Follow the X-pattern: WHAT (Strategic Objectives-bottom), HOW FAR (Annual Objectives-left), HOW (Processes-top), HOW MUCH (Metrics-right), WHO (Owners-corner).</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {renderModal()}
    </>
  );

  // Don't render anything until mounted (to avoid hydration issues)
  if (!isMounted) {
    return (
      <div className="w-full max-w-7xl mx-auto p-8 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading X-Matrix...</p>
        </div>
      </div>
    );
  }

  // Render fullscreen version using portal
  if (isFullscreen) {
    return createPortal(
      <div className="fixed inset-0 z-[9999] bg-white overflow-auto">
        <MatrixContent />
      </div>,
      document.body
    );
  }

  // Render normal version
  return (
    <div className="w-full max-w-8xl mx-auto">
      <MatrixContent />
    </div>
  );
};

export default InteractiveMatrix;