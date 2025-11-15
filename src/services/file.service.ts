import { ApiResponse } from '../type/ApiResponse';
import axiosInstance from '../lib/axios.lib';

export interface UploadFileOptions {
  subject?: string;
  createSummary?: boolean;
  generateQuiz?: boolean;
  quizQuestions?: number;
  quizDifficulty?: string;
  name?: string;
}

export interface UploadFileResult {
  file: {
    id: string;
    name: string;
    subject?: string;
    uploadDate?: string;
    size?: string;
    sizeBytes?: number;
    mimeType?: string;
    summaryCount?: number;
    quizCount?: number;
    url?: string;
    metadata?: Record<string, unknown>;
  };
  processing?: Record<string, unknown>;
}

class FileService {
  /**
   * Upload a file with optional processing flags.
   * The backend expects multipart/form-data fields (see screenshot):
   * - file (File)
   * - subject (string)
   * - createSummary (boolean)
   * - generateQuiz (boolean)
   * - quizQuestions (number)
   * - quizDifficulty (string)
   * - name (string)
   */
  /**
   * Upload a file. Only `file` and `name` are required by the caller.
   * Other processing flags default to true and sensible quiz defaults are applied.
   */
  async uploadFile(file: File, name: string, subject?: string): Promise<ApiResponse<UploadFileResult>> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);

    if (subject) formData.append('subject', subject);

    // Default processing flags as requested
    formData.append('createSummary', 'true');
    formData.append('generateQuiz', 'true');

    // sensible defaults for quiz generation
    formData.append('quizQuestions', '10');
    formData.append('quizDifficulty', 'medium');

    const response = await axiosInstance.axiosInstance.post<ApiResponse<UploadFileResult>>('/files', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  }

  async getFileDetail(fileId: string): Promise<ApiResponse<FileDetailData>> {
    const response = await axiosInstance.axiosInstance.get<ApiResponse<FileDetailData>>(`/files/files/${fileId}`);
    return response.data;
  }

}

export default new FileService();

// --- File detail types and methods ---
export interface FileDto {
  id: string;
  name: string;
  subject?: string;
  uploadDate?: string;
  size?: string;
  sizeBytes?: number;
  mimeType?: string;
  summaryCount?: number;
  quizCount?: number;
  url?: string;
  metadata?: Record<string, unknown>;
}

export interface SummaryAuthorDto {
  id: string;
  name?: string;
}

export interface SummaryDto {
  id: string;
  createdAt: string;
  excerpt?: string; // HTML excerpt
  aiMatchScore?: number | null;
  author?: SummaryAuthorDto;
  url?: string;
}

export interface QuizDto {
  id: string;
  createdAt?: string;
  questionCount?: number;
  averageScore?: number | null;
  url?: string;
}

export interface FileDetailData {
  file: FileDto;
  summaries: SummaryDto[];
  quizzes: QuizDto[];
}

// (getFileDetail is implemented on the class above)