import { useEffect, useState } from "react"
import { fetchedDocument } from "../../../util/documentFactory"
import { PdfViewer } from "../../atoms/pdfViewer/PdfViewer"
import { DocumentItem } from "../../molecules/documentItem/documentItem"
import './document_check_page.css'
import { Button } from "../../atoms/button/Button"
interface DocumentCheckPageProps {
    documents: fetchedDocument[]
    apiUrl: string
    onSubmit: (documents: fetchedDocument[]) => void
}

export const DocumentCheckPage = ({documents, apiUrl, onSubmit}: DocumentCheckPageProps) => {
    const [pdfUrl, setPdfUrl] = useState('')
    const [docs, setDocs] = useState(documents ?? [])
    const [files, setFiles] = useState<{ [key: string]: {'subject': string , 'docs':fetchedDocument[]} }>({})
    const [pdfShown, setPdfShown] = useState(false)
    const [fileSelected, setfileSelected] = useState("")

    const closePdfViewer = () => {
        setPdfShown(false);
        setPdfUrl('');
    };

    useEffect(() => {
        console.log('Documents:', docs);
        const files: { [key: string]: {'subject': string , 'docs':fetchedDocument[]} } = {};
    
        // Group files by UUID
        docs.forEach(document => {
            const { uuid } = document; // Extract UUID and other data
    
            if (!files[uuid]) {
                files[uuid] = { subject: '', docs: [] }; // Initialize an object with subject and docs
            }
            files[uuid]["subject"] = document.subject; // Add the subject to the UUID group
            files[uuid]["docs"].push(document); // Add the document (without UUID) to the UUID group
        });
    
        console.log('Grouped Files by UUID:', files);
        setFiles(files);
    }, [docs]);

    const renderSelector = () => {
        if(fileSelected === "") {
            return (
                <div className="selector">
                    <h2>Selecteer een document</h2>
                    <div className="selector__body">
                        {Object.keys(files).map((uuid, index) => {
                            console.log('UUID:', uuid);
                            return <Button key={index} onClick={() => {
                                setfileSelected(uuid)
                            }}><span>{files[uuid]?.subject || uuid}</span></Button>
                        })}
                    </div>
                </div>
            )
        }
        else{
            return (
                <div className="selector">
                    <Button onClick={() => {
                        setfileSelected("")
                    }}><span>Ga terug</span></Button>
                    <div className="selector__body">
                {files[fileSelected]['docs'].map((document, index) => {
                    return <DocumentItem
                        key={index}
                        document={document}
                        onClick={(uuid) => {
                            console.log('Open document with uuid:', uuid)
                            setPdfUrl(apiUrl + '/document?uuid=' + uuid)
                        }}
                        onDelete={(id) => {
                            console.log('Delete chunk with id:', id)
                            setDocs(docs.filter((doc) => doc.id !== id))
                            console.log(files[fileSelected]['docs'].length)
                            if(files[fileSelected]['docs'].length === 1) {
                                setfileSelected("")
                            }
                        }}
                        
                    />
                    
                })}
                </div>
                </div>
            )
        }
    }

    return (
        <div className="documentsCheckPage">
            <h1>DocumentCheckPage</h1>
            <Button purpose="sucess" onClick={() => {
                onSubmit(docs)
            }}><span>Versturen</span></Button>
            <div className="documentsCheckPage__body">
            <div className="documentsWrapper">
                {/* {docs.map((document, index) => {
                    return <DocumentItem
                        key={index}
                        document={document}
                        onClick={(uuid) => {
                            console.log('Open document with uuid:', uuid)
                            setPdfUrl(apiUrl + '/document?uuid=' + uuid)
                        }}
                        onDelete={(id) => {
                            console.log('Delete chunk with id:', id)
                            setDocs(docs.filter((doc) => doc.id !== id))
                        }}
                    />
                })} */}
                {renderSelector()}
            </div>
                <div className="documentViewerWrapper">
                    <div className={`documentViewer ${ pdfShown ? 'show' : ''}`}>
                        <Button className="closePdfButton wide" onClick={closePdfViewer} style={{ position: 'sticky', top: '15px', left: '15px', zIndex:5}}><span>Sluiten</span></Button>
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
    )
}