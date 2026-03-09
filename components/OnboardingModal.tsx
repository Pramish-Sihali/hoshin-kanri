// components/OnboardingModal.tsx
'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { Button } from './ui/button';
import {
  Target,
  BarChart3,
  MessageSquare,
  LineChart,
  Route,
  Users,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Building2,
  Briefcase
} from 'lucide-react';

interface OnboardingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const slides = [
  {
    title: 'Welcome to Your Strategic Plan',
    subtitle: 'Demo Data Loaded Successfully',
    icon: Building2,
    iconBg: 'from-teal-500 to-teal-600',
    content: (
      <div className="space-y-4">
        <p className="text-slate-600 leading-relaxed">
          You&apos;re viewing a <strong>sample strategic plan</strong> for a fictional telecommunications company
          going through a turnaround transformation. The data spans multiple executive levels:
        </p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { role: 'CEO', focus: 'Strategic Vision & Capital Pathways' },
            { role: 'CFO', focus: 'Financial Core & Credibility Reset' },
            { role: 'CTO', focus: 'Technology & Platform Architecture' },
            { role: 'CMO', focus: 'Enterprise & Customer Strategy' },
            { role: 'COO', focus: 'Operations & Ecosystem Control' },
            { role: 'Cross', focus: 'Leadership Charter & Governance' }
          ].map((item) => (
            <div key={item.role} className="flex items-start gap-2 p-2.5 bg-slate-50 rounded-lg">
              <Briefcase className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-xs font-bold text-slate-800">{item.role}</div>
                <div className="text-xs text-slate-500">{item.focus}</div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 italic">
          All company names, financial figures, and metrics are fictional and for demonstration purposes only.
        </p>
      </div>
    )
  },
  {
    title: 'Navigating the Application',
    subtitle: 'Key pages and what they do',
    icon: Target,
    iconBg: 'from-blue-500 to-blue-600',
    content: (
      <div className="space-y-3">
        {[
          { icon: Target, name: 'Dashboard', desc: 'Overview of all objectives, statuses, and key metrics at a glance.' },
          { icon: Target, name: 'X-Matrix', desc: 'The core Hoshin Kanri view — links WHAT (strategy), HOW (processes), HOW FAR (objectives), and HOW MUCH (metrics).' },
          { icon: MessageSquare, name: 'Catchball', desc: 'Collaborative board for questions, approvals, concerns, and suggestions between leadership levels.' },
          { icon: Route, name: 'Roadmap', desc: 'Gantt-style timeline showing initiative phases across 60 months.' },
          { icon: BarChart3, name: 'Objectives', desc: 'CRUD management for strategic and annual objectives with SIPOC integration.' },
          { icon: LineChart, name: 'Kano Model', desc: 'Feature analysis using Kano classification and competitive benchmarking.' },
          { icon: Users, name: 'Processes', desc: 'Manage implementation processes linked to annual objectives.' }
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.name} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors">
              <div className="w-8 h-8 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-slate-600" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-800">{item.name}</div>
                <div className="text-xs text-slate-500">{item.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    )
  },
  {
    title: 'Understanding the Data Flow',
    subtitle: 'How everything connects',
    icon: Route,
    iconBg: 'from-purple-500 to-purple-600',
    content: (
      <div className="space-y-5">
        <div className="flex flex-col items-center gap-2">
          {[
            { label: 'Strategic Objectives', sub: '5-year breakthrough goals (WHAT)', color: 'bg-orange-100 text-orange-700 border-orange-200' },
            { label: 'Annual Objectives', sub: 'Yearly targets linked to strategy (HOW FAR)', color: 'bg-teal-100 text-teal-700 border-teal-200' },
            { label: 'Processes', sub: 'Implementation linked to annual goals (HOW)', color: 'bg-blue-100 text-blue-700 border-blue-200' },
            { label: 'Metrics / KPIs', sub: 'Measurement linked to processes (HOW MUCH)', color: 'bg-purple-100 text-purple-700 border-purple-200' }
          ].map((item, i) => (
            <React.Fragment key={item.label}>
              <div className={`w-full px-4 py-3 rounded-xl border ${item.color} text-center`}>
                <div className="text-sm font-bold">{item.label}</div>
                <div className="text-xs opacity-80">{item.sub}</div>
              </div>
              {i < 3 && (
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-3 bg-slate-300" />
                  <div className="w-2 h-2 border-b-2 border-r-2 border-slate-300 transform rotate-45 -mt-1" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="p-3 bg-teal-50 rounded-xl border border-teal-100">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-teal-800">
              <strong>Catchball</strong> items flow between levels for alignment. The X-Matrix visualizes all these connections in a single view.
            </div>
          </div>
        </div>
      </div>
    )
  }
];

const OnboardingModal: React.FC<OnboardingModalProps> = ({ open, onOpenChange }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slide = slides[currentSlide];
  const Icon = slide.icon;

  const handleClose = () => {
    setCurrentSlide(0);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden rounded-2xl border-0 shadow-2xl">
        {/* Header */}
        <div className={`bg-gradient-to-r ${slide.iconBg} px-6 pt-8 pb-6 text-white`}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex gap-1.5">
              {slides.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${i === currentSlide ? 'w-6 bg-white' : 'w-1.5 bg-white/40'}`}
                />
              ))}
            </div>
          </div>
          <h2 className="text-xl font-bold">{slide.title}</h2>
          <p className="text-sm text-white/80 mt-1">{slide.subtitle}</p>
        </div>

        {/* Content */}
        <div className="px-6 py-5 max-h-[50vh] overflow-y-auto">
          {slide.content}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => currentSlide > 0 ? setCurrentSlide(currentSlide - 1) : handleClose()}
            className="text-slate-500 rounded-xl"
          >
            {currentSlide > 0 ? (
              <>
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </>
            ) : (
              'Skip'
            )}
          </Button>

          {currentSlide < slides.length - 1 ? (
            <Button
              onClick={() => setCurrentSlide(currentSlide + 1)}
              className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-xl px-6"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button
              onClick={handleClose}
              className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-xl px-6"
            >
              Start Exploring
              <CheckCircle2 className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;
