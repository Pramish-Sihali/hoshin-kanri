// components/LandingPage.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
  Target,
  BarChart3,
  MessageSquare,
  LineChart,
  ArrowRight,
  CheckCircle2,
  Layers,
  GitBranch,
  Route,
  Users,
  Activity,
  Shield,
  Zap,
  TrendingUp,
  FileText,
  PieChart
} from 'lucide-react';
import { Button } from './ui/button';

const HoshinLogo = ({ className = 'w-10 h-10' }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="2" y="2" width="44" height="44" rx="8" fill="url(#logo-grad)" />
    <path d="M24 8L24 40" stroke="white" strokeWidth="1.5" strokeOpacity="0.3" />
    <path d="M8 24L40 24" stroke="white" strokeWidth="1.5" strokeOpacity="0.3" />
    <rect x="12" y="12" width="24" height="24" rx="2" stroke="white" strokeWidth="2" strokeOpacity="0.6" transform="rotate(45 24 24)" />
    <circle cx="24" cy="24" r="4" fill="white" />
    <circle cx="24" cy="14" r="2.5" fill="white" fillOpacity="0.8" />
    <circle cx="24" cy="34" r="2.5" fill="white" fillOpacity="0.8" />
    <circle cx="14" cy="24" r="2.5" fill="white" fillOpacity="0.8" />
    <circle cx="34" cy="24" r="2.5" fill="white" fillOpacity="0.8" />
    <defs>
      <linearGradient id="logo-grad" x1="2" y1="2" x2="46" y2="46" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0d9488" />
        <stop offset="1" stopColor="#0f766e" />
      </linearGradient>
    </defs>
  </svg>
);

const features = [
  {
    icon: Target,
    title: 'X-Matrix Visualization',
    description: 'Interactive Hoshin Kanri X-Matrix linking strategic objectives, annual goals, processes, and metrics in one unified view.',
    color: 'teal'
  },
  {
    icon: BarChart3,
    title: 'Objectives & KPI Tracking',
    description: 'Manage strategic and annual objectives with real-time progress tracking, owner assignment, and status monitoring.',
    color: 'blue'
  },
  {
    icon: MessageSquare,
    title: 'Catchball Communication',
    description: 'Facilitate top-down and bottom-up dialogue with structured questions, concerns, approvals, and suggestions across levels.',
    color: 'purple'
  },
  {
    icon: LineChart,
    title: 'Kano Model Analysis',
    description: 'Classify product features using the Kano model and benchmark against competitors with visual scatter-plot analytics.',
    color: 'orange'
  },
  {
    icon: Route,
    title: 'Strategic Roadmap',
    description: 'Gantt-style timeline view of initiatives across financial, process, technology, and people dimensions.',
    color: 'emerald'
  },
  {
    icon: Layers,
    title: 'SIPOC Process Mapping',
    description: 'Document Suppliers, Inputs, Process steps, Outputs, and Customers for each strategic process end-to-end.',
    color: 'rose'
  }
];

const stats = [
  { value: '6', label: 'Executive Levels', icon: Users },
  { value: '8+', label: 'Strategic Views', icon: PieChart },
  { value: '100%', label: 'Alignment Visibility', icon: Activity },
  { value: 'Real-time', label: 'Progress Tracking', icon: TrendingUp }
];

const steps = [
  {
    number: '01',
    title: 'Define Strategy',
    description: 'Set 3-5 year breakthrough objectives that define where your organization is headed. Assign owners and priorities.',
    icon: Target
  },
  {
    number: '02',
    title: 'Cascade Goals',
    description: 'Break strategic objectives into annual targets. Link each annual objective to the strategic goal it supports.',
    icon: GitBranch
  },
  {
    number: '03',
    title: 'Map Processes',
    description: 'Define key processes and projects that drive annual objectives. Document with SIPOC for full process clarity.',
    icon: Layers
  },
  {
    number: '04',
    title: 'Measure & Align',
    description: 'Track KPIs against targets. Use catchball to align across all levels — from CEO to frontline teams.',
    icon: BarChart3
  }
];

const capabilities = [
  'Interactive X-Matrix with correlation mapping',
  'Multi-level objective cascade (strategic → annual → process → metric)',
  'Catchball board for cross-level communication',
  'Kano model feature classification & competitor benchmarking',
  'Gantt chart roadmap across 4 strategic dimensions',
  'SIPOC process documentation for every initiative',
  'Executive report generation with strategic insights',
  'Real-time dashboard with status distribution analytics'
];

