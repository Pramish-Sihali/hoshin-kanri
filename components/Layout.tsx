// components/Layout.tsx - Enhanced version with Generate Report functionality
'use client';

import React, { useState } from 'react';
import { 
  Home, 
  Target, 
  BarChart3, 
  Users, 
  MessageSquare, 
  Settings,
  Menu,
  X,
  Database,
  Zap,
  ChevronDown,
  Trash2,
  Download,
  Loader2,
  FileText
} from 'lucide-react';

import UserMenu from './UserMenu';
import ExecutiveReportGenerator from './ExecutiveReportGenerator';
import { useHoshinStore } from '../store/hoshinStore';
import { useUiStore } from '../store/uiStore';
import { Button } from './ui/button';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
  onSidebarToggle?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, onPageChange }) => {
  const { sidebarOpen, toggleSidebar } = useUiStore();
  const [datasetDropdownOpen, setDatasetDropdownOpen] = useState(false);
  const [isLoadingDataset, setIsLoadingDataset] = useState(false);
  const [showReportGenerator, setShowReportGenerator] = useState(false);
  
  const { 
    loadDataset, 
    clearAllData, 
    hasDummyData, 
    availableDatasets, 
    currentDatasetId,
    getCurrentDatasetName 
  } = useHoshinStore();
  
  const handleDatasetSelect = async (datasetId: string) => {
    setIsLoadingDataset(true);
    setDatasetDropdownOpen(false);
    
    // Add a small delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (datasetId === 'clear') {
      clearAllData();
    } else {
      loadDataset(datasetId);
    }
    
    setIsLoadingDataset(false);
  };

  const getCurrentButtonText = () => {
    if (isLoadingDataset) {
      return 'Loading...';
    }
    if (!hasDummyData()) {
      return 'Load Demo Data';
    }
    const datasetName = getCurrentDatasetName();
    return datasetName ? `${datasetName}` : 'Custom Data';
  };

  const getCurrentButtonIcon = () => {
    if (isLoadingDataset) {
      return Loader2;
    }
    if (!hasDummyData()) {
      return Download;
    }
    return Database;
  };

  const navigation = [
    { name: 'Dashboard', href: 'dashboard', icon: Home },
    { name: 'X-Matrix', href: 'matrix', icon: Target },
    { name: 'Catchball', href: 'catchball', icon: MessageSquare },
    { name: 'Objectives', href: 'objectives', icon: BarChart3 },
    { name: 'Processes', href: 'processes', icon: Users },
    { name: 'Settings', href: 'settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Loading Overlay */}
      {isLoadingDataset && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9999] flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-2xl p-8 flex items-center gap-4">
            <Loader2 className="w-6 h-6 text-teal-600 animate-spin" />
            <span className="text-slate-700 font-medium">Loading dataset...</span>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      <div className={`fixed inset-0 flex z-40 md:hidden ${sidebarOpen ? '' : 'pointer-events-none'}`}>
        <div className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm ${sidebarOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`} 
             onClick={() => toggleSidebar()} />
        
        <div className={`relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-2xl ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors"
              onClick={() => toggleSidebar()}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          
          <div className="flex-1 h-0 pt-4 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-6 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold bg-gradient-to-r from-teal-700 to-teal-600 bg-clip-text text-transparent">
                    Policy Tracking
                  </h1>
                  <p className="text-xs text-slate-500">Strategic Planning</p>
                </div>
              </div>
            </div>
            
            <nav className="px-4 space-y-2 flex-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      onPageChange(item.href);
                      toggleSidebar();
                    }}
                    className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl w-full text-left transition-all duration-200 ${
                      currentPage === item.href
                        ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-teal-700'
                    }`}
                    disabled={isLoadingDataset}
                  >
                    <Icon className={`mr-3 h-5 w-5 transition-colors ${
                      currentPage === item.href ? 'text-white' : 'text-slate-500 group-hover:text-teal-600'
                    }`} />
                    {item.name}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop with collapse functionality */}
      <div className={`hidden md:flex ${sidebarOpen ? 'md:w-64' : 'md:w-20'} md:flex-col md:fixed md:inset-y-0 transition-all duration-300`}>
        <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-slate-200 shadow-lg">
          <div className="flex-1 flex flex-col pt-4 pb-4 overflow-y-auto">
            <div className={`flex items-center flex-shrink-0 mb-8 ${sidebarOpen ? 'px-6' : 'px-3 justify-center'}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                {sidebarOpen && (
                  <div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-teal-700 to-teal-600 bg-clip-text text-transparent">
                      Policy Tracking
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">Strategic Planning</p>
                  </div>
                )}
              </div>
            </div>
            
            <nav className={`flex-1 space-y-2 ${sidebarOpen ? 'px-4' : 'px-2'}`}>
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => onPageChange(item.href)}
                    className={`group flex items-center ${sidebarOpen ? 'px-4' : 'px-2'} py-3 text-sm font-medium rounded-xl w-full transition-all duration-200 ${
                      currentPage === item.href
                        ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/25'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-teal-700'
                    } ${sidebarOpen ? 'text-left' : 'justify-center'}`}
                    disabled={isLoadingDataset}
                    title={!sidebarOpen ? item.name : undefined}
                  >
                    <Icon className={`${sidebarOpen ? 'mr-3' : ''} h-5 w-5 transition-colors ${
                      currentPage === item.href ? 'text-white' : 'text-slate-500 group-hover:text-teal-600'
                    }`} />
                    {sidebarOpen && item.name}
                  </button>
                );
              })}
              
              {/* Sidebar Collapse Toggle */}
              <div className="pt-4 mt-4 border-t border-slate-200">
                <button
                  onClick={toggleSidebar}
                  className={`group flex items-center ${sidebarOpen ? 'px-4' : 'px-2'} py-3 text-sm font-medium rounded-xl w-full transition-all duration-200 text-slate-600 hover:bg-slate-50 hover:text-slate-700 ${
                    sidebarOpen ? 'text-left' : 'justify-center'
                  }`}
                  title={sidebarOpen ? "Toggle Sidebar" : "Expand Sidebar"}
                >
                  <Menu className={`${sidebarOpen ? 'mr-3' : ''} h-5 w-5 text-slate-500 group-hover:text-slate-600`} />
                  {sidebarOpen && "Toggle Sidebar"}
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>

      <div className={`${sidebarOpen ? 'md:pl-64' : 'md:pl-20'} flex flex-col flex-1 transition-all duration-300`}>
        {/* Top header with user menu, dataset dropdown, and generate report */}
        <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200">
          <div className="flex justify-between items-center px-6 py-4">
            <button
              type="button"
              className="md:hidden -ml-1 -mt-1 h-10 w-10 inline-flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-colors"
              onClick={() => toggleSidebar()}
              disabled={isLoadingDataset}
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <div className="flex-1 md:flex-none">
              {/* Page title or breadcrumbs could go here */}
            </div>
            
            {/* Actions: Generate Report, Dataset Dropdown, and User Menu */}
            <div className="flex items-center gap-3">
              {/* Generate Report Button - Always show but disabled when no data */}
              <Button
                onClick={() => setShowReportGenerator(true)}
                disabled={isLoadingDataset || !hasDummyData()}
                className={`shadow-lg hover:shadow-xl transition-all duration-200 px-4 py-2 rounded-xl font-medium ${
                  hasDummyData() 
                    ? 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white' 
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
                title={!hasDummyData() ? 'Load demo data first to generate reports' : 'Generate executive report'}
              >
                <FileText className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Generate Report</span>
                <span className="sm:hidden">Report</span>
              </Button>

              {/* Dataset Dropdown */}
              <div className="relative">
                <Button
                  onClick={() => !isLoadingDataset && setDatasetDropdownOpen(!datasetDropdownOpen)}
                  variant="outline"
                  disabled={isLoadingDataset}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 border-slate-200 hover:bg-slate-50 ${
                    hasDummyData() 
                      ? 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 text-blue-700' 
                      : 'text-slate-700'
                  } ${isLoadingDataset ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {React.createElement(getCurrentButtonIcon(), { 
                    className: `w-4 h-4 ${isLoadingDataset ? 'animate-spin' : ''}` 
                  })}
                  <span className="hidden sm:inline max-w-48 truncate">
                    {getCurrentButtonText()}
                  </span>
                  <span className="sm:hidden">
                    {isLoadingDataset ? 'Loading' : hasDummyData() ? 'Data' : 'Demo'}
                  </span>
                  {!isLoadingDataset && (
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${datasetDropdownOpen ? 'rotate-180' : ''}`} />
                  )}
                </Button>

                {datasetDropdownOpen && !isLoadingDataset && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setDatasetDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden">
                      {/* Dropdown Header */}
                      <div className="px-4 py-3 bg-gradient-to-r from-slate-50 to-teal-50/50 border-b border-slate-200">
                        <h3 className="text-sm font-semibold text-slate-800">Demo Datasets</h3>
                        <p className="text-xs text-slate-500 mt-1">Choose a dataset to explore the application</p>
                      </div>
                      
                      {/* Clear Data Option */}
                      {hasDummyData() && (
                        <>
                          <button
                            onClick={() => handleDatasetSelect('clear')}
                            className="w-full px-4 py-3 text-left hover:bg-red-50 transition-colors group flex items-center gap-3"
                          >
                            <div className="w-8 h-8 bg-red-100 group-hover:bg-red-200 rounded-lg flex items-center justify-center transition-colors">
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-red-600">Clear All Data</div>
                              <div className="text-xs text-red-400">Remove all current data</div>
                            </div>
                          </button>
                          <div className="border-t border-slate-100"></div>
                        </>
                      )}
                      
                      {/* Dataset Options */}
                      <div className="py-1 max-h-96 overflow-y-auto">
                        {availableDatasets.map((dataset) => (
                          <button
                            key={dataset.id}
                            onClick={() => handleDatasetSelect(dataset.id)}
                            className={`w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors group flex items-start gap-3 ${
                              currentDatasetId === dataset.id ? 'bg-teal-50 border-r-2 border-teal-500' : ''
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors flex-shrink-0 mt-0.5 ${
                              currentDatasetId === dataset.id 
                                ? 'bg-teal-100 text-teal-600' 
                                : 'bg-slate-100 group-hover:bg-slate-200 text-slate-600'
                            }`}>
                              <Database className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className={`text-sm font-medium truncate ${
                                currentDatasetId === dataset.id ? 'text-teal-700' : 'text-slate-800'
                              }`}>
                                {dataset.name}
                              </div>
                              <div className={`text-xs mt-1 line-clamp-2 ${
                                currentDatasetId === dataset.id ? 'text-teal-600' : 'text-slate-500'
                              }`}>
                                {dataset.description}
                              </div>
                            </div>
                            {currentDatasetId === dataset.id && (
                              <div className="flex-shrink-0 w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
                            )}
                          </button>
                        ))}
                      </div>
                      
                      {/* Dropdown Footer */}
                      <div className="px-4 py-3 bg-slate-50 border-t border-slate-200">
                        <p className="text-xs text-slate-500">
                          Datasets include strategic objectives, processes, metrics, and more
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              {/* User Menu Component */}
              <UserMenu />
            </div>
          </div>
        </div>
        
        <main className="flex-1 bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
          {children}
        </main>
      </div>

      {/* Executive Report Generator Modal */}
      <ExecutiveReportGenerator 
        open={showReportGenerator} 
        onOpenChange={setShowReportGenerator} 
      />
    </div>
  );
};

export default Layout;