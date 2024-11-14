import { useState } from "react"
import { fetchedDocument } from "../../../util/documentFactory"
import { PdfViewer } from "../../atoms/pdfViewer/PdfViewer"
import { DocumentItem } from "../../molecules/documentItem/documentItem"
import './document_check_page.css'
interface DocumentCheckPageProps {
    documents: fetchedDocument[]
    apiUrl: string
    onSubmit: (documents: fetchedDocument[]) => void
}

export const DocumentCheckPage = ({documents, apiUrl, onSubmit}: DocumentCheckPageProps) => {
    const [pdfUrl, setPdfUrl] = useState('')
    const [docs, setDocs] = useState(documents ?? [])
    return (
        <div className="documentsCheckPage">
            <h1>DocumentCheckPage</h1>
            <button onClick={() => {
                onSubmit(docs)
            }}>Versturen</button>
            <div className="documentsCheckPage__body">
            <div className="documentsWrapper">
                {docs.map((document, index) => {
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
                            // setDocs(docs.filter((doc) => doc.uuid !== uuid))
                        }}
                    />
                })}
            </div>
            <div className="documentViewer">
                <h2>Document Viewer</h2>
                <div className="documentViewerWrapper">
                    <PdfViewer url={pdfUrl}/>
                    </div>
                </div>
                </div>
        </div>
    )
}