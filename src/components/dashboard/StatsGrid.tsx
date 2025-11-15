import { FileText, BookOpen, Brain, TrendingUp } from 'lucide-react';
import { StatCard } from '@/components/common/StatCard';
import { useEffect, useState } from 'react';
import userService, { UserStatisticsResponse } from '@/services/user.service';

export function StatsGrid() {

  const [stats, setStats] = useState<UserStatisticsResponse>();

  useEffect(() => {
    const fetchStaticsData = async () => {
      try {
        const response = await userService.getUserStatistics();
        if (response && response.code === 200 && response.result) {
          setStats(response.result);
        }
      } catch (error) {
        console.error('Failed to fetch user statistics:', error);
      }
    };

    fetchStaticsData();
  }, [stats]);

  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      <StatCard
        title="Total Files"
        value={stats?.totalFiles}
        icon={FileText}
        trend={stats?.trends.files || '+2 this week'}
        colorClass="text-primary"
      />
      <StatCard
        title="Summaries"
        value={stats?.totalSummaries}
        icon={BookOpen}
        trend={stats?.trends.quizzes || '+1 today'}
        colorClass="text-accent"
      />
      <StatCard
        title="Quizzes"
        value={stats?.totalQuizzes}
        icon={Brain}
        trend={stats?.trends.quizzes || '+3 this week'}
        colorClass="text-success"
      />
      {/* <StatCard
        title="Avg. Quiz Score"
        value={stats.averageScore}
        icon={TrendingUp}
        trend={stats. || '+5% from last week'}
        colorClass="text-chart-4"
      /> */}
    </div>
  );
}
