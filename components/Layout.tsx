// components/Layout.tsx
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
  Loader2,
  LineChart,
  Route,
  Trash2,
  FileText
} from 'lucide-react';

import UserMenu from './UserMenu';
import ExecutiveReportGenerator from './ExecutiveReportGenerator';
import OnboardingModal from './OnboardingModal';
import { useHoshinStore } from '../store/hoshinStore';
import { useUiStore } from '../store/uiStore';
import { Button } from './ui/button';

// Custom Hoshin Kanri SVG Logo
const HoshinLogo = ({ size = 'md' }: { size?: 'sm' | 'md' }) => {
  const dim = size === 'sm' ? 'w-8 h-8' : 'w-10 h-10';
  const iconDim = size === 'sm' ? 'w-5 h-5' : 'w-6 h-6';
  return (
    <div className={`${dim} bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg`}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={iconDim}>
        <path d="M12 2L12 22" stroke="white" strokeWidth="1" strokeOpacity="0.3" />
        <path d="M2 12L22 12" stroke="white" strokeWidth="1" strokeOpacity="0.3" />
        <rect x="5" y="5" width="14" height="14" rx="1" stroke="white" strokeWidth="1.5" strokeOpacity="0.5" transform="rotate(45 12 12)" />
        <circle cx="12" cy="12" r="2.5" fill="white" />
        <circle cx="12" cy="6" r="1.5" fill="white" fillOpacity="0.7" />
        <circle cx="12" cy="18" r="1.5" fill="white" fillOpacity="0.7" />
        <circle cx="6" cy="12" r="1.5" fill="white" fillOpacity="0.7" />
        <circle cx="18" cy="12" r="1.5" fill="white" fillOpacity="0.7" />
      </svg>
    </div>
  );
};

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
  onSidebarToggle?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, onPageChange }) => {
  const { sidebarOpen, toggleSidebar } = useUiStore();
  const [isLoadingDataset, setIsLoadingDataset] = useState(false);
  const [showReportGenerator, setShowReportGenerator] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  const {
    loadDataset,
    clearAllData,
    hasDummyData
  } = useHoshinStore();

  const handleLoadDemoData = async () => {
    setIsLoadingDataset(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    loadDataset('dishhome-unified');
    setIsLoadingDataset(false);
    setShowOnboarding(true);
  };

  const handleClearData = async () => {
    setIsLoadingDataset(true);
    await new Promise(resolve => setTimeout(resolve, 200));
    clearAllData();
    setIsLoadingDataset(false);
  };

  const navigation = [
    { name: 'Dashboard', href: 'dashboard', icon: Home },
    { name: 'X-Matrix', href: 'matrix', icon: Target },
    { name: 'Catchball', href: 'catchball', icon: MessageSquare },
    { name: 'Roadmap', href: 'roadmap', icon: Route },
    { name: 'Objectives', href: 'objectives', icon: BarChart3 },
    { name: 'Kano Model', href: 'kano', icon: LineChart },
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
                <HoshinLogo size="sm" />
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
                    className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl w-full text-left transition-all duration-200 ${currentPage === item.href
                      ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-teal-700'
                      }`}
                    disabled={isLoadingDataset}
                  >
                    <Icon className={`mr-3 h-5 w-5 transition-colors ${currentPage === item.href ? 'text-white' : 'text-slate-500 group-hover:text-teal-600'
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
      <div className={`hidden md:flex ${sidebarOpen ? 'md:w-56' : 'md:w-16'} md:flex-col md:fixed md:inset-y-0 transition-all duration-300`}>
        <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-slate-200 shadow-sm">
          <div className="flex-1 flex flex-col pt-3 pb-3 overflow-y-auto">
            <div className={`flex items-center flex-shrink-0 mb-5 ${sidebarOpen ? 'px-4' : 'px-2 justify-center'}`}>
              <div className="flex items-center gap-2.5">
                <HoshinLogo size="sm" />
                {sidebarOpen && (
                  <div>
                    <h1 className="text-sm font-bold bg-gradient-to-r from-teal-700 to-teal-600 bg-clip-text text-transparent">
                      Policy Tracking
                    </h1>
                    <p className="text-[10px] text-slate-500">Strategic Planning</p>
                  </div>
                )}
              </div>
            </div>

            <nav className={`flex-1 space-y-1 ${sidebarOpen ? 'px-3' : 'px-1.5'}`}>
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => onPageChange(item.href)}
                    className={`group flex items-center ${sidebarOpen ? 'px-3' : 'px-2'} py-2 text-xs font-medium rounded-lg w-full transition-all duration-200 ${currentPage === item.href
                      ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-md shadow-teal-500/25'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-teal-700'
                      } ${sidebarOpen ? 'text-left' : 'justify-center'}`}
                    disabled={isLoadingDataset}
                    title={!sidebarOpen ? item.name : undefined}
                  >
                    <Icon className={`${sidebarOpen ? 'mr-2.5' : ''} h-4 w-4 transition-colors ${currentPage === item.href ? 'text-white' : 'text-slate-500 group-hover:text-teal-600'
                      }`} />
                    {sidebarOpen && item.name}
                  </button>
                );
              })}

              {/* Sidebar Collapse Toggle */}
              <div className="pt-3 mt-3 border-t border-slate-200">
                <button
                  onClick={toggleSidebar}
                  className={`group flex items-center ${sidebarOpen ? 'px-3' : 'px-2'} py-2 text-xs font-medium rounded-lg w-full transition-all duration-200 text-slate-600 hover:bg-slate-50 hover:text-slate-700 ${sidebarOpen ? 'text-left' : 'justify-center'
                    }`}
                  title={sidebarOpen ? "Toggle Sidebar" : "Expand Sidebar"}
                >
                  <Menu className={`${sidebarOpen ? 'mr-2.5' : ''} h-4 w-4 text-slate-500 group-hover:text-slate-600`} />
                  {sidebarOpen && "Toggle Sidebar"}
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>

      <div className={`${sidebarOpen ? 'md:pl-56' : 'md:pl-16'} flex flex-col flex-1 transition-all duration-300`}>
        {/* Top header */}
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

            <div className="flex-1 md:flex-none" />

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Generate Report Button */}
              <Button
                onClick={() => setShowReportGenerator(true)}
                disabled={isLoadingDataset || !hasDummyData()}
                className={`shadow-md hover:shadow-lg transition-all duration-200 px-4 py-2 rounded-xl font-medium gap-2 ${hasDummyData()
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                title={!hasDummyData() ? 'Load demo data first to generate reports' : 'Generate executive report'}
              >
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Generate Report</span>
                <span className="sm:hidden">Report</span>
              </Button>

              {/* Load / Clear Data Button */}
              {hasDummyData() ? (
                <Button
                  onClick={handleClearData}
                  variant="outline"
                  disabled={isLoadingDataset}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Clear Data</span>
                </Button>
              ) : (
                <Button
                  onClick={handleLoadDemoData}
                  disabled={isLoadingDataset}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${isLoadingDataset
                    ? 'opacity-70 cursor-not-allowed bg-slate-100 text-slate-400'
                    : 'bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-md hover:shadow-lg'
                    }`}
                >
                  {isLoadingDataset ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Database className="w-4 h-4" />
                  )}
                  <span className="hidden sm:inline">
                    {isLoadingDataset ? 'Loading...' : 'Load Demo Data'}
                  </span>
                  <span className="sm:hidden">
                    {isLoadingDataset ? '...' : 'Demo'}
                  </span>
                </Button>
              )}

              {/* User Menu */}
              <UserMenu />
            </div>
          </div>
        </div>

        <main className="flex-1 bg-gradient-to-br from-slate-50 via-white to-teal-50/30 main-content">
          {children}
        </main>
      </div>

      {/* Modals */}
      <ExecutiveReportGenerator
        open={showReportGenerator}
        onOpenChange={setShowReportGenerator}
      />
      <OnboardingModal
        open={showOnboarding}
        onOpenChange={setShowOnboarding}
      />
    </div>
  );
};

export default Layout;
