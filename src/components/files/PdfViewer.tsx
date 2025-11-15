import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button } from '@/components/ui/button';

// Configure worker - fallback to CDN. If you prefer local worker, update path accordingly.
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PdfViewerProps {
  url: string;
}

export function PdfViewer({ url }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button size="sm" variant="outline" onClick={() => setPageNumber((p) => Math.max(1, p - 1))}>
          Prev
        </Button>
        <div className="text-sm">Page {pageNumber} / {numPages || '–'}</div>
        <Button size="sm" variant="outline" onClick={() => setPageNumber((p) => Math.min(numPages || p, p + 1))}>
          Next
        </Button>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={() => setScale((s) => Math.max(0.5, s - 0.25))}>-</Button>
          <div className="text-sm">{Math.round(scale * 100)}%</div>
          <Button size="sm" variant="outline" onClick={() => setScale((s) => Math.min(3, s + 0.25))}>+</Button>
        </div>
      </div>

      <div className="border bg-white">
        <Document file={url} onLoadSuccess={onDocumentLoadSuccess} loading={<div className="p-6">Loading PDF…</div>}>
          <Page pageNumber={pageNumber} scale={scale} />
        </Document>
      </div>
    </div>
  );
}

export default PdfViewer;
