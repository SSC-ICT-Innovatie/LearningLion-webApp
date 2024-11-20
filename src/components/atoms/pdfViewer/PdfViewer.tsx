import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Set the workerSrc to a CDN-hosted version to avoid file resolution issues
pdfjs.GlobalWorkerOptions.workerSrc = `./pdf.worker.mjs`;

interface PdfViewerProps {
  url: string
  onLoaded?: () => void
}

export const PdfViewer = ({ url, onLoaded }: PdfViewerProps) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [scale] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    console.log("Document loaded successfully");
    if(onLoaded) {
      onLoaded();
    }
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