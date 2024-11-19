import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Set the workerSrc to a CDN-hosted version to avoid file resolution issues
pdfjs.GlobalWorkerOptions.workerSrc = `./pdf.worker.mjs`;

interface PdfViewerProps {
  url: string
}

export const PdfViewer = ({ url }: PdfViewerProps) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [scale] = useState(1.0);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div style={{ flex: 1, borderLeft: '1px solid #ccc' }}>
      <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
        {/* Render all pages by mapping through each page number */}
        {Array.from(new Array(numPages), (_, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} scale={scale} />
        ))}
      </Document>
    </div>
  );
};