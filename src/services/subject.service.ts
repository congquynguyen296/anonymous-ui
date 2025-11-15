import { ApiResponse } from "@/type/ApiResponse"
import axiosInstance from "../lib/axios.lib";

export interface SubjectStatsDTO {
  id: string
  name: string
  color: string
  createdAt: Date
  stats: {
    totalFiles: number
    totalSummaries: number
    totalQuizzes: number
  }
}

export interface CreateSubjectInput {
  name: string
  color: string
}
export interface UpdateSubjectInput {
  name: string
  id: string
}

class SubjectService {
  async getAllSubjectByUser(): Promise<ApiResponse<SubjectStatsDTO[]>>{
    const response = await axiosInstance.axiosInstance.get<ApiResponse<SubjectStatsDTO[]>>(`/subjects`)
    return response.data;
  }
  async getSubjectById(subjectId: string): Promise<ApiResponse<SubjectStatsDTO>>{
    const response = await axiosInstance.axiosInstance.get<ApiResponse<SubjectStatsDTO>>(`/subject/${encodeURIComponent(subjectId)}`)
    return response.data;
  }
  async createSubject(data: CreateSubjectInput): Promise<ApiResponse<SubjectStatsDTO>>{
    const response = await axiosInstance.axiosInstance.post<ApiResponse<SubjectStatsDTO>>(`/subjects`, data)
    return response.data;
  }
  async updateSubject(data): Promise<ApiResponse<SubjectStatsDTO>>{
    const response = await axiosInstance.axiosInstance.put<ApiResponse<SubjectStatsDTO>>(`/subjects`, data)
    return response.data;
  }
}

export default new SubjectService();