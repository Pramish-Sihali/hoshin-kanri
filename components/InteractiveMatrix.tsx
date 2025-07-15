'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Maximize2, Minimize2, Grid, Target, TrendingUp, Users, BarChart3, X, Calendar, User, Info } from 'lucide-react';
import { useHoshinStore } from '@/store/hoshinStore';
import { createPortal } from 'react-dom';

// Types for correlations
interface CorrelationSymbol {
  id: string;
  symbol: '●' | '○' | '▲' | '△';
  meaning: string;
  color: string;
}

interface CorrelationCell {
  rowId: string;
  colId: string;
  symbol?: CorrelationSymbol;
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

// Professional color palette and enhanced correlation symbols
const CORRELATION_SYMBOLS: CorrelationSymbol[] = [
  { id: 'strong', symbol: '●', meaning: 'Strong Relationship', color: '#10b981' },
  { id: 'medium', symbol: '○', meaning: 'Medium Relationship', color: '#3b82f6' },
  { id: 'weak', symbol: '▲', meaning: 'Weak Relationship', color: '#f59e0b' },
  { id: 'potential', symbol: '△', meaning: 'Potential Relationship', color: '#8b5cf6' },
];

const InteractiveMatrix: React.FC = () => {
  const { strategicObjectives, annualObjectives, processes, metrics } = useHoshinStore();
  const [correlations, setCorrelations] = useState<CorrelationCell[]>([]);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<MatrixItem | null>(null);
  const [highlightedCards, setHighlightedCards] = useState<Set<string>>(new Set());
  const [isMounted, setIsMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Ensure component is mounted before using portals
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Get unique owners for WHO section
  const uniqueOwners = React.useMemo(() => {
    const owners = new Set<string>();
    [...strategicObjectives, ...annualObjectives, ...processes, ...metrics].forEach(item => {
      if ('owner' in item && item.owner) owners.add(item.owner);
    });
    return Array.from(owners).slice(0, 6);
  }, [strategicObjectives, annualObjectives, processes, metrics]);

  // Generate random correlations on component mount
  useEffect(() => {
    const generateRandomCorrelations = () => {
      const newCorrelations: CorrelationCell[] = [];
      const annualIds = annualObjectives.slice(0, 3).map(obj => obj.id);
      const processIds = processes.slice(0, 3).map(proc => proc.id);
      
      // Generate random correlations (about 30-50% of possible combinations)
      annualIds.forEach(annualId => {
        processIds.forEach(processId => {
          if (Math.random() > 0.6) { // 40% chance of correlation
            const randomSymbol = CORRELATION_SYMBOLS[Math.floor(Math.random() * CORRELATION_SYMBOLS.length)];
            newCorrelations.push({
              rowId: annualId,
              colId: processId,
              symbol: randomSymbol
            });
          }
        });
      });
      
      setCorrelations(newCorrelations);
    };

    generateRandomCorrelations();
  }, [annualObjectives, processes]);

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

  const getCorrelationSymbol = useCallback((rowId: string, colId: string): CorrelationSymbol | undefined => {
    return correlations.find(c => c.rowId === rowId && c.colId === colId)?.symbol;
  }, [correlations]);

  // Enhanced truncate text function with better handling
  const truncateText = (text: string, limit: number) => {
    if (!text) return '';
    if (text.length <= limit) return text;
    return text.substring(0, limit).trim() + '...';
  };

  // Render correlation cell with enhanced styling
  const renderCorrelationCell = (rowId: string, colId: string) => {
    const symbol = getCorrelationSymbol(rowId, colId);
    return (
      <div
        key={`${rowId}-${colId}`}
        className={`w-full h-full flex items-center justify-center border-2 text-2xl font-bold rounded-lg transition-all duration-300 ${
          symbol ? 'border-opacity-30 shadow-sm hover:shadow-md' : 'border-gray-200 bg-gray-50/50'
        }`}
        title={symbol ? symbol.meaning : 'No correlation'}
        style={{ 
          color: symbol?.color || '#94a3b8',
          backgroundColor: symbol ? `${symbol.color}12` : '#f8fafc',
          borderColor: symbol?.color || '#e2e8f0'
        }}
      >
        {symbol?.symbol || ''}
      </div>
    );
  };

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
        className={`${bgColor} ${textColor} ${borderColor} p-4 rounded-xl border-2 h-full flex flex-col cursor-pointer transition-all duration-300 group relative overflow-hidden ${
          isHighlighted 
            ? 'scale-[1.02] shadow-xl ring-2 ring-blue-500/50 z-20 transform' 
            : 'hover:shadow-lg hover:scale-[1.01] hover:border-opacity-60'
        }`}
        onClick={() => handleCardClick(item)}
        style={{ minHeight: '90px' }}
      >
        {/* Professional gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="relative z-10 flex-1 flex flex-col">
          {/* Enhanced title with better typography */}
          <div className="font-semibold leading-tight mb-2 flex-shrink-0">
            <div className="line-clamp-2 break-words text-sm" title={displayText}>
              {truncateText(displayText, 45)}
            </div>
          </div>
          
          {/* Description with improved styling */}
          {isObjectItem(item) && item.description && (
            <div className="text-xs opacity-70 font-normal leading-relaxed mb-2 flex-1">
              <div className="line-clamp-2 break-words" title={item.description}>
                {truncateText(item.description, 65)}
              </div>
            </div>
          )}
          
          {/* Enhanced progress bar */}
          {isObjectItem(item) && item.progress !== undefined && (
            <div className="mt-auto">
              <div className="w-full bg-white/50 rounded-full h-2 shadow-inner mb-1">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full shadow-sm transition-all duration-700 ease-out" 
                  style={{ width: `${item.progress}%` }}
                ></div>
              </div>
              <div className="text-xs font-medium opacity-80">{item.progress}%</div>
            </div>
          )}
          
          {/* Owner with improved layout */}
          {isObjectItem(item) && item.owner && (
            <div className="text-xs font-medium mt-2 opacity-60 flex items-center gap-1.5 flex-shrink-0">
              <User size={10} className="text-current" />
              <span className="truncate" title={item.owner}>
                {truncateText(item.owner, 18)}
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
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .scrollable-section {
          scrollbar-width: thin;
          scrollbar-color: rgba(156, 163, 175, 0.4) transparent;
        }
        
        .scrollable-section::-webkit-scrollbar {
          width: 6px;
        }
        
        .scrollable-section::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 3px;
        }
        
        .scrollable-section::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.4);
          border-radius: 3px;
        }
        
        .scrollable-section::-webkit-scrollbar-thumb:hover {
          background-color: rgba(156, 163, 175, 0.6);
        }
        
        /* Enhanced modal scrollbar */
        .modal-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(156, 163, 175, 0.3) transparent;
        }
        
