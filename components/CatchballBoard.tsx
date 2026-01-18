// components/CatchballBoard.tsx
'use client';

import React, { useState } from 'react';
import { useHoshinStore } from '../store/hoshinStore';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select } from './ui/select';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Plus, MessageSquare, User, Calendar, Send, CheckCircle2, XCircle, Clock, AlertCircle, ArrowRight, Inbox } from 'lucide-react';
import { CatchballItem } from '../types/hoshin';

const CatchballBoard: React.FC = () => {
  const {
    catchball,
    strategicObjectives,
    annualObjectives,
    processes,
    metrics,
    addCatchballItem,
    updateCatchballItem,
    addCatchballResponse
  } = useHoshinStore();

  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CatchballItem | null>(null);
  const [responseText, setResponseText] = useState('');

  const [formData, setFormData] = useState({
    type: 'question' as 'question' | 'suggestion' | 'concern' | 'approval',
    title: '',
    description: '',
    from: '',
    to: '',
    relatedItemId: '',
    relatedItemType: 'strategic' as 'strategic' | 'annual' | 'process' | 'metric'
  });

  const getAllItems = () => {
    return [
      ...strategicObjectives.map(item => ({ ...item, type: 'strategic', displayName: item.title })),
      ...annualObjectives.map(item => ({ ...item, type: 'annual', displayName: item.title })),
      ...processes.map(item => ({ ...item, type: 'process', displayName: item.title })),
      ...metrics.map(item => ({ ...item, type: 'metric', displayName: item.name }))
    ];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCatchballItem({
      ...formData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      responses: []
    });
    setShowAddForm(false);
    setFormData({
      type: 'question',
      title: '',
      description: '',
      from: '',
      to: '',
      relatedItemId: '',
      relatedItemType: 'strategic'
    });
  };

  const handleAddResponse = () => {
    if (selectedItem && responseText.trim()) {
      addCatchballResponse(selectedItem.id, {
        message: responseText,
        author: 'Current User',
        createdAt: new Date().toISOString()
      });
      setResponseText('');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'addressed': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'rejected': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return Clock;
      case 'addressed': return CheckCircle2;
      case 'rejected': return XCircle;
      default: return AlertCircle;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'question': return '?';
      case 'suggestion': return '→';
      case 'concern': return '!';
      case 'approval': return '✓';
      default: return '•';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'question': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'suggestion': return 'text-green-600 bg-green-50 border-green-200';
      case 'concern': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'approval': return 'text-purple-600 bg-purple-50 border-purple-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const statusCounts = {
    pending: catchball.filter(item => item.status === 'pending').length,
    addressed: catchball.filter(item => item.status === 'addressed').length,
    rejected: catchball.filter(item => item.status === 'rejected').length,
    total: catchball.length
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-8 py-8 space-y-8">
        {/* Minimal Header */}
        <div className="flex items-start justify-between border-b pb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Catchball</h1>
            <p className="text-sm text-gray-500 mt-1.5">Strategic alignment through collaborative dialogue</p>
          </div>
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-black hover:bg-gray-800 text-white text-sm px-4 py-2 h-9"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            New Item
          </Button>
        </div>

        {/* Minimal Status Overview */}
        <div className="grid grid-cols-4 gap-5">
          {[
            { status: 'pending', label: 'Pending', count: statusCounts.pending, icon: Clock },
            { status: 'addressed', label: 'Addressed', count: statusCounts.addressed, icon: CheckCircle2 },
            { status: 'rejected', label: 'Rejected', count: statusCounts.rejected, icon: XCircle },
            { status: 'all', label: 'Total', count: statusCounts.total, icon: MessageSquare }
          ].map(({ status, label, count, icon: Icon }) => (
            <div key={status} className="border rounded-lg p-5 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">{label}</p>
                  <p className="text-3xl font-bold text-gray-900">{count}</p>
                </div>
                <Icon className="w-6 h-6 text-gray-400" />
              </div>
            </div>
          ))}
        </div>

        {/* Catchball Items List */}
        <div className="space-y-4">
          {catchball.length === 0 ? (
            <div className="border rounded-lg p-12 text-center">
              <Inbox className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-1">No catchball items</h3>
              <p className="text-sm text-gray-500 mb-6">
                Start collaborative discussions to align strategic deployment
              </p>
              <Button
                onClick={() => setShowAddForm(true)}
                className="bg-black hover:bg-gray-800 text-white text-sm px-5 py-2"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                Create First Item
              </Button>
            </div>
          ) : (
            catchball.map((item) => {
              const StatusIcon = getStatusIcon(item.status);
              return (
                <div
                  key={item.id}
                  className="border rounded-lg p-5 cursor-pointer hover:bg-gray-50 transition-colors group"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1 min-w-0">
                      {/* Tags */}
                      <div className="flex items-center gap-2.5 mb-3">
                        <Badge className={`px-2.5 py-1 text-xs font-medium border ${getTypeColor(item.type)} rounded`}>
                          {getTypeIcon(item.type)} {item.type}
                        </Badge>
                        <Badge className={`px-2.5 py-1 text-xs font-medium border ${getStatusColor(item.status)} rounded`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {item.status}
                        </Badge>
                      </div>

                      {/* Title */}
                      <h3 className="font-semibold text-base text-gray-900 mb-2 group-hover:text-black transition-colors">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-gray-600 mb-4 line-clamp-1">{item.description}</p>

                      {/* Metadata */}
                      <div className="flex items-center gap-5 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          <span>{item.from}</span>
                          <ArrowRight className="w-3 h-3" />
                          <span>{item.to}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Response count */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-100 px-3 py-2 rounded-lg">
                      <MessageSquare className="w-4 h-4" />
                      <span className="font-medium">{item.responses.length}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Add Catchball Item Dialog */}
        <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
          <DialogContent className="max-w-2xl p-6">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-2xl font-semibold">New Catchball Item</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Type</label>
                  <Select
                    value={formData.type}
                    onChange={(value) => setFormData({ ...formData, type: value as any })}
                    options={[
                      { value: 'question', label: 'Question' },
                      { value: 'suggestion', label: 'Suggestion' },
                      { value: 'concern', label: 'Concern' },
                      { value: 'approval', label: 'Approval' }
                    ]}
                    className="h-9 text-sm"
                    placeholder="Select type"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Related Item</label>
                  <Select
                    value={formData.relatedItemId}
                    onChange={(value) => setFormData({ ...formData, relatedItemId: value })}
                    options={getAllItems().map((item) => ({
                      value: item.id,
                      label: `${item.displayName}`,
                    }))}
                    className="h-9 text-sm"
                    placeholder="Select item"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="h-9 text-sm"
                  placeholder="Brief, descriptive title"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="min-h-20 text-sm"
                  placeholder="Detailed context and background"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">From</label>
                  <Input
                    value={formData.from}
                    onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                    className="h-9 text-sm"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">To</label>
                  <Input
                    value={formData.to}
                    onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                    className="h-9 text-sm"
                    placeholder="Recipient name"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button type="submit" className="bg-black hover:bg-gray-800 text-white text-sm px-4 py-2 h-9">
                  Create Item
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddForm(false)}
                  className="text-sm px-4 py-2 h-9"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Item Detail Dialog */}
        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto p-6">
            {selectedItem && (
              <>
                <DialogHeader className="mb-5">
                  <DialogTitle className="text-2xl font-semibold flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-sm">
                      {getTypeIcon(selectedItem.type)}
                    </span>
                    {selectedItem.title}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  {/* Description */}
                  <div className="bg-gray-50 rounded-lg p-5">
                    <p className="text-sm text-gray-700 leading-relaxed mb-3">{selectedItem.description}</p>
                    <div className="flex items-center gap-3 text-xs">
                      <div className="flex items-center gap-1 text-gray-600">
                        <User className="w-3 h-3" />
                        <span>{selectedItem.from}</span>
                        <ArrowRight className="w-3 h-3" />
                        <span>{selectedItem.to}</span>
                      </div>
                      <Badge className={`px-2 py-0.5 text-[10px] border ${getStatusColor(selectedItem.status)} rounded`}>
                        {selectedItem.status}
                      </Badge>
                      <Badge className={`px-2 py-0.5 text-[10px] border ${getTypeColor(selectedItem.type)} rounded`}>
                        {selectedItem.type}
                      </Badge>
                    </div>
                  </div>

                  {/* Responses */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Responses ({selectedItem.responses.length})
                    </h4>
                    <div className="space-y-2 max-h-60 overflow-y-auto mb-4">
                      {selectedItem.responses.map((response) => (
                        <div key={response.id} className="border rounded-lg p-3">
                          <p className="text-sm text-gray-700 mb-2">{response.message}</p>
                          <div className="flex justify-between items-center text-xs text-gray-500">
                            <span className="font-medium">{response.author}</span>
                            <span>{new Date(response.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      ))}
                      {selectedItem.responses.length === 0 && (
                        <div className="text-center py-6 text-sm text-gray-400">
                          No responses yet
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Add Response */}
                  <div className="border rounded-lg p-3">
                    <div className="flex gap-2">
                      <Textarea
                        placeholder="Add response..."
                        value={responseText}
                        onChange={(e) => setResponseText(e.target.value)}
                        className="flex-1 min-h-16 text-sm"
                      />
                      <Button
                        onClick={handleAddResponse}
                        className="bg-black hover:bg-gray-800 text-white px-3 h-9 self-end"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2 border-t">
                    <Button
                      variant="outline"
                      onClick={() => updateCatchballItem(selectedItem.id, { status: 'addressed' })}
                      className="flex-1 text-sm h-9 border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-1.5" />
                      Mark Addressed
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => updateCatchballItem(selectedItem.id, { status: 'rejected' })}
                      className="flex-1 text-sm h-9 border-red-200 text-red-700 hover:bg-red-50"
                    >
                      <XCircle className="w-4 h-4 mr-1.5" />
                      Mark Rejected
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CatchballBoard;
