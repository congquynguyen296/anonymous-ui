import { FileText, BookOpen, Brain, TrendingUp } from 'lucide-react';
import { StatCard } from '@/components/common/StatCard';
import { useEffect, useState } from 'react';
import userService, { UserStatisticsResponse } from '@/services/user.service';
import LoadingSpinner from '../common/LoadingSpinner';

export function StatsGrid() {

  const [stats, setStats] = useState<UserStatisticsResponse>();

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchStaticsData = async () => {
      setIsLoading(true)
      try {
        const response = await userService.getUserStatistics();
        if (response && response.code === 200 && response.result) {
          setStats(response.result);
        }
        setIsLoading(false)
      } catch (error) {
        console.error('Failed to fetch user statistics:', error);
      }

    };

    fetchStaticsData();
  }, []);

  if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner message="Loading subjects..." variant="inline" size="lg" />
        </div>
      );
    }
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <StatCard
        title="Total Files"
        value={stats?.totalFiles}
        icon={FileText}
        trend={stats?.trends.files || '+2 this week'}
        colorClass="text-blue-600"
        bgColorClass="bg-blue-50"
      />
      <StatCard
        title="Summaries"
        value={stats?.totalSummaries}
        icon={BookOpen}
        trend={stats?.trends.files || '+1 today'}
        colorClass="text-purple-600"
        bgColorClass="bg-purple-50"
      />
      <StatCard
        title="Quizzes"
        value={stats?.totalQuizzes}
        icon={Brain}
        trend={stats?.trends.quizzes || '+3 this week'}
        colorClass="text-green-600"
        bgColorClass="bg-green-50"
      />
    </div>
  );
}
