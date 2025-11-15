import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useAppStore } from '@/store/useAppStore';
import { FileText, BookOpen, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { FileHeader } from '@/components/files/FileHeader';
import { FilePreview } from '@/components/files/FilePreview';
import { SummariesTab } from '@/components/files/SummariesTab';
import { QuizzesTab } from '@/components/files/QuizzesTab';

export default function FileDetail() {
  const { subjectId, fileId } = useParams<{ subjectId: string; fileId: string }>();
  const navigate = useNavigate();
  const { files, summaries, quizzes, subjects, toggleImportant } = useAppStore();

  const file = files.find((f) => f.id === fileId);
  const subject = subjects.find((s) => s.id === subjectId);
  const fileSummaries = summaries.filter((s) => s.fileId === fileId);
  const fileQuizzes = quizzes.filter((q) => q.fileId === fileId);

  const [activeTab, setActiveTab] = useState('original');

  if (!file) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">File Not Found</h2>
          <Button onClick={() => navigate(`/subject/${subjectId}`)}>Back to Subject</Button>
        </div>
      </div>
    );
  }

  const handleToggleImportant = (summaryId: string) => {
    toggleImportant(summaryId);
    const summary = summaries.find((s) => s.id === summaryId);
    toast.success(
      summary?.isImportant ? 'Removed from important' : 'Marked as important'
    );
  };

  const handleDeleteSummary = (summaryId: string) => {
    // TODO: Implement delete summary functionality
    toast.success('Summary deleted');
  };

  const handleViewDetail = (summaryId: string) => {
    // TODO: Implement view detail functionality
    toast.info('View detail: ' + summaryId);
  };

  const handleTranslate = async (summaryId: string, language: string) => {
    // TODO: Implement translate functionality
    toast.success(`Translating to ${language}...`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <FileHeader
          file={file}
          subjectColor={subject?.color}
          subjectName={subject?.name}
          onBack={() => navigate(`/subject/${subjectId}`)}
        />

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
            <TabsTrigger value="original" className="gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Original File</span>
              <span className="sm:hidden">File</span>
            </TabsTrigger>
            <TabsTrigger value="summaries" className="gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Summaries</span>
              <span className="sm:hidden">Sum</span>
              <Badge variant="secondary" className="ml-1">
                {fileSummaries.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="quizzes" className="gap-2">
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">Quizzes</span>
              <span className="sm:hidden">Quiz</span>
              <Badge variant="secondary" className="ml-1">
                {fileQuizzes.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          {/* Original File Tab */}
          <TabsContent value="original" className="space-y-0">
            <FilePreview fileName={file.name} />
          </TabsContent>

          {/* Summaries Tab */}
          <TabsContent value="summaries" className="space-y-4">
            <SummariesTab
              summaries={fileSummaries}
              onToggleImportant={handleToggleImportant}
              onDelete={handleDeleteSummary}
              onViewDetail={handleViewDetail}
              onTranslate={handleTranslate}
            />
          </TabsContent>

          {/* Quizzes Tab */}
          <TabsContent value="quizzes" className="space-y-4">
            <QuizzesTab quizzes={fileQuizzes} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
