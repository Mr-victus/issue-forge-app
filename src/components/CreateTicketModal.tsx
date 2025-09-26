import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CreateTicketForm, IssueType, TicketPriority } from '@/types/ticket';
import { mockUsers } from '@/data/mockTickets';

interface CreateTicketModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (ticket: CreateTicketForm) => void;
}

export function CreateTicketModal({ open, onClose, onSubmit }: CreateTicketModalProps) {
  const [formData, setFormData] = useState<CreateTicketForm>({
    project: 'PROJECT',
    issueType: 'story',
    summary: '',
    description: '',
    priority: 'medium',
    assignee: undefined
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!formData.summary.trim()) {
      newErrors.summary = 'Summary is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
      // Reset form
      setFormData({
        project: 'PROJECT',
        issueType: 'story',
        summary: '',
        description: '',
        priority: 'medium',
        assignee: undefined
      });
      onClose();
    }
  };

  const handleChange = (field: keyof CreateTicketForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Create New Ticket
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="project">Project</Label>
              <Select
                value={formData.project}
                onValueChange={(value) => handleChange('project', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PROJECT">PROJECT</SelectItem>
                  <SelectItem value="DEMO">DEMO</SelectItem>
                  <SelectItem value="TEST">TEST</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="issueType">Issue Type</Label>
              <Select
                value={formData.issueType}
                onValueChange={(value: IssueType) => handleChange('issueType', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="story">Story</SelectItem>
                  <SelectItem value="task">Task</SelectItem>
                  <SelectItem value="bug">Bug</SelectItem>
                  <SelectItem value="epic">Epic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary">Summary *</Label>
            <Input
              id="summary"
              placeholder="Brief description of the issue"
              value={formData.summary}
              onChange={(e) => handleChange('summary', e.target.value)}
              className={errors.summary ? 'border-destructive' : ''}
            />
            {errors.summary && (
              <p className="text-sm text-destructive">{errors.summary}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Detailed description of the issue..."
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className={`min-h-[120px] ${errors.description ? 'border-destructive' : ''}`}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value: TicketPriority) => handleChange('priority', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="assignee">Assignee</Label>
              <Select
                value={formData.assignee || ''}
                onValueChange={(value) => handleChange('assignee', value || undefined)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Unassigned" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Unassigned</SelectItem>
                  {mockUsers.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary-hover"
            >
              Create Ticket
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}