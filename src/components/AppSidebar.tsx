import { 
  LayoutDashboard, 
  Ticket, 
  Plus, 
  Settings, 
  Users, 
  BarChart3 
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';

const mainItems = [
  { title: 'Dashboard', url: '/', icon: LayoutDashboard },
  { title: 'Tickets', url: '/tickets', icon: Ticket },
  { title: 'Create Ticket', url: '/create', icon: Plus },
];

const managementItems = [
  { title: 'Team', url: '/team', icon: Users },
  { title: 'Reports', url: '/reports', icon: BarChart3 },
  { title: 'Settings', url: '/settings', icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const collapsed = state === "collapsed";

  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? 'bg-primary/10 text-primary border-r-2 border-primary' 
      : 'hover:bg-sidebar-accent/50 transition-smooth';

  return (
    <Sidebar 
      className="transition-smooth border-r border-sidebar-border"
      collapsible="icon"
    >
      <SidebarContent className="bg-sidebar">
        {/* Logo/Brand */}
        <div className="p-4 border-b border-sidebar-border">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
                <Ticket className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-sidebar-foreground">TicketFlow</span>
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60 text-xs uppercase tracking-wider">
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="w-full">
                    <NavLink 
                      to={item.url} 
                      className={getNavClass}
                      title={collapsed ? item.title : undefined}
                    >
                      <item.icon className="w-4 h-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60 text-xs uppercase tracking-wider">
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {managementItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="w-full">
                    <NavLink 
                      to={item.url} 
                      className={getNavClass}
                      title={collapsed ? item.title : undefined}
                    >
                      <item.icon className="w-4 h-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}