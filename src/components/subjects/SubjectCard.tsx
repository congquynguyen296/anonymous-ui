import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FolderOpen, Edit, Trash2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

export interface Subject {
  id: string;
  name: string;
  folders: string[];
  color: string;
}

interface SubjectStats {
  totalFiles: number;
  totalSummaries: number;
  totalQuizzes: number;
}

interface SubjectCardProps {
  subject: Subject;
  stats: SubjectStats;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function SubjectCard({ subject, stats, onEdit, onDelete }: SubjectCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      className="transition-shadow hover:shadow-lg cursor-pointer group"
      onClick={() => navigate(`/subject/${subject.id}`)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className="rounded-lg p-2"
              style={{ backgroundColor: `${subject.color}15` }}
            >
              <FolderOpen className="h-5 w-5" style={{ color: subject.color }} />
            </div>
            <CardTitle className="text-xl">{subject.name}</CardTitle>
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {onEdit && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(subject.id);
                }}
              >
                <Edit className="h-4 w-4" />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(subject.id);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-lg bg-muted p-2">
              <p className="text-2xl font-bold">{stats.totalFiles}</p>
              <p className="text-xs text-muted-foreground">Files</p>
            </div>
            <div className="rounded-lg bg-muted p-2">
              <p className="text-2xl font-bold">{stats.totalSummaries}</p>
              <p className="text-xs text-muted-foreground">Summaries</p>
            </div>
            <div className="rounded-lg bg-muted p-2">
              <p className="text-2xl font-bold">{stats.totalQuizzes}</p>
              <p className="text-xs text-muted-foreground">Quizzes</p>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full mt-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/subject/${subject.id}`);
            }}
          >
            View Files
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
