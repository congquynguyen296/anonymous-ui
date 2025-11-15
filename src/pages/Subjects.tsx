import { useAppStore } from '@/store/useAppStore';
import { toast } from 'sonner';
import { SubjectCard } from '@/components/subjects/SubjectCard';
import { CreateSubjectDialog } from '@/components/subjects/CreateSubjectDialog';

export default function Subjects() {
  const { subjects, files, addSubject } = useAppStore();

  const handleCreateSubject = (name: string) => {
    const colors = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    addSubject({
      id: `subj${Date.now()}`,
      name,
      folders: [],
      color: randomColor,
    });

    toast.success('Subject created successfully');
  };

  const getSubjectStats = (subjectName: string) => {
    const subjectFiles = files.filter((f) => f.subject === subjectName);
    const totalFiles = subjectFiles.length;
    const totalSummaries = subjectFiles.reduce((acc, f) => acc + f.summaryCount, 0);
    const totalQuizzes = subjectFiles.reduce((acc, f) => acc + f.quizCount, 0);
    
    return { totalFiles, totalSummaries, totalQuizzes };
  };

  const handleEdit = (id: string) => {
    toast.info('Edit functionality coming soon');
  };

  const handleDelete = (id: string) => {
    toast.info('Delete functionality coming soon');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Subjects</h1>
          <p className="text-muted-foreground">Organize your study materials by subject</p>
        </div>
        <CreateSubjectDialog onSubmit={handleCreateSubject} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject) => {
          const stats = getSubjectStats(subject.name);
          
          return (
            <SubjectCard
              key={subject.id}
              subject={subject}
              stats={stats}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          );
        })}
      </div>
    </div>
  );
}
