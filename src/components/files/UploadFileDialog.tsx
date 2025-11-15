import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';

interface UploadFileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (fileName: string, file: File) => void;
}

export function UploadFileDialog({
  isOpen,
  onClose,
  onSubmit,
}: UploadFileDialogProps) {
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = () => {
    if (fileName.trim() && file) {
      onSubmit(fileName, file);
      setFileName('');
      setFile(null);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
          <DialogDescription>
            Upload a new file. Supported formats: PDF, DOCX, TXT
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="fileName">File Name</Label>
            <Input
              id="fileName"
              placeholder="e.g., Chapter 5 - Calculus.pdf"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="file">Select File</Label>
            <Input
              id="file"
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={(e) => {
                const selectedFile = e.target.files?.[0];
                if (selectedFile) {
                  setFile(selectedFile);
                  if (!fileName) {
                    setFileName(selectedFile.name);
                  }
                }
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
