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

class UserService {
    async loginWithGoogle(code: string): Promise<ApiResponse<LoginWithGoogleResponse>> {
        const response = await axiosInstance.axiosInstance.post<ApiResponse<LoginWithGoogleResponse>>(`/auth/google?code=${code}`);
        return response.data;
    }
}

export default new UserService();