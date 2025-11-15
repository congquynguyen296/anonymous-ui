import { ApiResponse } from "../type/ApiResponse";
import axiosInstance from "../lib/axios.lib";

interface LoginWithGoogleResponse {
  valid: boolean;
  email: string;
  name: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

interface UserProfileResponse {
  id: string;
  name: string;
  email: string;
  image: string;
}

export interface UserStatisticsResponse {
  totalFiles: number;
  totalSummaries: number;
  totalQuizzes: number;
  completedQuizzes: number;
  averageScore: string;
  trends: {
    files: string;
    quizzes: string;
  };
}

class UserService {
    async loginWithGoogle(code: string): Promise<ApiResponse<LoginWithGoogleResponse>> {
      const response = await axiosInstance.axiosInstance.post<ApiResponse<LoginWithGoogleResponse>>(`/auth/google?code=${code}`);
      return response.data;
    }

    async getUserProfile(): Promise<ApiResponse<UserProfileResponse>> {
      const response = await axiosInstance.axiosInstance.get<ApiResponse<UserProfileResponse>>(`/user/profile`);
      return response.data;
    }

    async getUserStatistics(): Promise<ApiResponse<UserStatisticsResponse>> {
      const response = await axiosInstance.axiosInstance.get<ApiResponse<UserStatisticsResponse>>(`/user/statistics`);
      return response.data;
    }
}

export default new UserService();