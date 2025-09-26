import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-border bg-card flex items-center px-6 gap-4">
            <SidebarTrigger className="hover:bg-sidebar-accent rounded-md p-2 transition-smooth" />
            
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-foreground">Ticket Management</h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-xs font-medium text-primary-foreground">JD</span>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}