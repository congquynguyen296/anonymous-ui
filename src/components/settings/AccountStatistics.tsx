import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AccountStats {
  totalFiles: number;
  totalSummaries: number;
  totalQuizzes: number;
  averageScore: string;
}

interface AccountStatisticsProps {
  stats: AccountStats;
}

export function AccountStatistics({ stats }: AccountStatisticsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Total Files Uploaded</p>
            <p className="mt-1 text-2xl font-bold">{stats.totalFiles}</p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Summaries Generated</p>
            <p className="mt-1 text-2xl font-bold">{stats.totalSummaries}</p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Quizzes Completed</p>
            <p className="mt-1 text-2xl font-bold">{stats.totalQuizzes}</p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Average Quiz Score</p>
            <p className="mt-1 text-2xl font-bold">{stats.averageScore}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
