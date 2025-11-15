import { useState, useEffect } from 'react';
import { QuizCard } from '@/components/quizzes/QuizCard';
import { QuizEmptyState } from '@/components/quizzes/QuizEmptyState';
import fileService, { QuizApiResponse } from '@/services/file.service';
import { toast } from 'sonner';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function Quizzes() {
  const [quizzes, setQuizzes] = useState<QuizApiResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuizzes();
  }, []);

  const loadQuizzes = async () => {
    try {
      setLoading(true);
      const response = await fileService.getAllQuizzes();
      if (response.success) {
        setQuizzes(response.data);
      } else {
        toast.error('Failed to load quizzes');
      }
    } catch (error) {
      console.error('Error loading quizzes:', error);
      toast.error('Failed to load quizzes');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner message="Loading quizzes..." variant="inline" size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Quiz History</h1>
        <p className="text-muted-foreground">Review your quiz results and track your progress</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {quizzes.length === 0 ? (
          <div className="col-span-full">
            <QuizEmptyState />
          </div>
        ) : (
          quizzes.map((quiz) => (
            <QuizCard
              key={quiz._id}
              quiz={quiz}
            />
          ))
        )}
      </div>
    </div>
  );
}