        .modal-scroll::-webkit-scrollbar {
          width: 6px;
        }
        
        .modal-scroll::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 3px;
        }
        
        .modal-scroll::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.3);
          border-radius: 3px;
          transition: all 0.2s ease;
        }
        
        .modal-scroll::-webkit-scrollbar-thumb:hover {
          background-color: rgba(156, 163, 175, 0.5);
        }
      `}</style>

      <div className={`${isFullscreen ? 'p-10' : 'p-8'} ${isFullscreen ? 'h-full overflow-auto' : ''} bg-gradient-to-br from-gray-50 to-white`}>
        {/* Professional Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="text-center flex-1">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="p-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg">
                <Grid className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">X-Matrix</h1>
                <p className="text-lg text-gray-600 font-medium">Hoshin Kanri Strategic Planning Framework</p>
              </div>
            </div>
          </div>
          
          {/* Enhanced Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-4 bg-white hover:bg-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-200"
            title={isFullscreen ? "Exit Fullscreen (ESC)" : "Enter Fullscreen"}
          >
            {isFullscreen ? (
              <Minimize2 className="w-6 h-6 text-gray-700 group-hover:scale-110 transition-transform" />
            ) : (
              <Maximize2 className="w-6 h-6 text-gray-700 group-hover:scale-110 transition-transform" />
            )}
          </button>
        </div>

        {/* Professional Main Matrix Grid */}
        <div className="relative">
          <div className="grid grid-cols-12 grid-rows-12 gap-4 bg-white border-2 border-gray-300 rounded-3xl p-6 shadow-2xl" 
               style={{ minHeight: isFullscreen ? '75vh' : '900px', height: isFullscreen ? '75vh' : '900px' }}>
            
            {/* Enhanced corner with branding */}
            <div className="col-span-3 row-span-3 bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl border-2 border-gray-300 flex items-center justify-center">
              <div className="text-center">
                <div className="text-gray-500 font-bold text-lg mb-1">X-MATRIX</div>
                <div className="text-gray-400 text-sm font-medium">Strategic Framework</div>
              </div>
            </div>
            
            {/* HOW (Top - Processes) with professional styling */}
            <div className="col-span-6 row-span-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border-2 border-orange-300 p-4 shadow-lg flex flex-col">
              <div className="text-center font-bold text-gray-800 mb-2 text-xl flex items-center justify-center gap-3">
                <div className="p-2 bg-orange-500 rounded-lg">
                  <Target className="w-5 h-5 text-white" />
                </div>
                HOW
              </div>
              <div className="text-center text-sm text-gray-600 mb-3 font-semibold">Strategic Initiatives & Key Processes</div>
              <div className="flex-1 overflow-hidden">
                <div className="grid grid-cols-3 gap-3 h-full scrollable-section overflow-y-auto">
                  {processes.slice(0, 3).map(process => 
                    renderClickableItem(process, 'bg-gradient-to-br from-orange-100 to-orange-50', 'text-orange-900', 'border-orange-300')
                  )}
                </div>
              </div>
            </div>
            
            {/* WHO (Top-right - Responsibilities) with enhanced design */}
            <div className="col-span-3 row-span-3 bg-gradient-to-l from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-300 p-4 shadow-lg flex flex-col">
              <div className="text-center font-bold text-gray-800 mb-2 text-xl flex items-center justify-center gap-3">
                <div className="p-2 bg-purple-500 rounded-lg">
                  <Users className="w-5 h-5 text-white" />
                </div>
                WHO
              </div>
              <div className="text-center text-sm text-gray-600 mb-3 font-semibold">Key Resources & Owners</div>
              <div className="flex-1 overflow-hidden">
                <div className="grid grid-cols-1 gap-3 h-full scrollable-section overflow-y-auto">
                  {uniqueOwners.slice(0, 3).map(owner => 
                    renderClickableItem(owner, 'bg-gradient-to-br from-purple-100 to-purple-50', 'text-purple-900', 'border-purple-300')
                  )}
                </div>
              </div>
            </div>

            {/* HOW FAR (Left - Annual Objectives) with professional styling */}
            <div className="col-span-3 row-span-6 bg-gradient-to-b from-yellow-50 to-amber-50 rounded-2xl border-2 border-yellow-300 p-4 shadow-lg flex flex-col">
              <div className="text-center font-bold text-gray-800 mb-2 text-xl flex items-center justify-center gap-3">
                <div className="p-2 bg-yellow-500 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                HOW FAR
              </div>
              <div className="text-center text-sm text-gray-600 mb-3 font-semibold">Annual Objectives & Targets</div>
              <div className="flex-1 overflow-hidden">
                <div className="grid grid-cols-1 gap-3 h-full scrollable-section overflow-y-auto">
                  {annualObjectives.slice(0, 3).map(objective => 
                    renderClickableItem(objective, 'bg-gradient-to-br from-yellow-100 to-yellow-50', 'text-yellow-900', 'border-yellow-300')
                  )}
                </div>
              </div>
            </div>

            {/* Enhanced Correlation Matrix (Center) with professional design */}
            <div className="col-span-6 row-span-6 grid grid-cols-3 grid-rows-3 gap-2 relative bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-gray-300 p-3 shadow-inner">
              {annualObjectives.slice(0, 3).map(annual => 
                processes.slice(0, 3).map(process => 
                  renderCorrelationCell(annual.id, process.id)
                )
              ).flat()}
              
              {/* Professional Center Diamond */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-36 h-36 transform rotate-45 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-2xl shadow-2xl flex items-center justify-center">
                  <div className="transform -rotate-45 text-white font-bold text-center">
                    <div className="text-xl mb-1">Strategic</div>
                    <div className="text-xl">Alignment</div>
                  </div>
                </div>
              </div>
            </div>

            {/* HOW MUCH (Right - Metrics) with enhanced styling */}
            <div className="col-span-3 row-span-6 bg-gradient-to-b from-pink-50 to-rose-50 rounded-2xl border-2 border-pink-300 p-4 shadow-lg flex flex-col">
              <div className="text-center font-bold text-gray-800 mb-2 text-xl flex items-center justify-center gap-3">
                <div className="p-2 bg-pink-500 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                HOW MUCH
              </div>
              <div className="text-center text-sm text-gray-600 mb-3 font-semibold">Metrics & KPIs</div>
              <div className="flex-1 overflow-hidden">
                <div className="grid grid-cols-1 gap-3 h-full scrollable-section overflow-y-auto">
                  {metrics.slice(0, 3).map(metric => 
                    renderClickableItem(metric, 'bg-gradient-to-br from-pink-100 to-pink-50', 'text-pink-900', 'border-pink-300')
                  )}
                </div>
              </div>
            </div>

            {/* Enhanced bottom-left corner */}
            <div className="col-span-3 row-span-3 bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl border-2 border-gray-300"></div>
            
            {/* WHAT (Bottom - Strategic Objectives) with professional design */}
            <div className="col-span-6 row-span-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-300 p-4 shadow-lg flex flex-col">
              <div className="text-center font-bold text-gray-800 mb-2 text-xl flex items-center justify-center gap-3">
                <div className="p-2 bg-green-500 rounded-lg">
                  <Target className="w-5 h-5 text-white" />
                </div>
                WHAT
              </div>
              <div className="text-center text-sm text-gray-600 mb-3 font-semibold">Strategic Objectives (3-5 Years)</div>
              <div className="flex-1 overflow-hidden">
                <div className="grid grid-cols-3 gap-3 h-full scrollable-section overflow-y-auto">
                  {strategicObjectives.slice(0, 3).map(objective => 
                    renderClickableItem(objective, 'bg-gradient-to-br from-green-100 to-green-50', 'text-green-900', 'border-green-300')
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

        {/* Professional Correlation Legend */}
        <div className="mt-12 bg-white rounded-2xl border-2 border-gray-200 p-8 shadow-xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            Correlation Legend & Instructions
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Correlation Symbols */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Relationship Indicators</h4>
              <div className="space-y-3">
                {CORRELATION_SYMBOLS.map((symbol) => (
                  <div
                    key={symbol.id}
                    className="flex items-center gap-4 px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 hover:bg-white transition-colors"
                  >
                    <span style={{ color: symbol.color }} className="text-3xl font-bold w-8 text-center">
                      {symbol.symbol}
                    </span>
                    <span className="text-sm font-semibold text-gray-800">{symbol.meaning}</span>
                  </div>
                ))}
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
                  <p><strong>Correlations:</strong> Symbols in the center matrix show relationships between annual objectives and key processes.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong>Navigation:</strong> Each section scrolls independently. Use fullscreen mode for presentations.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong>Strategic Flow:</strong> Follow the X-pattern: WHAT defines objectives, HOW shows processes, WHO assigns ownership, HOW MUCH sets metrics.</p>
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