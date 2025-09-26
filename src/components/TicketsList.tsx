import { useState } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockTickets, getStatusColor, getPriorityColor } from '@/data/mockTickets';
import { Ticket, TicketFilters } from '@/types/ticket';

interface TicketsListProps {
  onTicketSelect: (ticket: Ticket) => void;
  onCreateTicket: () => void;
}

export function TicketsList({ onTicketSelect, onCreateTicket }: TicketsListProps) {
  const [filters, setFilters] = useState<TicketFilters>({});
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTickets = mockTickets.filter((ticket) => {
    const matchesSearch = !searchQuery || 
      ticket.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.key.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Tickets</h2>
          <p className="text-muted-foreground">Manage and track your project tickets</p>
        </div>
        <Button onClick={onCreateTicket} className="bg-primary hover:bg-primary-hover">
          <Plus className="w-4 h-4 mr-2" />
          Create Ticket
        </Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search tickets by key or summary..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="shrink-0">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tickets List */}
      <div className="space-y-3">
        {filteredTickets.map((ticket) => (
          <Card 
            key={ticket.id} 
            className="cursor-pointer hover:shadow-md transition-smooth border hover:border-primary/20"
            onClick={() => onTicketSelect(ticket)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-mono text-primary font-medium">
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
                  
                  <h3 className="font-medium text-foreground mb-1 truncate">
                    {ticket.summary}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {ticket.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 ml-4">
                  <div className="text-right">
                    <div className="flex items-center gap-2">
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
                    <div className="text-xs text-muted-foreground mt-1">
                      Updated {formatDate(ticket.updatedDate)}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTickets.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-muted-foreground">
              <div className="w-12 h-12 mx-auto mb-4 opacity-50 bg-muted rounded-lg flex items-center justify-center">
                <span className="text-lg">🎫</span>
              </div>
              <h3 className="font-medium mb-2">No tickets found</h3>
              <p className="text-sm">Try adjusting your search or create a new ticket.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}