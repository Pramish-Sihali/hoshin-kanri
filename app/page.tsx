'use client';

import React, { useState } from 'react';
import AuthGuard from '../components/AuthGuard';
import Layout from '../components/Layout';
import Dashboard from '../components/Dashboard';
import XMatrix from '../components/XMatrix';
import CatchballBoard from '../components/CatchballBoard';
import ObjectivesManagement from '../components/ObjectivesManagement';
import ProcessManagement from '../components/ProcessManagement';
import KanoModel from '../components/KanoModel';

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
        return <ObjectivesManagement />;
      case 'processes':
        return <ProcessManagement />;
      case 'kano':
        return <KanoModel />;
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