const colorMap: Record<string, { iconBg: string; iconText: string; border: string }> = {
  teal: { iconBg: 'bg-teal-100', iconText: 'text-teal-600', border: 'hover:border-teal-200' },
  blue: { iconBg: 'bg-blue-100', iconText: 'text-blue-600', border: 'hover:border-blue-200' },
  purple: { iconBg: 'bg-purple-100', iconText: 'text-purple-600', border: 'hover:border-purple-200' },
  orange: { iconBg: 'bg-orange-100', iconText: 'text-orange-600', border: 'hover:border-orange-200' },
  emerald: { iconBg: 'bg-emerald-100', iconText: 'text-emerald-600', border: 'hover:border-emerald-200' },
  rose: { iconBg: 'bg-rose-100', iconText: 'text-rose-600', border: 'hover:border-rose-200' }
};

export default function LandingPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleGetStarted = () => {
    if (session) {
      router.push('/dashboard');
    } else {
      router.push('/auth/signin');
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <HoshinLogo className="w-9 h-9" />
            <div>
              <span className="text-lg font-bold text-slate-900">Policy Tracking</span>
              <span className="hidden sm:inline text-sm text-slate-500 ml-2">Strategic Planning</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {session ? (
              <Button
                onClick={() => router.push('/dashboard')}
                className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-xl px-6"
              >
                Go to Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => router.push('/auth/signin')}
                  className="text-slate-600 hover:text-slate-900 rounded-xl"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => router.push('/auth/signin')}
                  className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-xl px-6"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-8 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-teal-100/40 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-orange-100/30 rounded-full blur-3xl" />
          <div className="absolute top-40 left-1/3 w-64 h-64 bg-blue-100/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 border border-teal-100 rounded-full text-sm text-teal-700 font-medium mb-8">
              <GitBranch className="w-4 h-4" />
              Hoshin Kanri Methodology
            </div>

            <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
              Strategic Policy
              <span className="block bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">
                Deployment Platform
              </span>
            </h1>

            <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl mx-auto">
              Align your organization from boardroom to frontline. Define breakthrough objectives,
              cascade annual goals, track processes, and measure results — all through the proven
              Hoshin Kanri X-Matrix framework.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <Button
                onClick={handleGetStarted}
                size="lg"
                className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-xl px-8 py-6 text-lg shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/30 transition-all"
              >
                {session ? 'Go to Dashboard' : 'Get Started Free'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleGetStarted}
                className="rounded-xl px-8 py-6 text-lg border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                View Demo
              </Button>
            </div>

            <p className="text-sm text-slate-400">No credit card required. Load demo data to explore instantly.</p>
          </div>
        </div>
      </section>

      {/* App Screenshot / Preview Section */}
      <section className="relative pb-20 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl shadow-slate-300/50 overflow-hidden">
            {/* Browser Chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-800 border-b border-slate-700">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 bg-slate-700 rounded-md text-xs text-slate-400 font-mono">
                  Strategy-Deployment
                </div>
              </div>
            </div>

            {/* App Mockup Content */}
            <div className="p-6 bg-gradient-to-br from-slate-50 to-white">
              <div className="flex gap-5">
                {/* Sidebar Mock */}
                <div className="w-48 flex-shrink-0 bg-white rounded-xl border border-slate-200 p-4 hidden md:block">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
                      <Target className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">Policy Tracking</div>
                      <div className="text-[10px] text-slate-400">Strategic Planning</div>
                    </div>
                  </div>
                  {[
                    { name: 'Dashboard', active: true },
                    { name: 'X-Matrix', active: false },
                    { name: 'Catchball', active: false },
                    { name: 'Roadmap', active: false },
                    { name: 'Objectives', active: false },
                    { name: 'Kano Model', active: false },
                  ].map((item) => (
                    <div key={item.name} className={`px-3 py-2 rounded-lg text-xs font-medium mb-1 ${item.active ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white' : 'text-slate-500'}`}>
                      {item.name}
                    </div>
                  ))}
                </div>

                {/* Main Content Mock */}
                <div className="flex-1 space-y-4">
                  {/* Metric Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                      { label: 'Total Objectives', value: '24', color: 'teal' },
                      { label: 'Avg Performance', value: '78.5%', color: 'emerald' },
                      { label: 'Active Processes', value: '12', color: 'blue' },
                      { label: 'Pending Catchball', value: '5', color: 'orange' },
                    ].map((card) => (
                      <div key={card.label} className="bg-white rounded-lg border border-slate-200 p-3">
                        <div className="text-[10px] text-slate-500 font-medium">{card.label}</div>
                        <div className={`text-lg font-bold text-${card.color}-600 mt-0.5`}>{card.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Charts Mock Row */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <div className="bg-white rounded-lg border border-slate-200 p-4">
                      <div className="text-xs font-semibold text-slate-700 mb-3 flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-teal-500" />
                        Status Distribution
                      </div>
                      <div className="space-y-2">
                        {[
                          { label: 'Completed', pct: 45, color: 'bg-emerald-500' },
                          { label: 'In Progress', pct: 35, color: 'bg-blue-500' },
                          { label: 'At Risk', pct: 20, color: 'bg-red-500' },
                        ].map((row) => (
                          <div key={row.label}>
                            <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                              <span>{row.label}</span>
                              <span>{row.pct}%</span>
                            </div>
                            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className={`h-full ${row.color} rounded-full`} style={{ width: `${row.pct}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-white rounded-lg border border-slate-200 p-4">
                      <div className="text-xs font-semibold text-slate-700 mb-3 flex items-center gap-1.5">
                        <Target className="w-3.5 h-3.5 text-teal-500" />
                        Strategic Objectives
                      </div>
                      <div className="space-y-2">
                        {[
                          'Market Expansion Strategy',
                          'Digital Transformation',
                          'Customer Experience Excellence',
                        ].map((obj) => (
                          <div key={obj} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                            <span className="text-[10px] font-medium text-slate-700">{obj}</span>
                            <div className="w-14 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                              <div className="h-full bg-teal-500 rounded-full" style={{ width: `${Math.random() * 40 + 40}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating badges around the screenshot */}
          <div className="hidden lg:block absolute -left-4 top-1/2 -translate-y-1/2">
            <div className="bg-white rounded-xl shadow-lg border border-slate-100 px-4 py-3 flex items-center gap-2.5">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-800">Real-time Sync</div>
                <div className="text-[10px] text-slate-500">Always up to date</div>
              </div>
            </div>
          </div>
          <div className="hidden lg:block absolute -right-4 top-1/3">
            <div className="bg-white rounded-xl shadow-lg border border-slate-100 px-4 py-3 flex items-center gap-2.5">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-800">Secure Access</div>
                <div className="text-[10px] text-slate-500">Auth protected</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-5 h-5 text-teal-600" />
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900">{stat.value}</div>
                  <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-xs text-blue-700 font-medium mb-4">
              <Zap className="w-3.5 h-3.5" />
              Powerful Features
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Everything you need for strategic execution
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              A complete toolkit for Hoshin Kanri policy deployment — from setting vision to measuring impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              const c = colorMap[feature.color];
              return (
                <div
                  key={i}
                  className={`bg-white rounded-2xl p-7 border border-slate-100 ${c.border} hover:shadow-lg transition-all duration-300 group`}
                >
                  <div className={`w-11 h-11 ${c.iconBg} rounded-xl flex items-center justify-center mb-4 transition-colors`}>
                    <Icon className={`w-5 h-5 ${c.iconText}`} />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* X-Matrix Explainer */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-teal-50/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-teal-50 border border-teal-100 rounded-full text-xs text-teal-700 font-medium mb-4">
                <Target className="w-3.5 h-3.5" />
                Core Framework
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                The X-Matrix: Strategy on one page
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                The Hoshin Kanri X-Matrix condenses your entire strategic plan into a single, powerful visual.
                It shows the relationships between what you want to achieve, how you will achieve it,
                who is responsible, and how you will measure success.
              </p>
              <div className="space-y-4">
                {[
                  { label: 'WHAT', desc: 'Strategic Objectives (3-5 year breakthrough goals)', color: 'text-orange-600 bg-orange-50' },
                  { label: 'HOW', desc: 'Key Processes & Projects that drive execution', color: 'text-blue-600 bg-blue-50' },
                  { label: 'HOW FAR', desc: 'Annual Objectives cascaded from strategy', color: 'text-teal-600 bg-teal-50' },
                  { label: 'HOW MUCH', desc: 'KPI Metrics measuring progress and impact', color: 'text-purple-600 bg-purple-50' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${item.color} flex-shrink-0 mt-0.5`}>
                      {item.label}
                    </span>
                    <span className="text-sm text-slate-600">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* X-Matrix Visual */}
            <div className="relative">
              <div className="rounded-2xl border border-slate-200 bg-white shadow-xl p-8">
                <div className="grid grid-cols-3 gap-4 items-center">
                  <div className="space-y-2.5">
                    <div className="text-[10px] font-semibold text-teal-600 uppercase tracking-wider">How Far</div>
                    {['Revenue Growth ≥25%', 'Market Share +15%', 'Customer NPS >70'].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 px-3 py-2 bg-teal-50 rounded-lg border border-teal-100">
                        <CheckCircle2 className="w-3 h-3 text-teal-500 flex-shrink-0" />
                        <span className="text-[10px] text-teal-800 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="w-28 h-28 relative">
                      <div className="absolute inset-0 border-2 border-slate-200 rounded-sm transform rotate-45" />
                      <div className="absolute inset-3 border-2 border-teal-300 rounded-sm transform rotate-45" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                          <Target className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-2 h-2 bg-teal-400 rounded-full" />
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-2 h-2 bg-orange-400 rounded-full" />
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-blue-400 rounded-full" />
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-purple-400 rounded-full" />
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <div className="text-[10px] font-semibold text-purple-600 uppercase tracking-wider">How Much</div>
                    {['ROIC ≥ 12%', 'Margin ≥ 22%', 'Cash Flow +18%'].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 px-3 py-2 bg-purple-50 rounded-lg border border-purple-100">
                        <BarChart3 className="w-3 h-3 text-purple-500 flex-shrink-0" />
                        <span className="text-[10px] text-purple-800 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between mt-5 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-orange-400" />
                    <span className="text-[10px] font-semibold text-orange-600 uppercase tracking-wider">What — Strategic Objectives</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                    <span className="text-[10px] font-semibold text-blue-600 uppercase tracking-wider">How — Processes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full text-xs text-emerald-700 font-medium mb-4">
              <Route className="w-3.5 h-3.5" />
              Implementation Flow
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              From strategy to execution in four steps
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              The Hoshin Kanri process ensures every team member understands how their work connects to organizational strategy.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="relative bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-lg hover:border-teal-200 transition-all">
                  <div className="text-4xl font-extrabold bg-gradient-to-b from-teal-200 to-teal-50 bg-clip-text text-transparent mb-3">
                    {step.number}
                  </div>
                  <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-teal-600" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-12 -right-3 text-slate-300">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Capabilities Checklist */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Built for strategic planning teams
            </h2>
            <p className="text-lg text-slate-600">
              Every feature designed around the Hoshin Kanri methodology
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {capabilities.map((cap, i) => (
              <div key={i} className="flex items-center gap-3 bg-white rounded-xl px-5 py-4 border border-slate-100">
                <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0" />
                <span className="text-sm font-medium text-slate-700">{cap}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Report Generation Highlight */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Mock Report */}
            <div className="order-2 lg:order-1">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-white" />
                    <div>
                      <div className="text-sm font-semibold text-white">Executive Strategy Report</div>
                      <div className="text-xs text-purple-200">Auto-generated from your data</div>
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Strategic Summary</div>
                    <div className="h-2 bg-slate-100 rounded-full w-full" />
                    <div className="h-2 bg-slate-100 rounded-full w-4/5 mt-1.5" />
                    <div className="h-2 bg-slate-100 rounded-full w-3/5 mt-1.5" />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {['On Track', 'At Risk', 'Completed'].map((label) => (
                      <div key={label} className="bg-slate-50 rounded-lg p-3 text-center">
                        <div className="text-lg font-bold text-slate-800">{Math.floor(Math.random() * 8 + 2)}</div>
                        <div className="text-[10px] text-slate-500">{label}</div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-2">Key Recommendations</div>
                    {[1, 2, 3].map((n) => (
                      <div key={n} className="flex items-start gap-2 mb-2">
                        <div className="w-4 h-4 bg-purple-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-[8px] font-bold text-purple-600">{n}</span>
                        </div>
                        <div className="flex-1">
                          <div className="h-2 bg-slate-100 rounded-full w-full" />
                          <div className="h-2 bg-slate-100 rounded-full w-3/4 mt-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-50 border border-purple-100 rounded-full text-xs text-purple-700 font-medium mb-4">
                <FileText className="w-3.5 h-3.5" />
                Executive Reports
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                Generate executive reports in one click
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Transform your strategic data into polished executive reports. Get automatic summaries of
                objective progress, risk assessments, and actionable recommendations — ready for board presentations.
              </p>
              <div className="space-y-3">
                {[
                  'Strategic alignment summary across all levels',
                  'Risk identification and mitigation suggestions',
                  'KPI performance analysis with trend indicators',
                  'Cross-functional dependency mapping'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-purple-500 flex-shrink-0" />
                    <span className="text-sm text-slate-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-teal-600 to-teal-700 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-teal-400/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-3xl mx-auto px-6 text-center relative">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to align your strategy?
          </h2>
          <p className="text-teal-100 text-lg mb-10 max-w-xl mx-auto">
            Start deploying strategy with discipline. Load demo data to explore the full platform,
            or create your own Hoshin Kanri plan from scratch.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={handleGetStarted}
              size="lg"
              className="bg-white text-teal-700 hover:bg-teal-50 rounded-xl px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              {session ? 'Go to Dashboard' : 'Start Planning Now'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleGetStarted}
              className="rounded-xl px-8 py-6 text-lg border-teal-400 text-black hover:bg-teal-600 transition-all"
            >
              Try Demo Data
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <HoshinLogo className="w-7 h-7" />
              <span className="text-sm font-semibold text-slate-700">Policy Tracking</span>
            </div>
            <p className="text-sm text-slate-500">
              Built with Hoshin Kanri methodology for strategic policy deployment
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
