import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useAppStore } from '@/store/useAppStore';
import {
  ArrowLeft,
  FileText,
  Calendar,
  HardDrive,
  Sparkles,
  BookOpen,
  Brain,
  Eye,
  Edit,
  Trash2,
  Download,
  Star,
  Clock,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/subject/${subjectId}`)}
            className="-ml-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to {subject?.name || 'Subject'}
          </Button>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
            <CardHeader>
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: subject?.color + '20' || '#3B82F620' }}
                    >
                      <FileText
                        className="h-6 w-6"
                        style={{ color: subject?.color || '#3B82F6' }}
                      />
                    </div>
                    <div className="min-w-0">
                      <CardTitle className="text-2xl truncate">{file.name}</CardTitle>
                      <CardDescription className="mt-1">{file.subject}</CardDescription>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 text-sm text-gray-600 pt-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>{file.uploadDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <HardDrive className="h-4 w-4 text-gray-400" />
                      <span>{file.size}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-gray-400" />
                      <span>{file.summaryCount} Summaries</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Brain className="h-4 w-4 text-gray-400" />
                      <span>{file.quizCount} Quizzes</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

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
            <Card className="border-0 shadow-xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center py-12 space-y-6">
                  <div className="w-24 h-24 rounded-2xl bg-gray-100 flex items-center justify-center">
                    <FileText className="h-12 w-12 text-gray-400" />
                  </div>
                  <div className="text-center space-y-3 max-w-md">
                    <h3 className="text-xl font-semibold text-gray-900">File Preview</h3>
                    <p className="text-gray-600">
                      This is a preview of {file.name}. In production, this would display the
                      actual file content.
                    </p>
                  </div>
                  <Button size="lg" variant="outline" className="gap-2">
                    <Download className="h-5 w-5" />
                    {file.name}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Summaries Tab */}
          <TabsContent value="summaries" className="space-y-4">
            {fileSummaries.length === 0 ? (
              <Card className="border-0 shadow-xl">
                <CardContent className="py-16">
                  <div className="text-center space-y-4">
                    <BookOpen className="h-16 w-16 mx-auto text-gray-300" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No summaries yet
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Generate your first AI-powered summary for this file
                      </p>
                    </div>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Summary
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 lg:grid-cols-2">
                {fileSummaries.map((summary) => (
                  <Card
                    key={summary.id}
                    className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1 flex-1">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-blue-600" />
                            Summary
                          </CardTitle>
                          <CardDescription className="flex items-center gap-2 text-xs">
                            <Clock className="h-3 w-3" />
                            {summary.createdAt}
                          </CardDescription>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleImportant(summary.id)}
                          className={
                            summary.isImportant
                              ? 'text-yellow-600 hover:text-yellow-700'
                              : 'text-gray-400 hover:text-yellow-600'
                          }
                        >
                          <Star
                            className="h-4 w-4"
                            fill={summary.isImportant ? 'currentColor' : 'none'}
                          />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ScrollArea className="h-32">
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {summary.content}
                        </p>
                      </ScrollArea>

                      <Separator />

                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">
                          Key Concepts
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {summary.keyConcepts.map((concept, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100"
                            >
                              {concept}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Quizzes Tab */}
          <TabsContent value="quizzes" className="space-y-4">
            {fileQuizzes.length === 0 ? (
              <Card className="border-0 shadow-xl">
                <CardContent className="py-16">
                  <div className="text-center space-y-4">
                    <Brain className="h-16 w-16 mx-auto text-gray-300" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No quizzes yet
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Generate your first AI-powered quiz to test your knowledge
                      </p>
                    </div>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Quiz
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 lg:grid-cols-2">
                {fileQuizzes.map((quiz) => (
                  <Card
                    key={quiz.id}
                    className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-2 flex-1">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Brain className="h-5 w-5 text-purple-600" />
                            Quiz
                          </CardTitle>
                          <div className="flex flex-wrap gap-2">
                            <Badge className={getDifficultyColor(quiz.difficulty)}>
                              {quiz.difficulty}
                            </Badge>
                            <Badge variant="outline">
                              {quiz.questions.length} Question
                              {quiz.questions.length !== 1 ? 's' : ''}
                            </Badge>
                            {quiz.completed && quiz.score !== undefined && (
                              <Badge
                                className={
                                  quiz.score >= 70
                                    ? 'bg-green-100 text-green-800 border-green-200'
                                    : 'bg-orange-100 text-orange-800 border-orange-200'
                                }
                              >
                                Score: {quiz.score}%
                              </Badge>
                            )}
                          </div>
                        </div>
                        {quiz.completed ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                        ) : (
                          <XCircle className="h-5 w-5 text-gray-400 flex-shrink-0" />
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Created</span>
                          <span className="font-medium text-gray-900">
                            {quiz.createdAt}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Status</span>
                          <span className="font-medium text-gray-900">
                            {quiz.completed ? 'Completed' : 'Not Started'}
                          </span>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-gray-900">Sample Question</h4>
                        <p className="text-sm text-gray-700 line-clamp-2">
                          {quiz.questions[0]?.question}
                        </p>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button
                          variant={quiz.completed ? 'outline' : 'default'}
                          size="sm"
                          className="flex-1"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          {quiz.completed ? 'Review' : 'Start Quiz'}
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
