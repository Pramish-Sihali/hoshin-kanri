// components/UserMenu.tsx
'use client';

import React, { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { User, LogOut, Settings, ChevronDown, Shield, Mail } from 'lucide-react';

const UserMenu: React.FC = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  if (!session) return null;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleColor = (role?: string) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return 'bg-gradient-to-r from-red-500 to-red-600 text-white';
      case 'manager':
        return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white';
      case 'user':
        return 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white';
      default:
        return 'bg-gradient-to-r from-slate-500 to-slate-600 text-white';
    }
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-100 transition-all duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md">
            {session.user.name ? getInitials(session.user.name) : <User className="w-4 h-4" />}
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-slate-800">{session.user.name}</p>
            {session.user.role && (
              <p className="text-xs text-slate-500 capitalize">{session.user.role}</p>
            )}
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden">
            {/* User Info Header */}
            <div className="px-6 py-5 bg-gradient-to-br from-slate-50 to-teal-50/50 border-b border-slate-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                  {session.user.name ? getInitials(session.user.name) : <User className="w-6 h-6" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-lg font-semibold text-slate-800 truncate">
                    {session.user.name || 'User'}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Mail className="w-3 h-3 text-slate-500" />
                    <p className="text-sm text-slate-600 truncate">{session.user.email}</p>
                  </div>
                  {session.user.role && (
                    <div className="mt-2">
                      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${getRoleColor(session.user.role)}`}>
                        <Shield className="w-3 h-3" />
                        {session.user.role}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Menu Items */}
            <div className="py-2">
              <button
                className="flex items-center w-full px-6 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-teal-700 transition-colors group"
                onClick={() => setIsOpen(false)}
              >
                <div className="w-8 h-8 bg-slate-100 group-hover:bg-teal-100 rounded-lg flex items-center justify-center mr-3 transition-colors">
                  <Settings className="w-4 h-4 text-slate-600 group-hover:text-teal-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Account Settings</div>
                  <div className="text-xs text-slate-500">Manage your preferences</div>
                </div>
              </button>
              
              <div className="border-t border-slate-100 my-2"></div>
              
              <button
                className="flex items-center w-full px-6 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors group"
                onClick={() => signOut({ callbackUrl: '/auth/signin' })}
              >
                <div className="w-8 h-8 bg-red-100 group-hover:bg-red-200 rounded-lg flex items-center justify-center mr-3 transition-colors">
                  <LogOut className="w-4 h-4 text-red-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Sign Out</div>
                  <div className="text-xs text-red-400">End your session</div>
                </div>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserMenu;