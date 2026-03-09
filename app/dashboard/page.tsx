'use client';

import React, { useState, lazy, Suspense } from 'react';
import AuthGuard from '../../components/AuthGuard';
import Layout from '../../components/Layout';
import Dashboard from '../../components/Dashboard';
import { Skeleton } from '../../components/ui/skeleton';
import { Card, CardContent, CardHeader } from '../../components/ui/card';

const XMatrix = lazy(() => import('../../components/XMatrix'));
const CatchballBoard = lazy(() => import('../../components/CatchballBoard'));
const ObjectivesManagement = lazy(() => import('../../components/ObjectivesManagement'));
const ProcessManagement = lazy(() => import('../../components/ProcessManagement'));
const KanoModel = lazy(() => import('../../components/KanoModel'));
const GanttChart = lazy(() => import('../../components/GanttChart').then(m => ({ default: m.GanttChart })));

const PageSkeleton = () => (
  <div className="p-5 space-y-5">
    <div className="space-y-2">
      <Skeleton className="h-7 w-72" />
      <Skeleton className="h-4 w-96" />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {Array.from({ length: 2 }).map((_, i) => (
        <Card key={i} className="border shadow-sm">
          <CardHeader className="pb-3">
            <Skeleton className="h-5 w-40" />
          </CardHeader>
          <CardContent className="space-y-3">
            {Array.from({ length: 4 }).map((_, j) => (
              <Skeleton key={j} className="h-4 w-full" />
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default function DashboardPage() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'matrix':
        return (
          <Suspense fallback={<PageSkeleton />}>
            <XMatrix />
          </Suspense>
        );
      case 'catchball':
        return (
          <Suspense fallback={<PageSkeleton />}>
            <CatchballBoard />
          </Suspense>
        );
      case 'roadmap':
        return (
          <Suspense fallback={<PageSkeleton />}>
            <div className="p-5">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-700 to-teal-600 bg-clip-text text-transparent mb-5">
                Strategic Roadmap
              </h1>
              <GanttChart />
            </div>
          </Suspense>
        );
      case 'objectives':
        return (
          <Suspense fallback={<PageSkeleton />}>
            <ObjectivesManagement />
          </Suspense>
        );
      case 'processes':
        return (
          <Suspense fallback={<PageSkeleton />}>
            <ProcessManagement />
          </Suspense>
        );
      case 'kano':
        return (
          <Suspense fallback={<PageSkeleton />}>
            <KanoModel />
          </Suspense>
        );
      case 'settings':
        return (
          <div className="p-5">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Settings</h1>
            <p className="text-sm text-gray-600">Application settings coming soon...</p>
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
