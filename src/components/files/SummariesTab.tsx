import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Sparkles } from 'lucide-react';
import { SummaryCard } from '@/components/summaries/SummaryCard';
import { Summary } from '@/store/useAppStore';

interface SummariesTabProps {
  summaries: Summary[];
  onToggleImportant: (id: string) => void;
  onDelete: (id: string) => void;
  onViewDetail: (id: string) => void;
  onTranslate: (id: string, language: string) => Promise<void>;
}

export function SummariesTab({
  summaries,
  onToggleImportant,
  onDelete,
  onViewDetail,
  onTranslate,
}: SummariesTabProps) {
  if (summaries.length === 0) {
    return (
      <Card className="border-0 shadow-xl">
        <CardContent className="py-16">
          <div className="text-center space-y-4">
            <BookOpen className="h-16 w-16 mx-auto text-gray-300" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No summaries yet
              </h3>
              <p className="text-gray-600 mb-6">
                Generate your first AI-powered summary for this file
              </p>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Sparkles className="h-4 w-4 mr-2" />
              Generate Summary
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {summaries.map((summary) => (
        <SummaryCard
          key={summary.id}
          summary={summary}
          onToggleImportant={onToggleImportant}
          onDelete={onDelete}
          onViewDetail={onViewDetail}
          onTranslate={onTranslate}
          fullWidth={true}
        />
      ))}
    </div>
  );
}
