// components/CatchballBoard.tsx
'use client';

import React, { useState } from 'react';
import { useHoshinStore } from '../store/hoshinStore';
import { Card, CardContent, } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select } from './ui/select';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Plus, MessageSquare, User, Calendar, Send, CheckCircle2, XCircle, Clock, AlertCircle, ArrowRight } from 'lucide-react';
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
      type: 'question' as 'question' | 'suggestion' | 'concern' | 'approval',
      title: '',
      description: '',
      from: '',
      to: '',
      relatedItemId: '',
      relatedItemType: 'strategic' as 'strategic' | 'annual' | 'process' | 'metric'
    });
  };

  const handleAddResponse = () => {
    if (selectedItem && responseText.trim()) {
      addCatchballResponse(selectedItem.id, {
        message: responseText,
        author: 'Current User', // In a real app, this would be from auth
        createdAt: new Date().toISOString()
      });
      setResponseText('');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'addressed': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
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
      case 'question': return '❓';
      case 'suggestion': return '💡';
      case 'concern': return '⚠️';
      case 'approval': return '✅';
      default: return '📝';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'question': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'suggestion': return 'bg-green-100 text-green-800 border-green-200';
      case 'concern': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'approval': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const statusCounts = {
    pending: catchball.filter(item => item.status === 'pending').length,
    addressed: catchball.filter(item => item.status === 'addressed').length,
    rejected: catchball.filter(item => item.status === 'rejected').length,
    total: catchball.length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
      <div className="p-8 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-700 to-teal-600 bg-clip-text text-transparent">
              Catchball Communication
            </h1>
            <p className="text-slate-600 text-lg">Collaborative policy deployment discussions</p>
          </div>
          <Button 
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-3 rounded-xl"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Catchball Item
          </Button>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { status: 'pending', label: 'Pending', count: statusCounts.pending, icon: Clock, color: 'from-amber-500 to-amber-600' },
            { status: 'addressed', label: 'Addressed', count: statusCounts.addressed, icon: CheckCircle2, color: 'from-emerald-500 to-emerald-600' },
            { status: 'rejected', label: 'Rejected', count: statusCounts.rejected, icon: XCircle, color: 'from-red-500 to-red-600' },
            { status: 'all', label: 'Total', count: statusCounts.total, icon: MessageSquare, color: 'from-teal-500 to-teal-600' }
          ].map(({ status, label, count, icon: Icon, color }) => (
            <Card key={status} className="border-5 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-600">{label}</p>
                    <p className="text-3xl font-bold text-slate-800">{count}</p>
                  </div>
                  <div className={`p-3 bg-gradient-to-br ${color} rounded-xl shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Catchball Items */}
        <div className="space-y-6">
          {catchball.length === 0 ? (
            <Card className="border-5 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="w-10 h-10 text-teal-600" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-800 mb-3">No catchball items yet</h3>
                <p className="text-slate-500 mb-8 max-w-md mx-auto">
                  Start collaborative discussions to align your organization and improve strategic deployment
                </p>
                <Button 
                  onClick={() => setShowAddForm(true)}
                  className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-8 py-3 rounded-xl"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create First Catchball Item
                </Button>
              </CardContent>
            </Card>
          ) : (
            catchball.map((item) => {
              const StatusIcon = getStatusIcon(item.status);
              return (
                <Card key={item.id} className="border-5 shadow-lg bg-white/90 backdrop-blur-sm cursor-pointer hover:shadow-xl hover:bg-white transition-all duration-300 group"
                      onClick={() => setSelectedItem(item)}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{getTypeIcon(item.type)}</span>
                            <Badge className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                              {item.type}
                            </Badge>
                          </div>
                          <Badge className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {item.status}
                          </Badge>
                        </div>
                        
                        <h3 className="font-semibold text-xl text-slate-800 mb-3 group-hover:text-teal-700 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-slate-600 mb-4 line-clamp-2">{item.description}</p>
                        
                        <div className="flex items-center flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-2 text-slate-500">
                            <User className="w-4 h-4" />
                            <span className="font-medium">{item.from}</span>
                            <ArrowRight className="w-3 h-3" />
                            <span className="font-medium">{item.to}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-500">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                          </div>
                          <Badge variant="outline" className="text-xs px-2 py-1 rounded-full">
                            {item.relatedItemType}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-6">
                        <div className="flex items-center gap-2 text-slate-500 bg-slate-50 px-3 py-2 rounded-full">
                          <MessageSquare className="w-4 h-4" />
                          <span className="text-sm font-medium">{item.responses.length}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        {/* Add Catchball Item Dialog */}
        <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-slate-800 flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-teal-600" />
                Add Catchball Item
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="type" className="block text-sm font-semibold text-slate-700 mb-2">Type</label>
                  <Select
                    id="type"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as 'question' | 'suggestion' | 'concern' | 'approval' })}
                    className="h-12 rounded-xl border-slate-200 focus:border-teal-500"
                  >
                    <option value="question">❓ Question</option>
                    <option value="suggestion">💡 Suggestion</option>
                    <option value="concern">⚠️ Concern</option>
                    <option value="approval">✅ Approval Request</option>
                  </Select>
                </div>
                <div>
                  <label htmlFor="relatedItem" className="block text-sm font-semibold text-slate-700 mb-2">Related Item</label>
                  <Select
                    id="relatedItem"
                    value={formData.relatedItemId}
                    onChange={(e) => setFormData({ ...formData, relatedItemId: e.target.value })}
                    className="h-12 rounded-xl border-slate-200 focus:border-teal-500"
                  >
                    <option value="">Select related item...</option>
                    {getAllItems().map((item) => (
                      <option key={`${item.type}-${item.id}`} value={item.id}>
                        [{item.type}] {item.displayName}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
              
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-slate-700 mb-2">Title</label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="h-12 rounded-xl border-slate-200 focus:border-teal-500"
                  placeholder="Enter a clear, descriptive title"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="min-h-24 rounded-xl border-slate-200 focus:border-teal-500"
                  placeholder="Provide detailed context and background"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="from" className="block text-sm font-semibold text-slate-700 mb-2">From</label>
                  <Input
                    id="from"
                    value={formData.from}
                    onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                    className="h-12 rounded-xl border-slate-200 focus:border-teal-500"
                    placeholder="Your name or role"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="to" className="block text-sm font-semibold text-slate-700 mb-2">To</label>
                  <Input
                    id="to"
                    value={formData.to}
                    onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                    className="h-12 rounded-xl border-slate-200 focus:border-teal-500"
                    placeholder="Recipient name or role"
                    required
                  />
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Add Item
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowAddForm(false)}
                  className="px-8 py-3 rounded-xl font-medium border-slate-200 hover:bg-slate-50"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Item Detail Dialog */}
        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedItem && (
              <>
                <DialogHeader className="pb-6">
                  <DialogTitle className="text-2xl font-semibold text-slate-800 flex items-center gap-3">
                    <span className="text-3xl">{getTypeIcon(selectedItem.type)}</span>
                    {selectedItem.title}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="bg-slate-50 rounded-xl p-6">
                    <p className="text-slate-700 leading-relaxed mb-4">{selectedItem.description}</p>
                    <div className="flex items-center flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-slate-500" />
                        <span className="font-medium">{selectedItem.from}</span>
                        <ArrowRight className="w-3 h-3 text-slate-400" />
                        <span className="font-medium">{selectedItem.to}</span>
                      </div>
                      <Badge className={`px-3 py-1 rounded-full ${getStatusColor(selectedItem.status)}`}>
                        {selectedItem.status}
                      </Badge>
                      <Badge className={`px-3 py-1 rounded-full ${getTypeColor(selectedItem.type)}`}>
                        {selectedItem.type}
                      </Badge>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-lg text-slate-800 mb-4 flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-teal-600" />
                      Responses ({selectedItem.responses.length})
                    </h4>
                    <div className="space-y-4 max-h-80 overflow-y-auto mb-6">
                      {selectedItem.responses.map((response) => (
                        <div key={response.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                          <p className="text-slate-700 mb-3 leading-relaxed">{response.message}</p>
                          <div className="flex justify-between items-center text-sm text-slate-500">
                            <span className="font-medium">{response.author}</span>
                            <span>{new Date(response.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      ))}
                      {selectedItem.responses.length === 0 && (
                        <div className="text-center py-8">
                          <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                          <p className="text-slate-500">No responses yet</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-white border border-slate-200 rounded-xl p-4">
                    <div className="flex gap-3">
                      <Textarea
                        placeholder="Add your response..."
                        value={responseText}
                        onChange={(e) => setResponseText(e.target.value)}
                        className="flex-1 min-h-20 border-slate-200 focus:border-teal-500 rounded-xl"
                      />
                      <Button 
                        onClick={handleAddResponse}
                        className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 pt-4 border-t border-slate-200">
                    <Button 
                      variant="outline"
                      onClick={() => updateCatchballItem(selectedItem.id, { status: 'addressed' })}
                      className="flex-1 bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100 rounded-xl font-medium py-3"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Mark as Addressed
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => updateCatchballItem(selectedItem.id, { status: 'rejected' })}
                      className="flex-1 bg-red-50 border-red-200 text-red-700 hover:bg-red-100 rounded-xl font-medium py-3"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Mark as Rejected
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