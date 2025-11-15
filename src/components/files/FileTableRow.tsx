import { FileText, Calendar, Eye, Sparkles, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  TableCell,
  TableRow,
} from '@/components/ui/table';

export interface FileData {
  id: string;
  name: string;
  subject: string;
  folder: string;
  uploadDate: string;
  size: string;
  summaryCount: number;
  quizCount: number;
}

interface FileTableRowProps {
  file: FileData;
  onView: (id: string) => void;
  onGenerateSummary: (id: string) => void;
  onDelete: (id: string) => void;
  isGenerating?: boolean;
}

export function FileTableRow({
  file,
  onView,
  onGenerateSummary,
  onDelete,
  isGenerating = false,
}: FileTableRowProps) {
  return (
    <TableRow className="group hover:bg-gray-50">
      <TableCell>
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-blue-600 flex-shrink-0" />
          <div className="min-w-0">
            <div className="font-medium text-gray-900 truncate">{file.name}</div>
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
            onClick={() => onView(file.id)}
            className="hover:bg-blue-50 hover:text-blue-600"
          >
            <Eye className="h-4 w-4" />
            <span className="hidden lg:inline ml-2">View</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onGenerateSummary(file.id)}
            disabled={isGenerating}
            className="hover:bg-purple-50 hover:text-purple-600"
          >
            <Sparkles className="h-4 w-4" />
            <span className="hidden lg:inline ml-2">Summary</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(file.id)}
            className="hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
            <span className="hidden lg:inline ml-2">Delete</span>
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
