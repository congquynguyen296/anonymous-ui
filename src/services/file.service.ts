import { axiosClient } from "../lib/axios.lib";
import { ApiResponse } from "../type/ApiResponse";
import { FileMeta } from "@/type/File";
import { TranslateHtmlRequest, TranslateHtmlResponse } from "../type/Translate";

class FileService {
    async getFileById(fileId: string): Promise<ApiResponse<FileMeta>> {
        const res = await axiosClient.axiosInstance.get<ApiResponse<FileMeta>>(
            `/files/files/${fileId}`
        );
        return res.data;
    }

    async translateHtml(payload: TranslateHtmlRequest): Promise<TranslateHtmlResponse> {
        const res = await axiosClient.axiosInstance.post<TranslateHtmlResponse>(
            `/generate-ai/translate`,
            payload
        );
        return res.data;
    }
}

export default new FileService();
