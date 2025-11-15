import axiosInstance from "@/lib/axios.lib";
import { FileMeta } from "@/type/File";
import { TranslateHtmlRequest, TranslateHtmlResponse } from "../type/Translate";
import { ApiResponse } from "../type/ApiResponse";

export interface QuizApiResponse {
  _id: string;
  name: string;
  fileId: string;
  level: string;
  content: string | null;
  highestScore: number;
  createdAt: string;
  updatedAt: string;
}

export interface QuizzesListResponse {
  success: boolean;
  data: QuizApiResponse[];
  count: number;
}

export interface Answer {
  _id?: string;
  content: string;
  isCorrect: boolean;
  explain?: string;
}

export interface Question {
  _id: string;
  name: string;
  question: string;
  quizId: string;
  answers: Answer[];
  userAnswer?: number; // Index of answer that user selected in previous attempt
  createdAt: string;
  updatedAt: string;
}

export interface QuestionsListResponse {
  success: boolean;
  data: Question[];
  count: number;
  isReview?: boolean;
}

export interface QuizAnswer {
  questionId: string;
  selectedAnswer: number;
}

export interface SubmitQuizRequest {
  answers: QuizAnswer[];
  timeSpent?: string;
}

export interface QuizResult {
  questionId: string;
  isCorrect: boolean;
  selectedAnswer: number;
  correctAnswer: number;
}

export interface SubmitQuizResponse {
  success: boolean;
  message?: string;
  data: {
    quizId: string;
    score: number;
    correctAnswers: number;
    totalQuestions: number;
    timeSpent?: string;
    completed: boolean;
    completedAt?: string;
    results: QuizResult[];
  };
}

class FileService {
  async getAllQuizzes(): Promise<QuizzesListResponse> {
    const response = await axiosInstance.axiosInstance.get<QuizzesListResponse>(
      `/quizzes`
    );
    return response.data;
  }

  async getFileQuizzes(fileId: string): Promise<QuizzesListResponse> {
    const response = await axiosInstance.axiosInstance.get<QuizzesListResponse>(
      // `/file/${fileId}/quizzes`
      `/file/69184dd8deb649695b3c271a/quizzes`
    );
    return response.data;
  }

  async getQuizQuestions(
    quizId: string,
    isReview: boolean = false
  ): Promise<QuestionsListResponse> {
    const url = isReview
      ? `/file/quizzes/${quizId}/questions?review=true`
      : `/file/quizzes/${quizId}/questions`;
    const response =
      await axiosInstance.axiosInstance.get<QuestionsListResponse>(url);
    return response.data;
  }

  async getQuizById(
    quizId: string
  ): Promise<{ success: boolean; data: QuizApiResponse }> {
    const response = await axiosInstance.axiosInstance.get<{
      success: boolean;
      data: QuizApiResponse;
    }>(`/file/quizzes/${quizId}`);
    return response.data;
  }

  async submitQuiz(
    quizId: string,
    answers: QuizAnswer[],
    timeSpent?: string
  ): Promise<SubmitQuizResponse> {
    const requestBody: SubmitQuizRequest = {
      answers,
      ...(timeSpent && { timeSpent }),
    };
    const response = await axiosInstance.axiosInstance.post<SubmitQuizResponse>(
      `/file/quizzes/${quizId}/submit`,
      requestBody
    );
    return response.data;
  }

  async getFileById(fileId: string): Promise<ApiResponse<FileMeta>> {
    const res = await axiosInstance.axiosInstance.get<ApiResponse<FileMeta>>(
      `/files/files/${fileId}`
    );
    return res.data;
  }

  async translateHtml(
    payload: TranslateHtmlRequest
  ): Promise<TranslateHtmlResponse> {
    const res = await axiosInstance.axiosInstance.post<TranslateHtmlResponse>(
      `/generate-ai/translate`,
      payload
    );
    return res.data;
  }
}

export default new FileService();
