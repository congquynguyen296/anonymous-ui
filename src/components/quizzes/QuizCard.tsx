import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, CheckCircle, XCircle, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export interface QuizData {
  id: string;
  fileId: string;
  fileName: string;
  subject: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questions: QuizQuestion[];
  createdAt: string;
  score?: number;
  completed: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  userAnswer?: number;
}

interface QuizCardProps {
  quiz: QuizData;
  onTakeQuiz: (id: string) => void;
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy':
      return 'bg-success/20 text-success';
    case 'Medium':
      return 'bg-chart-4/20 text-chart-4';
    case 'Hard':
      return 'bg-destructive/20 text-destructive';
    default:
      return 'bg-muted';
  }
};

export function QuizCard({ quiz, onTakeQuiz }: QuizCardProps) {
  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{quiz.fileName}</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">{quiz.subject}</p>
          </div>
          <Badge className={getDifficultyColor(quiz.difficulty)}>
            {quiz.difficulty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>
              {formatDistanceToNow(new Date(quiz.createdAt), {
                addSuffix: true,
              })}
            </span>
          </div>
          <span className="text-muted-foreground">
            {quiz.questions.length} questions
          </span>
        </div>

        {quiz.completed && quiz.score !== undefined ? (
          <div className="rounded-lg bg-muted p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Score</span>
              <span className="text-lg font-bold text-success">
                {quiz.score}%
              </span>
            </div>
          </div>
        ) : (
          <Badge variant="outline">Not completed</Badge>
        )}

        <Button
          variant="outline"
          className="w-full"
          onClick={() => onTakeQuiz(quiz.id)}
        >
          {quiz.completed ? 'Review Quiz' : 'Take Quiz'}
        </Button>
      </CardContent>
    </Card>
  );
}
