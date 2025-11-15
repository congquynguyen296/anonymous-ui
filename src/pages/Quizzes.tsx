import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { QuizCard } from '@/components/quizzes/QuizCard';
import { QuizDetail } from '@/components/quizzes/QuizDetail';
import { QuizEmptyState } from '@/components/quizzes/QuizEmptyState';

export default function Quizzes() {
  const { quizzes } = useAppStore();
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);

  const selectedQuiz = quizzes.find((q) => q.id === selectedQuizId);

  const handleTakeQuiz = (id: string) => {
    setSelectedQuizId(id);
  };

  const handleBack = () => {
    setSelectedQuizId(null);
  };

  if (selectedQuiz) {
    return <QuizDetail quiz={selectedQuiz} onBack={handleBack} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Quiz History</h1>
        <p className="text-muted-foreground">Review your quiz results and track your progress</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {quizzes.length === 0 ? (
          <QuizEmptyState />
        ) : (
          quizzes.map((quiz) => (
            <QuizCard
              key={quiz.id}
              quiz={quiz}
              onTakeQuiz={handleTakeQuiz}
            />
          ))
        )}
      </div>
    </div>
  );
}
