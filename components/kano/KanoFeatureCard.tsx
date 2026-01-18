import React from 'react';
import { KanoFeature } from '@/types/hoshin';
import { KanoCategoryBadge } from './KanoCategoryBadge';
import { Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface KanoFeatureCardProps {
    feature: KanoFeature;
    onEdit: (feature: KanoFeature) => void;
    onDelete: (featureId: string) => void;
}

export const KanoFeatureCard: React.FC<KanoFeatureCardProps> = React.memo(({
    feature,
    onEdit,
    onDelete
}) => {
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h3 className="font-semibold text-slate-800">{feature.name}</h3>
                    <p className="text-sm text-slate-500 line-clamp-2 mt-1">{feature.description}</p>
                </div>
                <div className="flex gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-teal-600"
                        onClick={() => onEdit(feature)}
                    >
                        <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-red-600"
                        onClick={() => onDelete(feature.id)}
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 items-center mt-3">
                <KanoCategoryBadge category={feature.category} size="sm" />

                <div className="text-xs text-slate-500 flex gap-3 ml-auto">
                    <span title="Importance (1-5)">
                        Key: <span className="font-medium text-slate-700">{feature.importance}/5</span>
                    </span>
                    <span title="Satisfaction Impact">
                        Impact: <span className="font-medium text-slate-700">{feature.satisfactionImpact.toFixed(1)}</span>
                    </span>
                </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between text-xs text-slate-400">
                <div>
                    Func: {feature.functionalScore > 0 ? '+' : ''}{feature.functionalScore}
                </div>
                <div>
                    Dysfunc: {feature.dysfunctionalScore > 0 ? '+' : ''}{feature.dysfunctionalScore}
                </div>
            </div>
        </div>
    );
});

KanoFeatureCard.displayName = 'KanoFeatureCard';
