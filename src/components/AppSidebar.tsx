import { Home, FolderOpen, Upload, Settings, BookOpen, Brain, ChevronRight } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useAppStore } from '@/store/useAppStore';
import { useNavigate } from 'react-router';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Button } from './ui/button';
import { useAuthStore } from '@/store/useAuthStore';

const menuItems = [
  { title: 'Dashboard', url: '/', icon: Home },
  { title: 'Subjects', url: '/subjects', icon: FolderOpen },
  { title: 'Upload File', url: '/upload', icon: Upload },
  { title: 'My Summaries', url: '/summaries', icon: BookOpen },
  { title: 'Quiz History', url: '/quizzes', icon: Brain },
  { title: 'Settings', url: '/settings', icon: Settings },
];

export function AppSidebar() {
  const { subjects } = useAppStore();
  const navigate = useNavigate();
  const { data, setData } = useAuthStore()

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border px-6 py-4">
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-sidebar-primary" />
          <div>
            <h2 className="text-lg font-semibold text-sidebar-foreground">Smart Knowledge</h2>
            <p className="text-xs text-sidebar-foreground/70">Summarizer & Quiz</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="flex items-center gap-3 rounded-md px-3 py-2 text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {subjects.length > 0 && (
          <SidebarGroup>
            <Collapsible defaultOpen className="group/collapsible">
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger className="flex w-full items-center justify-between">
                  <span>My Subjects</span>
                  <ChevronRight className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {subjects.slice(0, 5).map((subject) => (
                      <SidebarMenuItem key={subject.id}>
                        <SidebarMenuButton
                          onClick={() => navigate(`/subject/${subject.id}`)}
                          className="flex items-center gap-3 rounded-md px-3 py-2 text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer"
                        >
                          <div
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: subject.color }}
                          />
                          <span className="truncate">{subject.name}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                    {subjects.length > 5 && (
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          onClick={() => navigate('/subjects')}
                          className="text-xs text-sidebar-foreground/60 hover:text-sidebar-foreground cursor-pointer"
                        >
                          View all {subjects.length} subjects →
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border px-6 py-4">
        <Button size="sm" onClick={() => {
          setData(null);
        }}>
          Log out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
