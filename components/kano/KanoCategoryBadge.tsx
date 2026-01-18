import React from 'react';
import { KanoCategory } from '@/types/hoshin';

interface KanoCategoryBadgeProps {
    category: KanoCategory;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

const categoryConfig = {
    basic: {
        label: 'Basic / Must-Be',
        className: 'bg-blue-100 text-blue-800 border-blue-200',
        description: 'Expected features. Dissatisfaction if missing.'
    },
    performance: {
        label: 'Performance / Linear',
        className: 'bg-green-100 text-green-800 border-green-200',
        description: 'More is better. Linear satisfaction.'
    },
    excitement: {
        label: 'Excitement / Delighter',
        className: 'bg-purple-100 text-purple-800 border-purple-200',
        description: 'Unexpected delight. No dissatisfaction if missing.'
    },
    indifferent: {
        label: 'Indifferent',
        className: 'bg-slate-100 text-slate-800 border-slate-200',
        description: 'Users do not care about this feature.'
    },
    reverse: {
        label: 'Reverse',
        className: 'bg-red-100 text-red-800 border-red-200',
        description: 'Presence causes dissatisfaction.'
    }
};

export const KanoCategoryBadge: React.FC<KanoCategoryBadgeProps> = ({
    category,
    className = '',
    size = 'md'
}) => {
    const config = categoryConfig[category];

    const sizeClasses = {
        sm: 'text-xs px-2 py-0.5',
        md: 'text-sm px-2.5 py-0.5',
        lg: 'text-base px-3 py-1'
    };

    return (
        <span
            className={`inline-flex items-center rounded-full font-medium border ${config.className} ${sizeClasses[size]} ${className}`}
            title={config.description}
        >
            {config.label}
        </span>
    );
};
