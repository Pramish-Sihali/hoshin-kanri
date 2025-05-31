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
  Zap
} from 'lucide-react';

import UserMenu from './UserMenu';
import { useHoshinStore } from '../store/hoshinStore';
import { allDummyData } from '@/lib/dummyData';
import { Button } from './ui/button';
import Image from 'next/image';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, onPageChange }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { loadDummyData, clearAllData, hasDummyData } = useHoshinStore();
  
  const handleToggleDummyData = () => {
    if (hasDummyData()) {
      clearAllData();
    } else {
      loadDummyData(allDummyData);
    }
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
      {/* Mobile menu */}
      <div className={`fixed inset-0 flex z-40 md:hidden ${sidebarOpen ? '' : 'pointer-events-none'}`}>
        <div className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm ${sidebarOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`} 
             onClick={() => setSidebarOpen(false)} />
        
        <div className={`relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-2xl ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          
          <div className="flex-1 h-0 pt-4 pb-4 overflow-y-auto">
            {/* Company Logos Section - Mobile Top */}
            <div className="px-4 mb-6">
              <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-4 shadow-md border border-slate-100">
                <div className="text-center space-y-3">
                  <div className="text-xs text-slate-600 font-semibold uppercase tracking-wider">Powered by</div>
                  <div className="flex items-center justify-center gap-4">
                    <div className="hover:scale-105 transition-all duration-200">
                      <Image
                        src="/ixi.svg"
                        alt="IXI Logo"
                        width={85}
                        height={42}
                        className="opacity-90 hover:opacity-100 transition-opacity drop-shadow-md"
                      />
                    </div>
                    <div className="hover:scale-105 transition-all duration-200">
                      <Image
                        src="/igpa.png"
                        alt="IGPA Logo"
                        width={70}
                        height={35}
                        className="opacity-90 hover:opacity-100 transition-opacity drop-shadow-md"
                      />
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 font-medium">The Institute & IXI Corp.</div>
                </div>
              </div>
            </div>

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
                      setSidebarOpen(false);
                    }}
                    className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl w-full text-left transition-all duration-200 ${
                      currentPage === item.href
                        ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-teal-700'
                    }`}
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

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-slate-200 shadow-lg">
          <div className="flex-1 flex flex-col pt-4 pb-4 overflow-y-auto">
            {/* Company Logos Section - Desktop Top */}
            <div className="flex-shrink-0 px-4 mb-6">
              <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-5 shadow-lg border border-slate-100">
                <div className="text-center space-y-4">
                  <div className="text-xs text-slate-600 font-semibold uppercase tracking-wider">Powered by</div>
                  <div className="flex items-center justify-center gap-6">
                    <div className="hover:scale-105 transition-all duration-200">
                      <Image
                        src="/ixi.svg"
                        alt="IXI Logo"
                        width={95}
                        height={47}
                        className="opacity-90 hover:opacity-100 transition-opacity drop-shadow-lg"
                      />
                    </div>
                    <div className="hover:scale-105 transition-all duration-200">
                      <Image
                        src="/igpa.png"
                        alt="IGPA Logo"
                        width={80}
                        height={40}
                        className="opacity-90 hover:opacity-100 transition-opacity drop-shadow-lg"
                      />
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 font-medium">The Institute & IXI Corp.</div>
                </div>
              </div>
            </div>

            <div className="flex items-center flex-shrink-0 px-6 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-teal-700 to-teal-600 bg-clip-text text-transparent">
                    Policy Tracking
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">Strategic Planning</p>
                </div>
              </div>
            </div>
            
            <nav className="flex-1 px-4 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => onPageChange(item.href)}
                    className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl w-full text-left transition-all duration-200 ${
                      currentPage === item.href
                        ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/25'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-teal-700'
                    }`}
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

      <div className="md:pl-64 flex flex-col flex-1">
        {/* Top header with user menu and dummy data toggle */}
        <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200">
          <div className="flex justify-between items-center px-6 py-4">
            <button
              type="button"
              className="md:hidden -ml-1 -mt-1 h-10 w-10 inline-flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <div className="flex-1 md:flex-none">
              {/* Page title or breadcrumbs could go here */}
            </div>
            
            {/* Dummy Data Toggle Button */}
            <div className="flex items-center gap-4">
              <Button
                onClick={handleToggleDummyData}
                variant={hasDummyData() ? "destructive" : "default"}
                size="sm"
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  hasDummyData() 
                    ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl' 
                    : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl'
                }`}
              >
                <Database className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {hasDummyData() ? 'Clear Demo Data' : 'Load Demo Data'}
                </span>
                <span className="sm:hidden">
                  {hasDummyData() ? 'Clear' : 'Demo'}
                </span>
              </Button>
              
              {/* User Menu Component */}
              <UserMenu />
            </div>
          </div>
        </div>
        
        <main className="flex-1 bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;