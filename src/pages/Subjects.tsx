import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FolderOpen, Plus, Edit, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function Subjects() {
  const { subjects, files, addSubject } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState('');

  const handleAddSubject = () => {
    if (!newSubjectName.trim()) {
      toast.error('Please enter a subject name');
      return;
    }

    const colors = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    addSubject({
      id: `subj${Date.now()}`,
      name: newSubjectName,
      folders: [],
      color: randomColor,
    });

    toast.success('Subject created successfully');
    setNewSubjectName('');
    setIsOpen(false);
  };

  const getSubjectStats = (subjectName: string) => {
    const subjectFiles = files.filter((f) => f.subject === subjectName);
    const totalFiles = subjectFiles.length;
    const totalSummaries = subjectFiles.reduce((acc, f) => acc + f.summaryCount, 0);
    const totalQuizzes = subjectFiles.reduce((acc, f) => acc + f.quizCount, 0);
    
    return { totalFiles, totalSummaries, totalQuizzes };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Subjects</h1>
          <p className="text-muted-foreground">Organize your study materials by subject</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Subject
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Subject</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="subject-name">Subject Name</Label>
                <Input
                  id="subject-name"
                  placeholder="e.g., Biology, Chemistry, History"
                  value={newSubjectName}
                  onChange={(e) => setNewSubjectName(e.target.value)}
                />
              </div>
              <Button onClick={handleAddSubject} className="w-full">
                Create Subject
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject) => {
          const stats = getSubjectStats(subject.name);
          
          return (
            <Card key={subject.id} className="transition-shadow hover:shadow-lg">
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
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
                  
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Folders ({subject.folders.length})</p>
                    <div className="flex flex-wrap gap-1">
                      {subject.folders.slice(0, 3).map((folder) => (
                        <span
                          key={folder}
                          className="rounded-md bg-secondary px-2 py-1 text-xs"
                        >
                          {folder}
                        </span>
                      ))}
                      {subject.folders.length > 3 && (
                        <span className="rounded-md bg-secondary px-2 py-1 text-xs">
                          +{subject.folders.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
