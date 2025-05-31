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

  if (!mounted || !open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={() => onOpenChange(false)} 
      />
      <div className="relative z-[10000] w-full flex items-center justify-center">
        {children}
      </div>
    </div>,
    document.body
  );
};

interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
}

const DialogContent = ({ children, className = "" }: DialogContentProps) => (
  <div className={`bg-white rounded-2xl shadow-2xl border border-slate-200 max-h-[95vh] overflow-y-auto ${className}`}>
    {children}
  </div>
);

interface DialogHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const DialogHeader = ({ children, className = "" }: DialogHeaderProps) => (
  <div className={`p-6 border-b border-slate-200 ${className}`}>{children}</div>
);

interface DialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

const DialogTitle = ({ children, className = "" }: DialogTitleProps) => (
  <h2 className={`text-xl font-semibold text-slate-800 ${className}`}>{children}</h2>
);

export { Dialog, DialogContent, DialogHeader, DialogTitle };