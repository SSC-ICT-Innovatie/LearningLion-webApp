import { useEffect, useState } from 'react';
import { fetchedDocument } from '../../../util/documentFactory.ts';
import PdfViewer from '../../atoms/pdfViewer/PdfViewer.tsx';
import DocumentItem from '../../molecules/documentItem/documentItem.tsx';
import './document_check_page.css';
import { Button } from '../../atoms/button/Button.tsx';
import InputTextField from '../../atoms/inputTextField/inputTextField.tsx';
import TextElement from '../../atoms/TextElement/TextElement.tsx';
import Checkbox from '../../atoms/Checkbox/Checkbox.tsx';

interface DocumentCheckPageProps {
  documents: fetchedDocument[];
  apiUrl: string;
  question: string;
  onSubmit: (documents: fetchedDocument[]) => void;
  getNewDocs: (query: string) => void;
}
function DocumentCheckPage({
  documents,
  apiUrl,
  question,
  onSubmit,
  getNewDocs,
}: DocumentCheckPageProps) {
  const [pdfUrl, setPdfUrl] = useState('');
  const [docs, _setDocs] = useState(documents ?? []);
  const [files, setFiles] = useState<{
    [key: string]: { subject: string; docs: fetchedDocument[] };
  }>({});
  const [ApprovedFiles, setApprovedFiles] = useState<fetchedDocument[]>([]);
  const [pdfShown, setPdfShown] = useState(false);
  const [fileSelected, setfileSelected] = useState('');
  const [newQuery, setnewQuery] = useState('');

  const closePdfViewer = () => {
    setPdfShown(false);
    setPdfUrl('');
  };

  useEffect(() => {
    console.log('docs updated');
    const groupedFiles: {
      [key: string]: { subject: string; docs: fetchedDocument[] };
    } = {};
  
    docs.forEach((document) => {
      const { uuid } = document;
  
      if (!groupedFiles[uuid]) {
        groupedFiles[uuid] = { subject: document.subject, docs: [] };
      }
  
      if (!groupedFiles[uuid].docs.some((doc) => doc.uuid === document.uuid && doc.questionNumber === document.questionNumber)) {
        groupedFiles[uuid].docs.push(document);
      }
      console.log('groupedFiles', groupedFiles);
    });
  
    setFiles(groupedFiles);
  }, [docs]);


  const renderDocumentList = (renderDocs: fetchedDocument[]) => {
    // Filter unique documents based on uuid and question_number
    const uniqueDocs: fetchedDocument[] = [];
    const uniqueKeys = new Set<string>();
  
    renderDocs.forEach((doc) => {
      const compositeKey = `${doc.uuid}-${doc.questionNumber || 'null'}`;
      if (!uniqueKeys.has(compositeKey)) {
        uniqueKeys.add(compositeKey);
        uniqueDocs.push(doc);
      }
    });
  
    // Render the unique document list
    return (
      <>
        {uniqueDocs.map((document: fetchedDocument) => (
          <DocumentItem
            key={document.id}
            document={document}
            onClick={() => {}}
            onCheck={() => {
              if (ApprovedFiles.some((doc) => doc.id === document.id)) {
                setApprovedFiles(ApprovedFiles.filter((doc) => doc.id !== document.id));
              } else {
                setApprovedFiles([...ApprovedFiles, document]);
              }
            }}
            checked={ApprovedFiles.some((doc) => doc.id === document.id)}
          />
        ))}
      </>
    );
  };

  const renderSelector = () => {
    if (fileSelected === '' || !files[fileSelected]) {
      return (
        <div className="selector">
          <h2>Selecteer een document</h2>
          <div className="selector__body">
            {Object.keys(files).map((uuid) => (
              <div style={{ display: 'flex' }} key={uuid}>
                <Button
                  onClick={() => {
                    setfileSelected(uuid);
                    setPdfUrl(`${apiUrl}/document?uuid=${uuid}`);
                  }}>
                    <div>
                      <span>{files[uuid]?.subject || uuid}</span>
                      <div className='tags'>
                        {files[uuid]?.docs.map((doc) => (
                            <span key={doc.id} className={ApprovedFiles.some((approvedDoc) => approvedDoc.id === doc.id) ? 'approved' : ''}>
                            {doc.questionNumber ? `Vraag ${doc.questionNumber}` : 'Het hele bestand'}
                            </span>
                        ))}
                      </div>
                    </div>
                </Button>
                <Checkbox
                  onClick={() => {
                    const approvedDocs = docs.filter((doc) => doc.uuid === uuid);
                    setApprovedFiles([...ApprovedFiles, ...approvedDocs]);
                  }}
                  value={ApprovedFiles.some((doc) => doc.uuid === uuid)}
                />
              </div>
            ))}
          </div>
        </div>
      );
    }
  
    const fileGroup = files[fileSelected];
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
          <TextElement type="mid-heading bold">{fileGroup.subject}</TextElement>
          {renderDocumentList(fileGroup.docs)}
        </div>
      </div>
    );
  };

  return (
    <div className="documentsCheckPage">
      <h1>Controle</h1>
      <p>Omdat LearningLion niet zeker weet ofdat dit echt de juiste relevante documenten zijn moet jij ze controleren</p>
      <div className='row'>

      <p>Je vraag: {question}</p>
      <Button
        purpose="sucess"
        onClick={() => {
          onSubmit(docs);
        }}>
        <span>Versturen</span>
      </Button>
      </div>
      <div className='row'>

      <InputTextField
        label="Vraag meer document op"
        id="document"
        onChange={(val) => {
          setnewQuery(val);
        }}
        value={newQuery}
      />

      <Button
        purpose="sucess"
        onClick={() => {
          getNewDocs(newQuery);
          setnewQuery('');
        }}>
        <span>zoek</span>
      </Button>
      </div>
      <div className="documentsCheckPage__body">
        <TextElement type="small gray subtitle">{docs.length.toString()} documenten</TextElement>
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
