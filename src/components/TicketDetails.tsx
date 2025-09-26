import { useState } from 'react';
import { ArrowLeft, MessageCircle, Calendar, User, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Ticket, TicketStatus, TicketPriority } from '@/types/ticket';
import { getStatusColor, getPriorityColor } from '@/data/mockTickets';

interface TicketDetailsProps {
  ticket: Ticket;
  onBack: () => void;
  onUpdate: (ticketId: string, updates: Partial<Ticket>) => void;
}

export function TicketDetails({ ticket, onBack, onUpdate }: TicketDetailsProps) {
  const [newComment, setNewComment] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleStatusChange = (newStatus: TicketStatus) => {
    setIsUpdating(true);
    onUpdate(ticket.id, { status: newStatus });
    setTimeout(() => setIsUpdating(false), 500);
  };

  const handlePriorityChange = (newPriority: TicketPriority) => {
    setIsUpdating(true);
    onUpdate(ticket.id, { priority: newPriority });
    setTimeout(() => setIsUpdating(false), 500);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now().toString(),
      author: {
        id: 'current-user',
        name: 'John Doe',
        email: 'john.doe@company.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=johndoe'
      },
      content: newComment.trim(),
      createdDate: new Date().toISOString()
    };

    onUpdate(ticket.id, {
      comments: [...ticket.comments, comment]
    });

    setNewComment('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="hover:bg-muted"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Tickets
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Ticket Header */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-mono text-primary font-semibold">
                      {ticket.key}
                    </span>
                    <Badge 
                      variant="outline" 
                      className={getStatusColor(ticket.status)}
                    >
                      {ticket.status.replace('-', ' ')}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className={getPriorityColor(ticket.priority)}
                    >
                      {ticket.priority}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{ticket.summary}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Description</h4>
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {ticket.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comments Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Comments ({ticket.comments.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {ticket.comments.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No comments yet. Be the first to add one!
                </p>
              ) : (
                <div className="space-y-4">
                  {ticket.comments.map((comment, index) => (
                    <div key={comment.id}>
                      <div className="flex gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={comment.author.avatar} />
                          <AvatarFallback className="text-xs">
                            {getInitials(comment.author.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{comment.author.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(comment.createdDate)}
                            </span>
                          </div>
                          <p className="text-sm text-foreground whitespace-pre-wrap">
                            {comment.content}
                          </p>
                        </div>
                      </div>
                      {index < ticket.comments.length - 1 && (
                        <Separator className="mt-4" />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Add Comment */}
              <div className="pt-4 border-t">
                <div className="space-y-3">
                  <Textarea
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <Button 
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                    className="bg-primary hover:bg-primary-hover"
                  >
                    Add Comment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Ticket Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select
                  value={ticket.status}
                  onValueChange={handleStatusChange}
                  disabled={isUpdating}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="in-review">In Review</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Priority</label>
                <Select
                  value={ticket.priority}
                  onValueChange={handlePriorityChange}
                  disabled={isUpdating}
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
            </CardContent>
          </Card>

          {/* Ticket Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Assignee</p>
                    <div className="flex items-center gap-2 mt-1">
                      {ticket.assignee ? (
                        <>
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={ticket.assignee.avatar} />
                            <AvatarFallback className="text-xs">
                              {getInitials(ticket.assignee.name)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-muted-foreground">
                            {ticket.assignee.name}
                          </span>
                        </>
                      ) : (
                        <span className="text-sm text-muted-foreground">Unassigned</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Reporter</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={ticket.reporter.avatar} />
                        <AvatarFallback className="text-xs">
                          {getInitials(ticket.reporter.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">
                        {ticket.reporter.name}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Created</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(ticket.createdDate)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Updated</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(ticket.updatedDate)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Issue Type</p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {ticket.issueType}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}