import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface PreferencesSettingsProps {
  notifications: boolean;
  onNotificationsChange: (value: boolean) => void;
}

export function PreferencesSettings({
  notifications,
  onNotificationsChange,
}: PreferencesSettingsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
        <CardDescription>Customize your app experience</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Email Notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive email updates about your summaries and quizzes
            </p>
          </div>
          <Switch
            checked={notifications}
            onCheckedChange={onNotificationsChange}
          />
        </div>
      </CardContent>
    </Card>
  );
}
