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
  Database
} from 'lucide-react';

import UserMenu from './UserMenu';
import { useHoshinStore } from '../store/hoshinStore';
import { allDummyData } from '@/lib/dummyData';
import { Button } from './ui/button';

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
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu */}
      <div className={`fixed inset-0 flex z-40 md:hidden ${sidebarOpen ? '' : 'pointer-events-none'}`}>
        <div className={`fixed inset-0 bg-gray-600 bg-opacity-75 ${sidebarOpen ? 'opacity-100' : 'opacity-0'} transition-opacity`} 
             onClick={() => setSidebarOpen(false)} />
        
        <div className={`relative flex-1 flex flex-col max-w-xs w-full bg-white ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform`}>
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <h1 className="text-xl font-bold text-gray-900">Hoshin Kanri</h1>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      onPageChange(item.href);
                      setSidebarOpen(false);
                    }}
                    className={`group flex items-center px-2 py-2 text-base font-medium rounded-md w-full text-left ${
                      currentPage === item.href
                        ? 'bg-blue-100 text-blue-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="mr-4 h-6 w-6" />
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
        <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-xl font-bold text-gray-900">Hoshin Kanri</h1>
            </div>
            <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => onPageChange(item.href)}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left ${
                      currentPage === item.href
                        ? 'bg-blue-100 text-blue-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="mr-3 h-5 w-5" />
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
        <div className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200">
          <div className="flex justify-between items-center px-4 py-3">
            <button
              type="button"
              className="md:hidden -ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <div className="flex-1 md:flex-none">
              {/* Page title or breadcrumbs could go here */}
            </div>
            
            {/* Dummy Data Toggle Button */}
            <div className="flex items-center space-x-3">
              <Button
                onClick={handleToggleDummyData}
                variant={hasDummyData() ? "destructive" : "default"}
                size="sm"
                className="flex items-center space-x-2"
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
        
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;