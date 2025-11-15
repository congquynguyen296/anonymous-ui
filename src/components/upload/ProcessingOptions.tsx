import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ProcessingOptionsProps {
  createSummary: boolean;
  generateQuiz: boolean;
  quizQuestions: number;
  quizDifficulty: 'Easy' | 'Medium' | 'Hard';
  onCreateSummaryChange: (value: boolean) => void;
  onGenerateQuizChange: (value: boolean) => void;
  onQuizQuestionsChange: (value: number) => void;
  onQuizDifficultyChange: (value: 'Easy' | 'Medium' | 'Hard') => void;
  disabled?: boolean;
}

export function ProcessingOptions({
  createSummary,
  generateQuiz,
  quizQuestions,
  quizDifficulty,
  onCreateSummaryChange,
  onGenerateQuizChange,
  onQuizQuestionsChange,
  onQuizDifficultyChange,
  disabled = false,
}: ProcessingOptionsProps) {
  return (
    <div className="space-y-4 rounded-lg border p-4">
      <h3 className="font-semibold">Processing Options</h3>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="createSummary"
          checked={createSummary}
          onCheckedChange={(checked) => onCreateSummaryChange(checked as boolean)}
          disabled={disabled}
        />
        <label htmlFor="createSummary" className="text-sm font-medium">
          Create AI Summary
        </label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="generateQuiz"
          checked={generateQuiz}
          onCheckedChange={(checked) => onGenerateQuizChange(checked as boolean)}
          disabled={disabled}
        />
        <label htmlFor="generateQuiz" className="text-sm font-medium">
          Generate Quiz
        </label>
      </div>

      {generateQuiz && (
        <div className="ml-6 space-y-4 border-l-2 pl-4">
          <div className="space-y-2">
            <Label>Number of Questions: {quizQuestions}</Label>
            <Slider
              value={[quizQuestions]}
              onValueChange={(value) => onQuizQuestionsChange(value[0])}
              min={5}
              max={20}
              step={1}
              disabled={disabled}
            />
          </div>

          <div className="space-y-2">
            <Label>Difficulty</Label>
            <Select
              value={quizDifficulty}
              onValueChange={(value) =>
                onQuizDifficultyChange(value as 'Easy' | 'Medium' | 'Hard')
              }
              disabled={disabled}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  );
}
