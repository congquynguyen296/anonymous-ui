import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Download } from 'lucide-react';

interface FilePreviewProps {
  fileName: string;
}

export function FilePreview({ fileName }: FilePreviewProps) {
  return (
    <Card className="border-0 shadow-xl overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col items-center justify-center py-12 space-y-6">
          <div className="w-24 h-24 rounded-2xl bg-gray-100 flex items-center justify-center">
            <FileText className="h-12 w-12 text-gray-400" />
          </div>
          <div className="text-center space-y-3 max-w-md">
            <h3 className="text-xl font-semibold text-gray-900">File Preview</h3>
            <p className="text-gray-600">
              This is a preview of {fileName}. In production, this would display the
              actual file content.
            </p>
          </div>
          <Button size="lg" variant="outline" className="gap-2">
            <Download className="h-5 w-5" />
            {fileName}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
