import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { TicketsList } from '@/components/TicketsList';
import { TicketDetails } from '@/components/TicketDetails';
import { CreateTicketModal } from '@/components/CreateTicketModal';
import { mockTickets, mockUsers } from '@/data/mockTickets';
import { Ticket, CreateTicketForm } from '@/types/ticket';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { toast } = useToast();

  const handleTicketSelect = (ticket: Ticket) => {
    setSelectedTicket(ticket);
  };

  const handleTicketUpdate = (ticketId: string, updates: Partial<Ticket>) => {
    setTickets(prevTickets =>
      prevTickets.map(ticket =>
        ticket.id === ticketId
          ? { ...ticket, ...updates, updatedDate: new Date().toISOString() }
          : ticket
      )
    );

    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket(prev => prev ? { ...prev, ...updates, updatedDate: new Date().toISOString() } : null);
    }

    toast({
      title: 'Ticket Updated',
      description: 'The ticket has been successfully updated.',
    });
  };

  const handleCreateTicket = (ticketData: CreateTicketForm) => {
    const assignee = ticketData.assignee ? mockUsers.find(u => u.id === ticketData.assignee) : null;
    const reporter = mockUsers[0]; // Current user

    const newTicket: Ticket = {
      id: Date.now().toString(),
      key: `${ticketData.project}-${Math.floor(Math.random() * 1000) + 100}`,
      summary: ticketData.summary,
      description: ticketData.description,
      status: 'todo',
      priority: ticketData.priority,
      assignee,
      reporter,
      project: ticketData.project,
      issueType: ticketData.issueType,
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
      comments: []
    };

    setTickets(prevTickets => [newTicket, ...prevTickets]);

    toast({
      title: 'Ticket Created',
      description: `Ticket ${newTicket.key} has been created successfully.`,
    });
  };

  const handleBackToList = () => {
    setSelectedTicket(null);
  };

  return (
    <DashboardLayout>
      {selectedTicket ? (
        <TicketDetails
          ticket={selectedTicket}
          onBack={handleBackToList}
          onUpdate={handleTicketUpdate}
        />
      ) : (
        <TicketsList
          onTicketSelect={handleTicketSelect}
          onCreateTicket={() => setIsCreateModalOpen(true)}
        />
      )}
      
      <CreateTicketModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateTicket}
      />
    </DashboardLayout>
  );
};

export default Index;
