// components/ui/dialog.tsx
import * as React from "react";
import { createPortal } from 'react-dom';

interface DialogProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const Dialog = ({ children, open, onOpenChange }: DialogProps) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  // Handle ESC key to close dialog
  React.useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        onOpenChange(false);
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscapeKey);
      return () => document.removeEventListener('keydown', handleEscapeKey);
    }
  }, [open, onOpenChange]);

  if (!mounted || !open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300" 
        onClick={() => onOpenChange(false)} 
      />
      <div className="relative z-[10000] w-full max-w-7xl flex items-center justify-center">
        {children}
      </div>
    </div>,
    document.body
  );
};

interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'full';
}

const DialogContent = ({ children, className = "", size = 'xl' }: DialogContentProps) => {
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg', 
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    '2xl': 'max-w-6xl',
    '3xl': 'max-w-7xl',
    '4xl': 'max-w-[90vw]',
    full: 'max-w-[95vw]'
  };

  return (
    <div className={`
      bg-white rounded-2xl shadow-2xl border border-slate-200 
      w-full ${sizeClasses[size]} 
      max-h-[90vh] overflow-y-auto
      transform transition-all duration-300 ease-out
      ${className}
    `}>
      {children}
    </div>
  );
};

interface DialogHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const DialogHeader = ({ children, className = "" }: DialogHeaderProps) => (
  <div className={`px-6 py-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white ${className}`}>
    {children}
  </div>
);

interface DialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

const DialogTitle = ({ children, className = "" }: DialogTitleProps) => (
  <h2 className={`text-2xl font-bold text-slate-800 leading-tight ${className}`}>
    {children}
  </h2>
);

interface DialogBodyProps {
  children: React.ReactNode;
  className?: string;
}

const DialogBody = ({ children, className = "" }: DialogBodyProps) => (
  <div className={`px-6 py-6 ${className}`}>
    {children}
  </div>
);

interface DialogFooterProps {
  children: React.ReactNode;
  className?: string;
}

const DialogFooter = ({ children, className = "" }: DialogFooterProps) => (
  <div className={`px-6 py-4 border-t border-slate-200 bg-slate-50/50 rounded-b-2xl ${className}`}>
    {children}
  </div>
);

export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter };