import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, FileText, Calendar, HardDrive, BookOpen, Brain, Download, Sparkles } from 'lucide-react';

interface FileInfo {
  name: string;
  subject: string;
  uploadDate: string;
  size: string;
  summaryCount: number;
  quizCount: number;
}

interface FileHeaderProps {
  file: FileInfo;
  subjectColor?: string;
  subjectName?: string;
  onBack: () => void;
}

export function FileHeader({ file, subjectColor = '#3B82F6', subjectName, onBack }: FileHeaderProps) {
  return (
    <div className="space-y-4">
      <Button variant="ghost" size="sm" onClick={onBack} className="-ml-2">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to {subjectName || 'Subject'}
      </Button>

      <Card className="border-0 shadow-xl bg-grad from-white to-gray-50">
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: subjectColor + '20' }}
                >
                  <FileText className="h-6 w-6" style={{ color: subjectColor }} />
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
  );
}
