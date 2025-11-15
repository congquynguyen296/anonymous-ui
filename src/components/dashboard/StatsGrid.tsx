import { FileText, BookOpen, Brain, TrendingUp } from 'lucide-react';
import { StatCard } from '@/components/common/StatCard';

interface StatsData {
  totalFiles: number;
  totalSummaries: number;
  totalQuizzes: number;
  averageScore: string;
  filesTrend?: string;
  summariesTrend?: string;
  quizzesTrend?: string;
  scoreTrend?: string;
}

interface StatsGridProps {
  stats: StatsData;
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Files"
        value={stats.totalFiles}
        icon={FileText}
        trend={stats.filesTrend || '+2 this week'}
        colorClass="text-primary"
      />
      <StatCard
        title="Summaries"
        value={stats.totalSummaries}
        icon={BookOpen}
        trend={stats.summariesTrend || '+1 today'}
        colorClass="text-accent"
      />
      <StatCard
        title="Quizzes"
        value={stats.totalQuizzes}
        icon={Brain}
        trend={stats.quizzesTrend || '+3 this week'}
        colorClass="text-success"
      />
      <StatCard
        title="Avg. Quiz Score"
        value={stats.averageScore}
        icon={TrendingUp}
        trend={stats.scoreTrend || '+5% from last week'}
        colorClass="text-chart-4"
      />
    </div>
  );
}
