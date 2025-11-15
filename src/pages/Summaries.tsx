import React from "react";
import fileService from "@/services/file.service";
import { FileMeta } from "@/type/File";
import parse from "html-react-parser";
import { toast } from 'sonner';

interface Summary {
  id: string;
  title: string;
  content: string;
  language: string;
}

interface Props {
  summary?: Summary;
  onReGenerate?: (id: string) => void;
  onTranslate?: (id: string, targetLang: string) => void;
}

export default function SingleSummary({ summary, onReGenerate, onTranslate }: Props) {
  const [selectedLang, setSelectedLang] = React.useState("en");
  const [file, setFile] = React.useState<FileMeta | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [contentHtml, setContentHtml] = React.useState<string>("");
  const [translating, setTranslating] = React.useState<boolean>(false);

  React.useEffect(() => {
    const mockId = "69185226e833608ac721712a";
    setLoading(true);
    setError(null);
    fileService
      .getFileById(mockId)
      .then((res) => {
        console.log('RESPONSE', res);
        if (res.result) {
          setFile(res.result);
          setContentHtml(res.result.summaryContent || "");
          // Optional success toast on load
          // toast.success("Loaded summary content");
        }
      })
      .catch((e) => {
        setError("Failed to load file");
        console.error(e);
        toast.error("Failed to load file summary");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          {loading ? "Loading..." : file?.name || ''}
        </h1>

        <div className="flex items-center gap-4">

          {/* Re-generate riêng biệt */}
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            onClick={() => onReGenerate?.('1')}
          >
            Re-generate
          </button>

          {/* Khối Translate */}
          <div className="flex items-center gap-2 bg-gray-300 px-3 py-2 rounded-lg border">
            <select
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              className="px-2 py-1 border rounded-md bg-white"
            >
              <option value="en">English</option>
              <option value="vie">Vietnamese</option>
              <option value="zh">Chinese</option>
            </select>

            <button
              className="px-3 py-1.5 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition disabled:opacity-60"
              disabled={translating || !contentHtml}
              onClick={async () => {
                if (!contentHtml) return;
                try {
                  setTranslating(true);
                  const res = await fileService.translateHtml({
                    content: contentHtml,
                    targetLang: selectedLang,
                  });
                  const nextHtml = res.result || "";
                  const normalize = (s: string) => s.replace(/\s+/g, " ").trim();
                  if (normalize(nextHtml) === normalize(contentHtml)) {
                    toast.info("Same language");
                  } else {
                    setContentHtml(nextHtml);
                    const langLabel = { en: "English", vi: "Vietnamese", zh: "Chinese" } as const;
                    toast.success(`Translated to ${langLabel[selectedLang as keyof typeof langLabel] || selectedLang}`);
                  }
                } catch (e) {
                  console.error(e);
                  setError("Failed to translate content");
                  toast.error("Failed to translate content");
                } finally {
                  setTranslating(false);
                }
              }}
            >
              {translating ? 'Translating...' : 'Translate'}
            </button>
          </div>
        </div>

      </div>

      {/* CONTENT */}
      <div className="prose prose-sm max-w-none">
        {loading && <p>Loading content...</p>}
        {error && !loading && <p className="text-red-600">{error}</p>}
        {!loading && !error && parse(contentHtml || '')}
      </div>

    </div>
  );
}
