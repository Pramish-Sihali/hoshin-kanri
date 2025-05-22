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
import { Plus, MessageSquare, User, Calendar } from 'lucide-react';
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
    type: 'question' as const,
    title: '',
    description: '',
    from: '',
    to: '',
    relatedItemId: '',
    relatedItemType: 'strategic' as const
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
        author: 'Current User', // In a real app, this would be from auth
        createdAt: new Date().toISOString()
      });
      setResponseText('');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'addressed': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-gray-500';
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

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Catchball Communication</h1>
          <p className="text-gray-600 mt-1">Collaborative policy deployment discussions</p>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Catchball Item
        </Button>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { status: 'pending', label: 'Pending', count: catchball.filter(item => item.status === 'pending').length },
          { status: 'addressed', label: 'Addressed', count: catchball.filter(item => item.status === 'addressed').length },
          { status: 'rejected', label: 'Rejected', count: catchball.filter(item => item.status === 'rejected').length },
          { status: 'all', label: 'Total', count: catchball.length }
        ].map(({ status, label, count }) => (
          <Card key={status}>
            <CardContent className="p-4">
              <div className="flex items-center">
                <MessageSquare className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{label}</p>
                  <p className="text-2xl font-bold text-gray-900">{count}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Catchball Items */}
      <div className="space-y-4">
        {catchball.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No catchball items yet</h3>
              <p className="text-gray-500 mb-4">Start collaborative discussions to align your organization</p>
              <Button onClick={() => setShowAddForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create First Catchball Item
              </Button>
            </CardContent>
          </Card>
        ) : (
          catchball.map((item) => (
            <Card key={item.id} className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedItem(item)}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="text-lg mr-2">{getTypeIcon(item.type)}</span>
                      <h3 className="font-medium text-lg">{item.title}</h3>
                      <Badge className={`ml-2 text-white ${getStatusColor(item.status)}`}>
                        {item.status}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-3">{item.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {item.from} → {item.to}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {item.relatedItemType}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="w-5 h-5 text-gray-400" />
                    <span className="ml-1 text-sm text-gray-500">{item.responses.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Add Catchball Item Dialog */}
      <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Catchball Item</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="type" className="block text-sm font-medium mb-1">Type</label>
              <Select
                id="type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
              >
                <option value="question">Question</option>
                <option value="suggestion">Suggestion</option>
                <option value="concern">Concern</option>
                <option value="approval">Approval Request</option>
              </Select>
            </div>
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="from" className="block text-sm font-medium mb-1">From</label>
                <Input
                  id="from"
                  value={formData.from}
                  onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                  required
                />
              </div>
              <div>
                <label htmlFor="to" className="block text-sm font-medium mb-1">To</label>
                <Input
                  id="to"
                  value={formData.to}
                  onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="relatedItem" className="block text-sm font-medium mb-1">Related Item</label>
              <Select
                id="relatedItem"
                value={formData.relatedItemId}
                onChange={(e) => setFormData({ ...formData, relatedItemId: e.target.value })}
              >
                <option value="">Select related item...</option>
                {getAllItems().map((item) => (
                  <option key={`${item.type}-${item.id}`} value={item.id}>
                    [{item.type}] {item.displayName}
                  </option>
                ))}
              </Select>
            </div>
            <div className="flex gap-2">
              <Button type="submit">Add Item</Button>
              <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Item Detail Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-2xl">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle >
                  <span className="mr-2">{getTypeIcon(selectedItem.type)}</span>
                  {selectedItem.title}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600">{selectedItem.description}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span>{selectedItem.from} → {selectedItem.to}</span>
                    <Badge className={`text-white ${getStatusColor(selectedItem.status)}`}>
                      {selectedItem.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Responses ({selectedItem.responses.length})</h4>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {selectedItem.responses.map((response) => (
                      <div key={response.id} className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm">{response.message}</p>
                        <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                          <span>{response.author}</span>
                          <span>{new Date(response.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                    {selectedItem.responses.length === 0 && (
                      <p className="text-gray-500 text-sm">No responses yet</p>
                    )}
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Add your response..."
                      value={responseText}
                      onChange={(e) => setResponseText(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={handleAddResponse}>Send</Button>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    onClick={() => updateCatchballItem(selectedItem.id, { status: 'addressed' })}
                  >
                    Mark as Addressed
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => updateCatchballItem(selectedItem.id, { status: 'rejected' })}
                  >
                    Mark as Rejected
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CatchballBoard;