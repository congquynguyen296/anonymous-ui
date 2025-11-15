import { useAppStore } from '@/store/useAppStore';
import { toast } from 'sonner';
import { ProfileSettings, ProfileFormData } from '@/components/settings/ProfileSettings';
import { PreferencesSettings } from '@/components/settings/PreferencesSettings';
import { AccountStatistics } from '@/components/settings/AccountStatistics';

export default function Settings() {
  const { user, updateUser, files, summaries, quizzes } = useAppStore();

  const handleProfileSubmit = (data: ProfileFormData) => {
    updateUser(data);
    toast.success('Settings updated successfully');
  };

  const handleNotificationsChange = (value: boolean) => {
    updateUser({ notifications: value });
    toast.success('Notification preferences updated');
  };

  const stats = {
    totalFiles: files.length,
    totalSummaries: summaries.length,
    totalQuizzes: quizzes.filter(q => q.completed).length,
    averageScore: '85%',
  };

  if (!user) {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No User Data</h2>
          <p className="text-gray-600">Please log in to access settings.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <ProfileSettings
        defaultValues={{
          name: user.name,
          email: user.email,
        }}
        onSubmit={handleProfileSubmit}
      />

      <PreferencesSettings
        notifications={user.notifications}
        onNotificationsChange={handleNotificationsChange}
      />

      <AccountStatistics stats={stats} />
    </div>
  );
}
