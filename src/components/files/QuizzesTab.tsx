import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Sparkles, Eye, Edit, Trash2, CheckCircle2, XCircle } from 'lucide-react';
import { Quiz } from '@/store/useAppStore';

interface QuizzesTabProps {
  quizzes: Quiz[];
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Hard':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export function QuizzesTab({ quizzes }: QuizzesTabProps) {
  if (quizzes.length === 0) {
    return (
      <Card className="border-0 shadow-xl">
        <CardContent className="py-16">
          <div className="text-center space-y-4">
            <Brain className="h-16 w-16 mx-auto text-gray-300" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No quizzes yet
              </h3>
              <p className="text-gray-600 mb-6">
                Generate your first AI-powered quiz to test your knowledge
              </p>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Sparkles className="h-4 w-4 mr-2" />
              Generate Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {quizzes.map((quiz) => (
        <Card
          key={quiz.id}
          className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <CardHeader>
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-2 flex-1">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  Quiz
                </CardTitle>
                <div className="flex flex-wrap gap-2">
                  <Badge className={getDifficultyColor(quiz.difficulty)}>
                    {quiz.difficulty}
                  </Badge>
                  <Badge variant="outline">
                    {quiz.questions.length} Question
                    {quiz.questions.length !== 1 ? 's' : ''}
                  </Badge>
                  {quiz.completed && quiz.score !== undefined && (
                    <Badge
                      className={
                        quiz.score >= 70
                          ? 'bg-green-100 text-green-800 border-green-200'
                          : 'bg-orange-100 text-orange-800 border-orange-200'
                      }
                    >
                      Score: {quiz.score}%
                    </Badge>
                  )}
                </div>
              </div>
              {quiz.completed ? (
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
              ) : (
                <XCircle className="h-5 w-5 text-gray-400 flex-shrink-0" />
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Created</span>
                <span className="font-medium text-gray-900">{quiz.createdAt}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Status</span>
                <span className="font-medium text-gray-900">
                  {quiz.completed ? 'Completed' : 'Not Started'}
                </span>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Sample Question</h4>
              <p className="text-sm text-gray-700 line-clamp-2">
                {quiz.questions[0]?.question}
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                variant={quiz.completed ? 'outline' : 'default'}
                size="sm"
                className="flex-1"
              >
                <Eye className="h-4 w-4 mr-2" />
                {quiz.completed ? 'Review' : 'Start Quiz'}
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
