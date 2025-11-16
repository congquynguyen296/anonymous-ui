import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FolderOpen, Edit, Trash2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { EditSubjectDialog } from './EditSubjectDialog';
import subjectService, { SubjectStatsDTO } from '@/services/subject.service';
import { toast } from 'sonner';
import { useSubjectStore } from '@/store/subjectStore';

// 👉 nhớ import AlertDialog
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export interface Subject {
  id: string;
  name: string;
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
  onDelete?: (id: string) => void; // nếu muốn vẫn giữ callback ngoài
}

export interface UpdateSubjectInput {
  newName: string;
  id: string;
}

export function SubjectCard({ subject, stats, onEdit, onDelete }: SubjectCardProps) {
  const subjects: SubjectStatsDTO[] | null = useSubjectStore((s) => s.subjects);
  const [sub, setSub] = useState<Subject>(subject);
  const navigate = useNavigate();
  const [showEdit, setShowEdit] = useState(false);

  const handleEdit = async (newName: string) => {
    try {
      const data = await subjectService.updateSubject({
        id: sub.id,
        name: newName,
      });
      if (data && data.code === 200) {
        toast.success('Subject updated successfully');
        const updated = data.result;

        setSub((prev) => ({
          id: updated.id ?? prev.id,
          name: updated.name ?? newName ?? prev.name,
          color: updated.color ?? prev.color,
        }));
      } else {
        toast.error(data?.message || 'Failed to update subject');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update subject');
    }
  };

  const handleDelete = async () => {
    try {
      const data = await subjectService.deleteSubject(sub.id);
      if (data && data.code === 200) {
        // reload list subject vào store
        const fetchSubjects = async () => {
          const res = await subjectService.getAllSubjectByUser();
          if (res && res.code === 200) {
            useSubjectStore.getState().setSubjects(res.result);
          }
        };
        fetchSubjects();

        // nếu cha truyền onDelete thì gọi luôn
        onDelete?.(sub.id);

        toast.success('Subject deleted successfully');
      } else {
        toast.error(data?.message || 'Failed to delete subject');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete subject');
    }
  };

  return (
    <>
      <Card
        className="transition-shadow hover:shadow-lg cursor-pointer group"
        onClick={() => navigate(`/subject/${sub.id}`)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div
                className="rounded-lg p-2"
                style={{ backgroundColor: `${sub.color}15` }}
              >
                <FolderOpen className="h-5 w-5" style={{ color: sub.color }} />
              </div>
              <CardTitle className="text-xl line-clamp-1">{sub.name}</CardTitle>
            </div>

            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {onEdit && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowEdit(true);
                    onEdit(subject.id);
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}

              {/* 🗑 Nút xoá có popup confirm */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent
                  onClick={(e) => e.stopPropagation()} // tránh click overlay bị propagate lên Card
                >
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Delete subject "{sub.name}"?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. All files, quizzes, and related data
                      associated with this subject may be affected.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete();
                      }}
                    >
                      Confirm deletion
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
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
                navigate(`/subject/${sub.id}`);
              }}
            >
              View Files
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {onEdit && (
        <EditSubjectDialog
          isOpen={showEdit}
          onClose={() => setShowEdit(false)}
          defaultName={sub.name}
          onSubmit={handleEdit}
        />
      )}
    </>
  );
}
