import { createContext, useContext, useMemo, useState } from 'react';
import {
  teamMembers as initialTeam,
  customers as initialCustomers,
  tickets as initialTickets,
  conversations as initialConversations,
  notifications as initialNotifications,
} from '../data/mockData';

const AppStateContext = createContext(null);

export function AppStateProvider({ children }) {
  const [tickets, setTickets] = useState(initialTickets);
  const [conversations, setConversations] = useState(initialConversations);
  const [customers] = useState(initialCustomers);
  const [team, setTeam] = useState(initialTeam);
  const [notifications, setNotifications] = useState(initialNotifications);

  const updateTicket = (id, updates) => {
    setTickets((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t)));
    setConversations((prev) => prev.map((c) => (c.ticketId === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c)));
  };

  const createTicket = (data) => {
    const id = `T-${1043 + tickets.length}`;
    const customer = customers.find((c) => c.id === data.customerId);
    const assignee = team.find((t) => t.id === data.assigneeId);
    const newTicket = {
      id,
      ...data,
      customer: customer ? customer.name : '',
      assignee: assignee ? assignee.name : 'Unassigned',
      assigneeId: data.assigneeId || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: data.tags || [],
    };
    setTickets((prev) => [newTicket, ...prev]);
    return newTicket;
  };

  const addMessage = (conversationId, message) => {
    const msgId = Math.random().toString(36).slice(2);
    const newMessage = {
      id: msgId,
      ...message,
      timestamp: new Date().toISOString(),
    };
    setConversations((prev) => prev.map((c) => {
      if (c.id !== conversationId) return c;
      return {
        ...c,
        messages: [...c.messages, newMessage],
        timestamp: newMessage.timestamp,
        preview: message.content,
        status: message.author === 'note' ? c.status : 'In Progress',
        unread: false,
      };
    }));
  };

  const updateConversation = (id, updates) => {
    setConversations((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates, timestamp: new Date().toISOString() } : c)));
    if (updates.status) {
      const conv = conversations.find((c) => c.id === id);
      if (conv && conv.ticketId) updateTicket(conv.ticketId, { status: updates.status });
    }
  };

  const addTeamMember = (member) => {
    const id = `u${9 + team.length}`;
    const newMember = {
      id,
      ...member,
      status: 'offline',
      ticketsHandled: 0,
      avgResponseTime: 0,
      csat: 0,
      avatarSeed: member.name,
    };
    setTeam((prev) => [...prev, newMember]);
    return newMember;
  };

  const dismissNotification = (id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const value = useMemo(() => ({
    tickets,
    conversations,
    customers,
    team,
    notifications,
    updateTicket,
    createTicket,
    addMessage,
    updateConversation,
    addTeamMember,
    dismissNotification,
    markAllNotificationsRead,
  }), [tickets, conversations, customers, team, notifications]);

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider');
  return ctx;
}
