import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/common/AppSidebar";
import { ProtectedRoute } from "@/components/common/ProtectedRoute";
import Index from "./pages/Index";
import Subjects from "./pages/Subjects";
import Upload from "./pages/Upload";
import Summaries from "./pages/Summaries";
import Quizzes from "./pages/Quizzes";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import SubjectDetail from "./pages/SubjectDetail";
import FileDetail from "./pages/FileDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner richColors />
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
              <SidebarProvider>
                <div className="flex min-h-screen w-full">
                  <AppSidebar />
                  <main className="flex-1 overflow-auto bg-background p-8">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/subjects" element={<Subjects />} />
                      <Route
                        path="/subject/:subjectId"
                        element={<SubjectDetail />}
                      />
                      <Route
                        path="/subject/:subjectId/file/:fileId"
                        element={<FileDetail />}
                      />
                      <Route path="/upload" element={<Upload />} />
                      <Route path="/summaries" element={<Summaries />} />
                      <Route path="/quizzes" element={<Quizzes />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                </div>
              </SidebarProvider>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
