import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Subject {
  id: string;
  name: string;
}

interface SubjectSelectorProps {
  subjects: Subject[];
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function SubjectSelector({
  subjects,
  value,
  onChange,
  disabled = false,
}: SubjectSelectorProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="subject">Subject</Label>
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger>
          <SelectValue placeholder="Select a subject" />
        </SelectTrigger>
        <SelectContent>
          {subjects.map((subject) => (
            <SelectItem key={subject.id} value={subject.name}>
              {subject.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
