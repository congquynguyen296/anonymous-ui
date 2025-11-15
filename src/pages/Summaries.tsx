import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Star, Search } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function Summaries() {
  const { summaries, toggleImportant } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSummaries = summaries.filter(
    (summary) =>
      summary.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      summary.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Summaries</h1>
          <p className="text-muted-foreground">View and manage your AI-generated knowledge summaries</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search summaries..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="space-y-4">
        {filteredSummaries.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <BookOpen className="mb-4 h-12 w-12 text-muted-foreground" />
              <p className="text-lg font-medium">No summaries found</p>
              <p className="text-sm text-muted-foreground">Upload a file to generate your first summary</p>
            </CardContent>
          </Card>
        ) : (
          filteredSummaries.map((summary) => (
            <Card key={summary.id} className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{summary.fileName}</CardTitle>
                      {summary.isImportant && (
                        <Badge variant="secondary" className="bg-accent/20 text-accent">
                          Important
                        </Badge>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Created {formatDistanceToNow(new Date(summary.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleImportant(summary.id)}
                  >
                    <Star
                      className={`h-4 w-4 ${
                        summary.isImportant ? 'fill-accent text-accent' : 'text-muted-foreground'
                      }`}
                    />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm leading-relaxed">{summary.content}</p>
                </div>

                <div>
                  <p className="mb-2 text-sm font-semibold">Key Concepts:</p>
                  <div className="flex flex-wrap gap-2">
                    {summary.keyConcepts.map((concept, index) => (
                      <Badge key={index} variant="outline">
                        {concept}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
