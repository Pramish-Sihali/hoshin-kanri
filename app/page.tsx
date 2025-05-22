'use client';

import React, { useState } from 'react';
import AuthGuard from '../components/AuthGuard';
import Layout from '../components/Layout';
import Dashboard from '../components/Dashboard';
import XMatrix from '../components/XMatrix';
import CatchballBoard from '../components/CatchballBoard';

export default function Home() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'matrix':
        return <XMatrix />;
      case 'catchball':
        return <CatchballBoard />;
      case 'objectives':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Objectives Management</h1>
            <p className="text-gray-600">Detailed objectives management coming soon...</p>
          </div>
        );
      case 'processes':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Process Management</h1>
            <p className="text-gray-600">Process management features coming soon...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Settings</h1>
            <p className="text-gray-600">Application settings coming soon...</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <AuthGuard>
      <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
        {renderPage()}
      </Layout>
    </AuthGuard>
  );
}
