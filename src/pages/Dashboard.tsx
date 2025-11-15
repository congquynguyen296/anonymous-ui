import { FileText, BookOpen, Brain, TrendingUp } from 'lucide-react';
import { StatCard } from '@/components/StatCard';
import { RecentActivityCard } from '@/components/RecentActivityCard';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { files, summaries, quizzes } = useAppStore();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your learning overview.</p>
        </div>
        <Button onClick={() => navigate('/upload')}>
          Upload New File
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Files"
          value={files.length}
          icon={FileText}
          trend="+2 this week"
          colorClass="text-primary"
        />
        <StatCard
          title="Summaries"
          value={summaries.length}
          icon={BookOpen}
          trend="+1 today"
          colorClass="text-accent"
        />
        <StatCard
          title="Quizzes"
          value={quizzes.length}
          icon={Brain}
          trend="+3 this week"
          colorClass="text-success"
        />
        <StatCard
          title="Avg. Quiz Score"
          value="85%"
          icon={TrendingUp}
          trend="+5% from last week"
          colorClass="text-chart-4"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentActivityCard />
        </div>
        
        <div className="space-y-4">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="mb-4 font-semibold">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/upload')}>
                <FileText className="mr-2 h-4 w-4" />
                Upload New File
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/summaries')}>
                <BookOpen className="mr-2 h-4 w-4" />
                View Summaries
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/quizzes')}>
                <Brain className="mr-2 h-4 w-4" />
                Take a Quiz
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
