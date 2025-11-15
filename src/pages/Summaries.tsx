import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { toast } from 'sonner';
import { SummaryCard } from '@/components/summaries/SummaryCard';
import { SummarySearch } from '@/components/summaries/SummarySearch';
import { SummaryEmptyState } from '@/components/summaries/SummaryEmptyState';

export default function Summaries() {
  const { summaries, toggleImportant } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSummaries = summaries.filter(
    (summary) =>
      summary.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      summary.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleImportant = (id: string) => {
    toggleImportant(id);
    const summary = summaries.find((s) => s.id === id);
    toast.success(
      summary?.isImportant ? 'Removed from important' : 'Marked as important'
    );
  };

  const handleDelete = (id: string) => {
    // TODO: Implement delete functionality with API call
    toast.info('Delete functionality will be implemented with API');
  };

  const handleViewDetail = (id: string) => {
    // TODO: Navigate to detail page or open modal
    toast.info('View detail functionality will be implemented');
  };

  const handleTranslate = async (id: string, language: string) => {
    // TODO: Call translation API
    toast.success(`Translating to ${language}...`);
    console.log(`Translate summary ${id} to ${language}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Summaries</h1>
          <p className="text-muted-foreground">View and manage your AI-generated knowledge summaries</p>
        </div>
      </div>

      <SummarySearch
        value={searchQuery}
        onChange={setSearchQuery}
      />

      <div className="space-y-4">
        {filteredSummaries.length === 0 ? (
          <SummaryEmptyState />
        ) : (
          filteredSummaries.map((summary) => (
            <SummaryCard
              key={summary.id}
              summary={summary}
              onToggleImportant={handleToggleImportant}
              onDelete={handleDelete}
              onViewDetail={handleViewDetail}
              onTranslate={handleTranslate}
              fullWidth={true}
            />
          ))
        )}
      </div>
    </div>
  );
}
