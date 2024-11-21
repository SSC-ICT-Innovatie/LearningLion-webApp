import { useEffect, useState } from 'react';
import { fetchedDocument } from '../../../util/documentFactory.ts';
import PdfViewer from '../../atoms/pdfViewer/PdfViewer.tsx';
import DocumentItem from '../../molecules/documentItem/documentItem.tsx';
import './document_check_page.css';
import { Button } from '../../atoms/button/Button.tsx';

interface DocumentCheckPageProps {
  documents: fetchedDocument[];
  apiUrl: string;
  onSubmit: (documents: fetchedDocument[]) => void;
}
function DocumentCheckPage({ documents, apiUrl, onSubmit }: DocumentCheckPageProps) {
  const [pdfUrl, setPdfUrl] = useState('');
  const [docs, setDocs] = useState(documents ?? []);
  const [files, setFiles] = useState<{
    [key: string]: { subject: string; docs: fetchedDocument[] };
  }>({});
  const [pdfShown, setPdfShown] = useState(false);
  const [fileSelected, setfileSelected] = useState('');

  const closePdfViewer = () => {
    setPdfShown(false);
    setPdfUrl('');
  };

  useEffect(() => {
    const groupedFiles: {
      [key: string]: { subject: string; docs: fetchedDocument[] };
    } = {};

    // Group files by UUID
    docs.forEach((document) => {
      const { uuid } = document; // Extract UUID and other data

      if (!groupedFiles[uuid]) {
        groupedFiles[uuid] = { subject: '', docs: [] }; // Initialize an object with subject and docs
      }
      groupedFiles[uuid].subject = document.subject; // Add the subject to the UUID group
      groupedFiles[uuid].docs.push(document); // Add the document (without UUID) to the UUID group
    });
    setFiles(groupedFiles);
  }, [docs]);

  const renderSelector = () => {
    if (fileSelected === '') {
      return (
        <div className="selector">
          <h2>Selecteer een document</h2>
          <div className="selector__body">
            {Object.keys(files).map((uuid, _index) => (
              <div
                style={{ display: 'flex' }}
                key={uuid}>
                <Button
                  onClick={() => {
                    setfileSelected(uuid);
                    setPdfUrl(`${apiUrl}/document?uuid=${uuid}`);
                  }}>
                  <span>{files[uuid]?.subject || uuid}</span>
                </Button>
                {/* delete button */}
                <Button
                  onClick={() => {
                    setDocs(docs.filter((doc) => doc.uuid !== uuid));
                  }}
                  purpose="delete">
                  <span>X</span>
                </Button>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return (
      <div className="selector">
        <Button
          onClick={() => {
            setfileSelected('');
            setPdfUrl('');
          }}>
          <span>Ga terug</span>
        </Button>
        <div className="selector__body">
          {files[fileSelected].docs.map((document) => (
            <DocumentItem
              key={document.id}
              document={document}
              onClick={() => {}}
              onDelete={(id: number) => {
                setDocs(docs.filter((doc) => doc.id !== id));
                if (files[fileSelected].docs.length === 1) {
                  setfileSelected('');
                  setPdfUrl('');
                }
              }}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="documentsCheckPage">
      <h1>DocumentCheckPage</h1>
      <Button
        purpose="sucess"
        onClick={() => {
          onSubmit(docs);
        }}>
        <span>Versturen</span>
      </Button>
      <div className="documentsCheckPage__body">
        <div className="documentsWrapper">{renderSelector()}</div>
        <div className="documentViewerWrapper">
          <div className={`documentViewer ${pdfShown ? 'show' : ''}`}>
            <Button
              className="closePdfButton wide"
              onClick={closePdfViewer}
              style={{
                position: 'sticky',
                top: '15px',
                left: '15px',
                zIndex: 5,
              }}>
              <span>Sluiten</span>
            </Button>
            <PdfViewer
              url={pdfUrl}
              onLoaded={() => {
                setPdfShown(true);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocumentCheckPage;
