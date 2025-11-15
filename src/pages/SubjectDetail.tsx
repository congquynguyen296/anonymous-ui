import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useAppStore } from '@/store/useAppStore';
import {
  FileText,
  Upload,
  Eye,
  Trash2,
  Sparkles,
  Calendar,
  FileIcon,
  ArrowLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function SubjectDetail() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const { subjects, files, addFile, deleteFile, addSummary } = useAppStore();

  const subject = subjects.find((s) => s.id === subjectId);
  const subjectFiles = files.filter((f) => f.subject === subject?.name);

  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [uploadFileName, setUploadFileName] = useState('');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);

  if (!subject) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Subject Not Found</h2>
          <Button onClick={() => navigate('/subjects')}>Back to Subjects</Button>
        </div>
      </div>
    );
  }

  const handleFileUpload = () => {
    if (!uploadFileName.trim()) {
      toast.error('Please enter a file name');
      return;
    }

    if (!uploadFile) {
      toast.error('Please select a file');
      return;
    }

    const newFile = {
      id: `file${Date.now()}`,
      name: uploadFileName,
      subject: subject.name,
      folder: subject.folders[0] || 'General',
      uploadDate: new Date().toISOString().split('T')[0],
      size: `${(uploadFile.size / (1024 * 1024)).toFixed(1)} MB`,
      summaryCount: 0,
      quizCount: 0,
    };

    addFile(newFile);
    toast.success(`File "${uploadFileName}" uploaded successfully`);
    setUploadDialogOpen(false);
    setUploadFileName('');
    setUploadFile(null);
  };

  const handleDeleteFile = () => {
    if (selectedFileId) {
      const file = files.find((f) => f.id === selectedFileId);
      deleteFile(selectedFileId);
      toast.success(`File "${file?.name}" deleted successfully`);
      setDeleteDialogOpen(false);
      setSelectedFileId(null);
    }
  };

  const handleGenerateSummary = async (fileId: string) => {
    const file = files.find((f) => f.id === fileId);
    if (!file) return;

    setIsGeneratingSummary(true);
    toast.info('Generating summary...');

    // Simulate API call
    setTimeout(() => {
      const newSummary = {
        id: `sum${Date.now()}`,
        fileId: file.id,
        fileName: file.name,
        content: `This is an automatically generated summary for ${file.name}. The document covers key concepts and important information relevant to ${subject.name}. Key topics include fundamental principles, practical applications, and theoretical foundations that are essential for understanding this subject matter.`,
        keyConcepts: [
          'Core Principles',
          'Applications',
          'Key Formulas',
          'Important Theorems',
          'Study Guidelines',
        ],
        createdAt: new Date().toISOString().split('T')[0],
        isImportant: false,
      };

      addSummary(newSummary);
      setIsGeneratingSummary(false);
      toast.success('Summary generated successfully!');
    }, 2000);
  };

  const handleViewDetail = (fileId: string) => {
    navigate(`/subject/${subjectId}/file/${fileId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/subjects')}
              className="mb-2 -ml-2"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Subjects
            </Button>
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: subject.color + '20' }}
              >
                <FileText className="h-6 w-6" style={{ color: subject.color }} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{subject.name}</h1>
                <p className="text-gray-600 mt-1">
                  {subjectFiles.length} file{subjectFiles.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>
          <Button
            onClick={() => setUploadDialogOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload File
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Files</CardDescription>
              <CardTitle className="text-3xl">{subjectFiles.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Summaries</CardDescription>
              <CardTitle className="text-3xl">
                {subjectFiles.reduce((acc, f) => acc + f.summaryCount, 0)}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Quizzes</CardDescription>
              <CardTitle className="text-3xl">
                {subjectFiles.reduce((acc, f) => acc + f.quizCount, 0)}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Files Table */}
        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-xl">Files</CardTitle>
            <CardDescription>Manage your uploaded files for {subject.name}</CardDescription>
          </CardHeader>
          <CardContent>
            {subjectFiles.length === 0 ? (
              <div className="text-center py-12">
                <FileIcon className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No files yet</h3>
                <p className="text-gray-600 mb-6">
                  Upload your first file to get started with summaries and quizzes
                </p>
                <Button onClick={() => setUploadDialogOpen(true)}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload File
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>File Name</TableHead>
                      <TableHead className="hidden md:table-cell">Upload Date</TableHead>
                      <TableHead className="hidden md:table-cell">Size</TableHead>
                      <TableHead className="text-center">Summaries</TableHead>
                      <TableHead className="text-center">Quizzes</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subjectFiles.map((file) => (
                      <TableRow key={file.id} className="group hover:bg-gray-50">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-blue-600 flex-shrink-0" />
                            <div className="min-w-0">
                              <div className="font-medium text-gray-900 truncate">
                                {file.name}
                              </div>
                              <div className="text-xs text-gray-500 md:hidden">
                                {file.uploadDate} • {file.size}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            {file.uploadDate}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-gray-600">
                          {file.size}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="secondary" className="font-semibold">
                            {file.summaryCount}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="secondary" className="font-semibold">
                            {file.quizCount}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewDetail(file.id)}
                              className="hover:bg-blue-50 hover:text-blue-600"
                            >
                              <Eye className="h-4 w-4" />
                              <span className="hidden lg:inline ml-2">View</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleGenerateSummary(file.id)}
                              disabled={isGeneratingSummary}
                              className="hover:bg-purple-50 hover:text-purple-600"
                            >
                              <Sparkles className="h-4 w-4" />
                              <span className="hidden lg:inline ml-2">Summary</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedFileId(file.id);
                                setDeleteDialogOpen(true);
                              }}
                              className="hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="hidden lg:inline ml-2">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Upload Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Upload File</DialogTitle>
            <DialogDescription>
              Upload a new file to {subject.name}. Supported formats: PDF, DOCX, TXT
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="fileName">File Name</Label>
              <Input
                id="fileName"
                placeholder="e.g., Chapter 5 - Calculus.pdf"
                value={uploadFileName}
                onChange={(e) => setUploadFileName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="file">Select File</Label>
              <Input
                id="file"
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setUploadFile(file);
                    if (!uploadFileName) {
                      setUploadFileName(file.name);
                    }
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleFileUpload}>Upload</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the file and all
              associated summaries and quizzes.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedFileId(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteFile}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
