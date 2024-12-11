import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Set the workerSrc to a CDN-hosted version to avoid file resolution issues
pdfjs.GlobalWorkerOptions.workerSrc = './pdf.worker.mjs';

interface PdfViewerProps {
  url: string;
  onLoaded?: () => void;
}

function PdfViewer({ url, onLoaded }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [scale] = useState(1);
  const [pdfData, setPdfData] = useState<Blob | null>(null);

  useEffect(() => {
    // Fetch the PDF with custom headers
    fetch(url, {
      headers: {
        'ngrok-skip-browser-warning': 'Any value',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch PDF');
        }
        return response.blob(); // Convert to blob
      })
      .then((blob) => {
        setPdfData(blob); // Set blob data for the Document component
      });
  }, [url]);

  const onDocumentLoadSuccess = ({ numPages: loadedNumPages }: { numPages: number }) => {
    if (onLoaded) {
      onLoaded();
    }
    setNumPages(loadedNumPages);
  };
  const renderErrorpdf = () => (
    <div>
      <p>Er is iets fout gegaan bij het laden van de pdf.</p>
      <p>Probeer het later opnieuw.</p>
    </div>
  );

  const renderLoadingpdf = () => (
    <div>
      <p>De pdf is aan het laden.</p>
    </div>
  );
  const renderNopdf = () => (
    <div>
      <p>Er is geen pdf geselecteerd.</p>
    </div>
  );
  return (
    <div style={{ flex: 1 }}>
      {pdfData === null || pdfData.type !== 'application/pdf' ? null : (
        <Document
          className="custom-pdf-document"
          file={pdfData}
          onLoadSuccess={onDocumentLoadSuccess}
          error={renderErrorpdf}
          loading={renderLoadingpdf}
          noData={renderNopdf}>
          {/* Render all pages by mapping through each page number */}
          {Array.from(new Array(numPages), (_, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              scale={scale}
            />
          ))}
        </Document>
      )}
    </div>
  );
}

PdfViewer.defaultProps = {
  onLoaded: () => {},
};

export default PdfViewer;
