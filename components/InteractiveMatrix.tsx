'use client';

import React, { useState, useCallback } from 'react';
import { useHoshinStore } from '../store/hoshinStore';

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
} | string;

// Default correlation symbols
const CORRELATION_SYMBOLS: CorrelationSymbol[] = [
  { id: 'strong', symbol: '●', meaning: 'Strong Relationship', color: '#000000' },
  { id: 'medium', symbol: '○', meaning: 'Medium Relationship', color: '#4A5568' },
  { id: 'weak', symbol: '▲', meaning: 'Weak Relationship', color: '#718096' },
  { id: 'potential', symbol: '△', meaning: 'Potential Relationship', color: '#A0AEC0' },
];

const InteractiveMatrix: React.FC = () => {
  const { strategicObjectives, annualObjectives, processes, metrics } = useHoshinStore();
  const [correlations, setCorrelations] = useState<CorrelationCell[]>([]);
  const [selectedSymbol, setSelectedSymbol] = useState<CorrelationSymbol>(CORRELATION_SYMBOLS[0]);
  const [editingCell, setEditingCell] = useState<string | null>(null);

  // Get unique owners for WHO section
  const uniqueOwners = React.useMemo(() => {
    const owners = new Set<string>();
    [...strategicObjectives, ...annualObjectives, ...processes, ...metrics].forEach(item => {
      if ('owner' in item && item.owner) owners.add(item.owner);
    });
    return Array.from(owners).slice(0, 6); // Limit to 6 for clean layout
  }, [strategicObjectives, annualObjectives, processes, metrics]);

  // Handle correlation clicks
  const handleCorrelationClick = useCallback((rowId: string, colId: string) => {
    setCorrelations(prev => {
      const existing = prev.find(c => c.rowId === rowId && c.colId === colId);
      let updated;
      
      if (existing) {
        if (existing.symbol?.id === selectedSymbol.id) {
          // Remove if same symbol clicked
          updated = prev.filter(c => !(c.rowId === rowId && c.colId === colId));
        } else {
          // Update symbol
          updated = prev.map(c => 
            c.rowId === rowId && c.colId === colId 
              ? { ...c, symbol: selectedSymbol }
              : c
          );
        }
      } else {
        // Add new correlation
        updated = [...prev, { rowId, colId, symbol: selectedSymbol }];
      }
      
      return updated;
    });
  }, [selectedSymbol]);

  const getCorrelationSymbol = useCallback((rowId: string, colId: string): CorrelationSymbol | undefined => {
    return correlations.find(c => c.rowId === rowId && c.colId === colId)?.symbol;
  }, [correlations]);

  // Render correlation cell
  const renderCorrelationCell = (rowId: string, colId: string) => {
    const symbol = getCorrelationSymbol(rowId, colId);
    return (
      <div
        key={`${rowId}-${colId}`}
        className="w-full h-full flex items-center justify-center cursor-pointer hover:bg-blue-50 transition-colors border border-gray-200 text-xl font-bold"
        onClick={() => handleCorrelationClick(rowId, colId)}
        title={symbol ? symbol.meaning : 'Click to add correlation'}
        style={{ 
          color: symbol?.color || '#9CA3AF',
          backgroundColor: symbol ? '#F0F9FF' : '#FAFAFA'
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

  // Render editable item
  const renderEditableItem = (
    item: MatrixItem, 
    bgColor: string, 
    textColor: string = 'text-gray-800'
  ) => {
    const itemId = isStringItem(item) ? item : item.id;
    const isEditing = editingCell === itemId;
    const displayText = isStringItem(item) ? item : (item.title || item.name || '');
    
    return (
      <div 
        key={itemId}
        className={`${bgColor} ${textColor} p-3 rounded-lg border border-gray-200 h-full flex flex-col justify-center cursor-pointer hover:shadow-md transition-all`}
        onClick={() => setEditingCell(itemId)}
      >
        {isEditing ? (
          <textarea
            className="w-full h-full bg-transparent resize-none outline-none text-sm font-medium"
            value={displayText}
            onChange={() => {
              // Handle editing logic here
            }}
            onBlur={() => setEditingCell(null)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                setEditingCell(null);
              }
            }}
            autoFocus
          />
        ) : (
          <div className="text-sm font-medium leading-tight">
            {displayText}
            {isObjectItem(item) && item.description && (
              <div className="text-xs text-gray-600 mt-1 opacity-75">
                {item.description.substring(0, 60)}...
              </div>
            )}
            {isObjectItem(item) && item.progress !== undefined && (
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-green-500 h-1.5 rounded-full" 
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">{item.progress}% complete</div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Hoshin Kanri X-Matrix
        </h1>
        <p className="text-gray-600">Strategic Policy Deployment</p>
      </div>

      {/* Main Matrix Grid */}
      <div className="relative">
        {/* Grid Container */}
        <div className="grid grid-cols-12 grid-rows-12 gap-1 min-h-[800px] bg-white border-2 border-gray-300 rounded-lg p-4">
          
          {/* Empty top-left corner */}
          <div className="col-span-3 row-span-3 bg-gray-50 rounded-lg border border-gray-200"></div>
          
          {/* HOW (Top - Processes) */}
          <div className="col-span-6 row-span-3 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg border border-gray-200 p-2">
            <div className="text-center font-bold text-gray-800 mb-2 text-lg">HOW</div>
            <div className="text-center text-sm text-gray-600 mb-3">Top Level Priorities</div>
            <div className="grid grid-cols-3 gap-1 h-full">
              {processes.slice(0, 3).map(process => 
                renderEditableItem(process, 'bg-orange-50', 'text-orange-900')
              )}
            </div>
          </div>
          
          {/* WHO (Top-right - Responsibilities) */}
          <div className="col-span-3 row-span-3 bg-gradient-to-l from-purple-100 to-pink-100 rounded-lg border border-gray-200 p-2">
            <div className="text-center font-bold text-gray-800 mb-2 text-lg">WHO</div>
            <div className="text-center text-sm text-gray-600 mb-3">Resources</div>
            <div className="grid grid-cols-1 gap-1 h-full">
              {uniqueOwners.slice(0, 3).map(owner => 
                renderEditableItem(owner, 'bg-purple-50', 'text-purple-900')
              )}
            </div>
          </div>

          {/* HOW FAR (Left - Annual Objectives) */}
          <div className="col-span-3 row-span-6 bg-gradient-to-b from-yellow-100 to-yellow-200 rounded-lg border border-gray-200 p-2">
            <div className="text-center font-bold text-gray-800 mb-2 text-lg">HOW FAR</div>
            <div className="text-center text-sm text-gray-600 mb-3">Annual Objectives</div>
            <div className="grid grid-cols-1 gap-1 h-full">
              {annualObjectives.slice(0, 3).map(objective => 
                renderEditableItem(objective, 'bg-yellow-50', 'text-yellow-900')
              )}
            </div>
          </div>

          {/* Correlation Matrix (Center) */}
          <div className="col-span-6 row-span-6 grid grid-cols-3 grid-rows-3 gap-1 relative">
            {annualObjectives.slice(0, 3).map(annual => 
              processes.slice(0, 3).map(process => 
                renderCorrelationCell(annual.id, process.id)
              )
            ).flat()}
            
            {/* Center Diamond Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-32 h-32 transform rotate-45 bg-gradient-to-br from-red-400 to-blue-400 rounded-lg shadow-lg flex items-center justify-center">
                <div className="transform -rotate-45 text-white font-bold text-center text-sm">
                  <div>Strategic</div>
                  <div>Alignment</div>
                </div>
              </div>
            </div>
          </div>

          {/* HOW MUCH (Right - Metrics) */}
          <div className="col-span-3 row-span-6 bg-gradient-to-b from-pink-100 to-rose-100 rounded-lg border border-gray-200 p-2">
            <div className="text-center font-bold text-gray-800 mb-2 text-lg">HOW MUCH</div>
            <div className="text-center text-sm text-gray-600 mb-3">Targets to Improve</div>
            <div className="grid grid-cols-1 gap-1 h-full">
              {metrics.slice(0, 3).map(metric => 
                renderEditableItem(metric, 'bg-pink-50', 'text-pink-900')
              )}
            </div>
          </div>

          {/* Empty bottom-left corner */}
          <div className="col-span-3 row-span-3 bg-gray-50 rounded-lg border border-gray-200"></div>
          
          {/* WHAT (Bottom - Strategic Objectives) */}
          <div className="col-span-6 row-span-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg border border-gray-200 p-2">
            <div className="text-center font-bold text-gray-800 mb-2 text-lg">WHAT</div>
            <div className="text-center text-sm text-gray-600 mb-3">Long Term Objectives (3-5 Years)</div>
            <div className="grid grid-cols-3 gap-1 h-full">
              {strategicObjectives.slice(0, 3).map(objective => 
                renderEditableItem(objective, 'bg-green-50', 'text-green-900')
              )}
            </div>
          </div>
          
          {/* Empty bottom-right corner */}
          <div className="col-span-3 row-span-3 bg-gray-50 rounded-lg border border-gray-200"></div>

        </div>

        {/* X-Lines Overlay */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <svg width="60%" height="60%" className="absolute">
            <line x1="0" y1="0" x2="100%" y2="100%" stroke="#374151" strokeWidth="2" opacity="0.3" />
            <line x1="100%" y1="0" x2="0" y2="100%" stroke="#374151" strokeWidth="2" opacity="0.3" />
          </svg>
        </div>
      </div>

      {/* Correlation Legend */}
      <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Correlation Symbols</h3>
        <div className="flex flex-wrap gap-4 items-center mb-4">
          {CORRELATION_SYMBOLS.map((symbol) => (
            <label
              key={symbol.id}
              className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg border-2 transition-colors ${
                selectedSymbol.id === symbol.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="correlationSymbol"
                value={symbol.id}
                checked={selectedSymbol.id === symbol.id}
                onChange={() => setSelectedSymbol(symbol)}
                className="sr-only"
              />
              <span style={{ color: symbol.color }} className="text-xl font-bold">
                {symbol.symbol}
              </span>
              <span className="text-sm text-gray-700">{symbol.meaning}</span>
            </label>
          ))}
        </div>
        <p className="text-sm text-gray-600 italic">
          Click on intersection cells to add/modify correlations between objectives and priorities. 
          Click on any text to edit items directly.
        </p>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-700">{strategicObjectives.length}</div>
          <div className="text-sm text-green-600">Strategic Objectives</div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-yellow-700">{annualObjectives.length}</div>
          <div className="text-sm text-yellow-600">Annual Objectives</div>
        </div>
        <div className="bg-orange-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-orange-700">{processes.length}</div>
          <div className="text-sm text-orange-600">Key Processes</div>
        </div>
        <div className="bg-pink-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-pink-700">{metrics.length}</div>
          <div className="text-sm text-pink-600">Metrics Tracked</div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMatrix;