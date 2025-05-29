'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Maximize2, Minimize2, Grid, Target, TrendingUp, Users, BarChart3, X, Calendar, User } from 'lucide-react';
import { useHoshinStore } from '@/store/hoshinStore';



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

// Enhanced correlation symbols with better colors
const CORRELATION_SYMBOLS: CorrelationSymbol[] = [
  { id: 'strong', symbol: '●', meaning: 'Strong Relationship', color: '#059669' },
  { id: 'medium', symbol: '○', meaning: 'Medium Relationship', color: '#0891b2' },
  { id: 'weak', symbol: '▲', meaning: 'Weak Relationship', color: '#ca8a04' },
  { id: 'potential', symbol: '△', meaning: 'Potential Relationship', color: '#9333ea' },
];

const InteractiveMatrix: React.FC = () => {
  const { strategicObjectives, annualObjectives, processes, metrics } = useHoshinStore();
  const [correlations, setCorrelations] = useState<CorrelationCell[]>([]);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<MatrixItem | null>(null);
  const [highlightedCards, setHighlightedCards] = useState<Set<string>>(new Set());
  const modalRef = useRef<HTMLDivElement>(null);

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

  // Toggle fullscreen
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Enhanced truncate text function with better handling
  const truncateText = (text: string, limit: number) => {
    if (!text) return '';
    if (text.length <= limit) return text;
    return text.substring(0, limit).trim() + '...';
  };

  // Render correlation cell
  const renderCorrelationCell = (rowId: string, colId: string) => {
    const symbol = getCorrelationSymbol(rowId, colId);
    return (
      <div
        key={`${rowId}-${colId}`}
        className="w-full h-full flex items-center justify-center border border-slate-200 text-xl font-bold rounded-sm"
        title={symbol ? symbol.meaning : 'No correlation'}
        style={{ 
          color: symbol?.color || '#64748b',
          backgroundColor: symbol ? `${symbol.color}08` : '#fafafa'
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

  // Enhanced render clickable item with proper overflow handling
  const renderClickableItem = (
    item: MatrixItem, 
    bgColor: string, 
    textColor: string = 'text-slate-800',
    borderColor: string = 'border-slate-200'
  ) => {
    const itemId = isStringItem(item) ? item : item.id;
    const displayText = isStringItem(item) ? item : (item.title || item.name || '');
    const isHighlighted = highlightedCards.has(itemId);
    
    return (
      <div 
        key={itemId}
        className={`${bgColor} ${textColor} ${borderColor} p-2 rounded-lg border-2 h-full flex flex-col cursor-pointer transition-all duration-200 group relative overflow-hidden ${
          isHighlighted ? 'scale-105 shadow-xl ring-2 ring-blue-400 z-10' : 'hover:shadow-lg hover:scale-[1.02]'
        }`}
        onClick={() => handleCardClick(item)}
        style={{ minHeight: '80px', maxHeight: '120px' }}
      >
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
        
        <div className="relative z-10 flex-1 overflow-hidden">
          {/* Title with proper truncation */}
          <div className="text-xs font-semibold leading-tight mb-1 overflow-hidden">
            <div className="line-clamp-2 break-words" title={displayText}>
              {truncateText(displayText, 40)}
            </div>
          </div>
          
          {/* Description with proper overflow */}
          {isObjectItem(item) && item.description && (
            <div className="text-xs opacity-75 font-normal leading-tight overflow-hidden flex-1">
              <div className="line-clamp-2 break-words" title={item.description}>
                {truncateText(item.description, 60)}
              </div>
            </div>
          )}
          
          {/* Progress bar - only show if space allows */}
          {isObjectItem(item) && item.progress !== undefined && (
            <div className="mt-1">
              <div className="w-full bg-white/40 rounded-full h-1 shadow-inner">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-green-500 h-1 rounded-full shadow-sm transition-all duration-500" 
                  style={{ width: `${item.progress}%` }}
                ></div>
              </div>
              <div className="text-xs font-medium mt-0.5 opacity-80">{item.progress}%</div>
            </div>
          )}
          
          {/* Owner - compact display */}
          {isObjectItem(item) && item.owner && (
            <div className="text-xs font-medium mt-1 opacity-70 flex items-center gap-1 overflow-hidden">
              <Users size={8} className="flex-shrink-0" />
              <span className="truncate" title={item.owner}>
                {truncateText(item.owner, 15)}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Enhanced Modal Component
  const renderModal = () => {
    if (!selectedCard) return null;

    const item = selectedCard;
    const isString = isStringItem(item);
    const displayTitle = isString ? item : (item.title || item.name || 'Untitled');

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000] p-4">
        <div 
          ref={modalRef}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Modal Header */}
          <div className="sticky top-0 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-slate-200 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg">
                  <Grid className="w-5 h-5 text-white" />
                </div>
                <span className="break-words">{displayTitle}</span>
              </h2>
              <button
                onClick={() => {
                  setSelectedCard(null);
                  setHighlightedCards(new Set());
                }}
                className="p-2 hover:bg-white/50 rounded-lg transition-colors flex-shrink-0"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6 space-y-6">
            {!isString && (
              <>
                {item.description && (
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Description</h3>
                    <p className="text-slate-600 bg-slate-50 p-4 rounded-lg break-words">{item.description}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Progress Section */}
                  {item.progress !== undefined && (
                    <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                      <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Progress
                      </h4>
                      <div className="space-y-2">
                        <div className="w-full bg-green-200 rounded-full h-3">
                          <div 
                            className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full shadow-sm transition-all duration-500" 
                            style={{ width: `${item.progress}%` }}
                          ></div>
                        </div>
                        <div className="text-sm font-medium text-green-700">{item.progress}% Complete</div>
                      </div>
                    </div>
                  )}

                  {/* Owner Section */}
                  {item.owner && (
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                      <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Owner
                      </h4>
                      <p className="text-blue-700 font-medium break-words">{item.owner}</p>
                    </div>
                  )}

                  {/* Status Section */}
                  {item.status && (
                    <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                      <h4 className="font-semibold text-purple-800 mb-3">Status</h4>
                      <span className="inline-block px-3 py-1 bg-purple-200 text-purple-800 rounded-full text-sm font-medium capitalize">
                        {item.status}
                      </span>
                    </div>
                  )}

                  {/* Dates Section */}
                  {(item.targetDate || item.startDate || item.endDate) && (
                    <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
                      <h4 className="font-semibold text-orange-800 mb-3 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Dates
                      </h4>
                      <div className="space-y-1 text-sm">
                        {item.startDate && (
                          <div><span className="font-medium">Start:</span> {new Date(item.startDate).toLocaleDateString()}</div>
                        )}
                        {item.endDate && (
                          <div><span className="font-medium">End:</span> {new Date(item.endDate).toLocaleDateString()}</div>
                        )}
                        {item.targetDate && (
                          <div><span className="font-medium">Target:</span> {new Date(item.targetDate).toLocaleDateString()}</div>
                        )}
                        {item.targetYear && (
                          <div><span className="font-medium">Target Year:</span> {item.targetYear}</div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Metrics Section */}
                  {(item.current !== undefined || item.target !== undefined) && (
                    <div className="bg-pink-50 p-4 rounded-xl border border-pink-200 md:col-span-2">
                      <h4 className="font-semibold text-pink-800 mb-3 flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" />
                        Metrics
                      </h4>
                      <div className="flex items-center gap-4 flex-wrap">
                        <div className="text-lg">
                          <span className="font-bold text-pink-700">{item.current?.toLocaleString()}</span>
                          <span className="text-pink-400 mx-2">/</span>
                          <span className="text-pink-600">{item.target?.toLocaleString()}</span>
                          {item.unit && <span className="text-pink-500 ml-1">{item.unit}</span>}
                        </div>
                        {item.frequency && (
                          <span className="px-2 py-1 bg-pink-200 text-pink-700 rounded text-xs font-medium">
                            {item.frequency}
                          </span>
                        )}
                      </div>
                      {item.current && item.target && (
                        <div className="mt-3">
                          <div className="w-full bg-pink-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-pink-500 to-rose-500 h-2 rounded-full" 
                              style={{ width: `${Math.min((item.current / item.target) * 100, 100)}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-pink-600 mt-1">
                            {((item.current / item.target) * 100).toFixed(1)}% of target
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Resources Section */}
                  {item.resources && item.resources.length > 0 && (
                    <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 md:col-span-2">
                      <h4 className="font-semibold text-indigo-800 mb-3">Resources</h4>
                      <div className="flex flex-wrap gap-2">
                        {item.resources.map((resource, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-indigo-200 text-indigo-800 rounded-full text-sm font-medium"
                          >
                            {resource}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Priority Section */}
                  {item.priority && (
                    <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                      <h4 className="font-semibold text-yellow-800 mb-3">Priority</h4>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium capitalize ${
                        item.priority === 'high' ? 'bg-red-200 text-red-800' :
                        item.priority === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                        'bg-green-200 text-green-800'
                      }`}>
                        {item.priority}
                      </span>
                    </div>
                  )}
                </div>

                {/* Related Items Section */}
                {highlightedCards.size > 0 && (
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <h4 className="font-semibold text-slate-800 mb-3">Related Items ({highlightedCards.size})</h4>
                    <p className="text-sm text-slate-600">
                      This item is connected to {highlightedCards.size} other items through correlations, shared ownership, or strategic alignment.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  const containerClass = isFullscreen 
    ? "fixed inset-0 z-[9999] bg-white overflow-auto" 
    : "w-full max-w-7xl mx-auto";

  return (
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
          scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
        }
        
        .scrollable-section::-webkit-scrollbar {
          width: 4px;
        }
        
        .scrollable-section::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .scrollable-section::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.5);
          border-radius: 2px;
        }
        
        .scrollable-section::-webkit-scrollbar-thumb:hover {
          background-color: rgba(156, 163, 175, 0.8);
        }
      `}</style>

      <div className={`${containerClass} ${isFullscreen ? 'p-8' : 'p-6'}`}>
        {/* Fullscreen Background Overlay */}
        {isFullscreen && (
          <div className="absolute inset-0 bg-white z-[-1]" />
        )}
        
        {/* Enhanced Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-center flex-1">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <Grid className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Hoshin Kanri X-Matrix
              </h1>
            </div>
            <p className="text-slate-600 font-medium">Strategic Policy Deployment Framework</p>
          </div>
          
          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-3 bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 group relative z-10"
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullscreen ? (
              <Minimize2 className="w-5 h-5 text-slate-700 group-hover:scale-110 transition-transform" />
            ) : (
              <Maximize2 className="w-5 h-5 text-slate-700 group-hover:scale-110 transition-transform" />
            )}
          </button>
        </div>

        {/* Enhanced Main Matrix Grid with proper overflow handling */}
        <div className="relative">
          {/* Grid Container with enhanced styling */}
          <div className="grid grid-cols-12 grid-rows-12 gap-2 bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 rounded-2xl p-4 shadow-xl" 
               style={{ minHeight: isFullscreen ? '80vh' : '800px', height: isFullscreen ? '80vh' : '800px' }}>
            
            {/* Empty top-left corner with subtle branding */}
            <div className="col-span-3 row-span-3 bg-gradient-to-br from-slate-100 to-slate-50 rounded-xl border-2 border-slate-200 flex items-center justify-center">
              <div className="text-slate-400 font-semibold text-sm">X-Matrix</div>
            </div>
            
            {/* HOW (Top - Processes) - Enhanced with scrolling */}
            <div className="col-span-6 row-span-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border-2 border-orange-200 p-3 shadow-sm flex flex-col">
              <div className="text-center font-bold text-slate-800 mb-1 text-lg flex items-center justify-center gap-2">
                <Target className="w-4 h-4 text-orange-600" />
                HOW
              </div>
              <div className="text-center text-xs text-slate-600 mb-2 font-medium">Top Level Priorities</div>
              <div className="flex-1 overflow-hidden">
                <div className="grid grid-cols-3 gap-2 h-full scrollable-section overflow-y-auto">
                  {processes.slice(0, 3).map(process => 
                    renderClickableItem(process, 'bg-gradient-to-br from-orange-100 to-orange-50', 'text-orange-900', 'border-orange-300')
                  )}
                </div>
              </div>
            </div>
            
            {/* WHO (Top-right - Responsibilities) - Enhanced with scrolling */}
            <div className="col-span-3 row-span-3 bg-gradient-to-l from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200 p-3 shadow-sm flex flex-col">
              <div className="text-center font-bold text-slate-800 mb-1 text-lg flex items-center justify-center gap-2">
                <Users className="w-4 h-4 text-purple-600" />
                WHO
              </div>
              <div className="text-center text-xs text-slate-600 mb-2 font-medium">Resources</div>
              <div className="flex-1 overflow-hidden">
                <div className="grid grid-cols-1 gap-2 h-full scrollable-section overflow-y-auto">
                  {uniqueOwners.slice(0, 3).map(owner => 
                    renderClickableItem(owner, 'bg-gradient-to-br from-purple-100 to-purple-50', 'text-purple-900', 'border-purple-300')
                  )}
                </div>
              </div>
            </div>

            {/* HOW FAR (Left - Annual Objectives) - Enhanced with scrolling */}
            <div className="col-span-3 row-span-6 bg-gradient-to-b from-yellow-50 to-amber-50 rounded-xl border-2 border-yellow-200 p-3 shadow-sm flex flex-col">
              <div className="text-center font-bold text-slate-800 mb-1 text-lg flex items-center justify-center gap-2">
                <TrendingUp className="w-4 h-4 text-yellow-600" />
                HOW FAR
              </div>
              <div className="text-center text-xs text-slate-600 mb-2 font-medium">Annual Objectives</div>
              <div className="flex-1 overflow-hidden">
                <div className="grid grid-cols-1 gap-2 h-full scrollable-section overflow-y-auto">
                  {annualObjectives.slice(0, 3).map(objective => 
                    renderClickableItem(objective, 'bg-gradient-to-br from-yellow-100 to-yellow-50', 'text-yellow-900', 'border-yellow-300')
                  )}
                </div>
              </div>
            </div>

            {/* Enhanced Correlation Matrix (Center) */}
            <div className="col-span-6 row-span-6 grid grid-cols-3 grid-rows-3 gap-1 relative bg-gradient-to-br from-slate-50 to-white rounded-xl border-2 border-slate-200 p-2 shadow-inner">
              {annualObjectives.slice(0, 3).map(annual => 
                processes.slice(0, 3).map(process => 
                  renderCorrelationCell(annual.id, process.id)
                )
              ).flat()}
              
              {/* Enhanced Center Diamond Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-32 h-32 transform rotate-45 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl shadow-2xl flex items-center justify-center backdrop-blur-sm">
                  <div className="transform -rotate-45 text-white font-bold text-center text-xs">
                    <div className="mb-1">Strategic</div>
                    <div>Alignment</div>
                  </div>
                </div>
              </div>
            </div>

            {/* HOW MUCH (Right - Metrics) - Enhanced with scrolling */}
            <div className="col-span-3 row-span-6 bg-gradient-to-b from-pink-50 to-rose-50 rounded-xl border-2 border-pink-200 p-3 shadow-sm flex flex-col">
              <div className="text-center font-bold text-slate-800 mb-1 text-lg flex items-center justify-center gap-2">
                <BarChart3 className="w-4 h-4 text-pink-600" />
                HOW MUCH
              </div>
              <div className="text-center text-xs text-slate-600 mb-2 font-medium">Targets to Improve</div>
              <div className="flex-1 overflow-hidden">
                <div className="grid grid-cols-1 gap-2 h-full scrollable-section overflow-y-auto">
                  {metrics.slice(0, 3).map(metric => 
                    renderClickableItem(metric, 'bg-gradient-to-br from-pink-100 to-pink-50', 'text-pink-900', 'border-pink-300')
                  )}
                </div>
              </div>
            </div>

            {/* Empty bottom-left corner */}
            <div className="col-span-3 row-span-3 bg-gradient-to-br from-slate-100 to-slate-50 rounded-xl border-2 border-slate-200"></div>
            
            {/* WHAT (Bottom - Strategic Objectives) - Enhanced with scrolling */}
            <div className="col-span-6 row-span-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200 p-3 shadow-sm flex flex-col">
              <div className="text-center font-bold text-slate-800 mb-1 text-lg flex items-center justify-center gap-2">
                <Target className="w-4 h-4 text-green-600" />
                WHAT
              </div>
              <div className="text-center text-xs text-slate-600 mb-2 font-medium">Long Term Objectives (3-5 Years)</div>
              <div className="flex-1 overflow-hidden">
                <div className="grid grid-cols-3 gap-2 h-full scrollable-section overflow-y-auto">
                  {strategicObjectives.slice(0, 3).map(objective => 
                    renderClickableItem(objective, 'bg-gradient-to-br from-green-100 to-green-50', 'text-green-900', 'border-green-300')
                  )}
                </div>
              </div>
            </div>
            
            {/* Empty bottom-right corner */}
            <div className="col-span-3 row-span-3 bg-gradient-to-br from-slate-100 to-slate-50 rounded-xl border-2 border-slate-200"></div>

          </div>

          {/* Enhanced X-Lines Overlay */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <svg width="60%" height="60%" className="absolute opacity-20">
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
              <line x1="0" y1="0" x2="100%" y2="100%" stroke="url(#lineGradient1)" strokeWidth="3" />
              <line x1="100%" y1="0" x2="0" y2="100%" stroke="url(#lineGradient2)" strokeWidth="3" />
            </svg>
          </div>
        </div>

        {/* Enhanced Correlation Legend */}
        <div className="mt-8 bg-gradient-to-r from-white to-slate-50 rounded-xl border-2 border-slate-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            Correlation Symbols
          </h3>
          <div className="flex flex-wrap gap-4 items-center mb-6">
            {CORRELATION_SYMBOLS.map((symbol) => (
              <div
                key={symbol.id}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-slate-200 bg-white"
              >
                <span style={{ color: symbol.color }} className="text-2xl font-bold">
                  {symbol.symbol}
                </span>
                <span className="text-sm font-semibold text-slate-700">{symbol.meaning}</span>
              </div>
            ))}
          </div>
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <p className="text-sm text-slate-600 leading-relaxed">
              <strong>Instructions:</strong> Click on any card to view detailed information and see related items highlighted. 
              Each section scrolls independently to accommodate long content. Correlation symbols show strategic relationships. 
              Use the fullscreen toggle for presentations.
            </p>
          </div>
        </div>

        {/* Enhanced Summary Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 text-center border-2 border-green-200 shadow-lg hover:shadow-xl transition-all duration-200">
            <div className="text-3xl font-bold text-green-700 mb-2">{strategicObjectives.length}</div>
            <div className="text-sm font-semibold text-green-600 flex items-center justify-center gap-1">
              <Target className="w-4 h-4" />
              Strategic Objectives
            </div>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-amber-100 rounded-xl p-6 text-center border-2 border-yellow-200 shadow-lg hover:shadow-xl transition-all duration-200">
            <div className="text-3xl font-bold text-yellow-700 mb-2">{annualObjectives.length}</div>
            <div className="text-sm font-semibold text-yellow-600 flex items-center justify-center gap-1">
              <TrendingUp className="w-4 h-4" />
              Annual Objectives
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-red-100 rounded-xl p-6 text-center border-2 border-orange-200 shadow-lg hover:shadow-xl transition-all duration-200">
            <div className="text-3xl font-bold text-orange-700 mb-2">{processes.length}</div>
            <div className="text-sm font-semibold text-orange-600 flex items-center justify-center gap-1">
              <Grid className="w-4 h-4" />
              Key Processes
            </div>
          </div>
          <div className="bg-gradient-to-br from-pink-50 to-rose-100 rounded-xl p-6 text-center border-2 border-pink-200 shadow-lg hover:shadow-xl transition-all duration-200">
            <div className="text-3xl font-bold text-pink-700 mb-2">{metrics.length}</div>
            <div className="text-sm font-semibold text-pink-600 flex items-center justify-center gap-1">
              <BarChart3 className="w-4 h-4" />
              Metrics Tracked
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {renderModal()}
    </>
  );
};

export default InteractiveMatrix;