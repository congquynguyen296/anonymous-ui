import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, CheckCircle, XCircle, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function Quizzes() {
  const { quizzes } = useAppStore();
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);

  const quiz = quizzes.find((q) => q.id === selectedQuiz);

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

  if (quiz) {
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setSelectedQuiz(null)}>
            Back to Quizzes
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{quiz.fileName}</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{quiz.subject}</span>
              <span>•</span>
              <Badge className={getDifficultyColor(quiz.difficulty)}>{quiz.difficulty}</Badge>
              <span>•</span>
              <span>{quiz.questions.length} questions</span>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quiz Questions</CardTitle>
            {quiz.completed && quiz.score !== undefined && (
              <div className="mt-2 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-success" />
                <span className="font-semibold text-success">Score: {quiz.score}%</span>
              </div>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            {quiz.questions.map((question, index) => (
              <div key={question.id} className="rounded-lg border p-4">
                <p className="mb-4 font-medium">
                  {index + 1}. {question.question}
                </p>
                <div className="space-y-2">
                  {question.options.map((option, optionIndex) => {
                    const isCorrect = optionIndex === question.correctAnswer;
                    const isUserAnswer = optionIndex === question.userAnswer;
                    
                    let className = 'rounded-lg border p-3 text-sm';
                    if (quiz.completed) {
                      if (isCorrect) {
                        className += ' border-success bg-success/10';
                      } else if (isUserAnswer && !isCorrect) {
                        className += ' border-destructive bg-destructive/10';
                      }
                    }

                    return (
                      <div key={optionIndex} className={className}>
                        <div className="flex items-center justify-between">
                          <span>{option}</span>
                          {quiz.completed && isCorrect && (
                            <CheckCircle className="h-4 w-4 text-success" />
                          )}
                          {quiz.completed && isUserAnswer && !isCorrect && (
                            <XCircle className="h-4 w-4 text-destructive" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Quiz History</h1>
        <p className="text-muted-foreground">Review your quiz results and track your progress</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {quizzes.length === 0 ? (
          <Card className="col-span-2">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Brain className="mb-4 h-12 w-12 text-muted-foreground" />
              <p className="text-lg font-medium">No quizzes yet</p>
              <p className="text-sm text-muted-foreground">Upload a file and generate a quiz to get started</p>
            </CardContent>
          </Card>
        ) : (
          quizzes.map((quiz) => (
            <Card key={quiz.id} className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{quiz.fileName}</CardTitle>
                    <p className="mt-1 text-sm text-muted-foreground">{quiz.subject}</p>
                  </div>
                  <Badge className={getDifficultyColor(quiz.difficulty)}>{quiz.difficulty}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{formatDistanceToNow(new Date(quiz.createdAt), { addSuffix: true })}</span>
                  </div>
                  <span className="text-muted-foreground">{quiz.questions.length} questions</span>
                </div>

                {quiz.completed && quiz.score !== undefined ? (
                  <div className="rounded-lg bg-muted p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Score</span>
                      <span className="text-lg font-bold text-success">{quiz.score}%</span>
                    </div>
                  </div>
                ) : (
                  <Badge variant="outline">Not completed</Badge>
                )}

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setSelectedQuiz(quiz.id)}
                >
                  {quiz.completed ? 'Review Quiz' : 'Take Quiz'}
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
