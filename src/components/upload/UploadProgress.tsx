import { Progress } from '@/components/ui/progress';
import { CheckCircle } from 'lucide-react';

interface UploadProgressProps {
  progress: number;
  isCompleted: boolean;
}

export function UploadProgress({ progress, isCompleted }: UploadProgressProps) {
  if (isCompleted) {
    return (
      <div className="flex items-center gap-2 rounded-lg bg-success/10 p-4 text-success">
        <CheckCircle className="h-5 w-5" />
        <span className="font-medium">
          File processed successfully! Redirecting...
        </span>
      </div>
    );
  }

  if (progress > 0) {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span>Processing file...</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} />
      </div>
    );
  }

  return null;
}
