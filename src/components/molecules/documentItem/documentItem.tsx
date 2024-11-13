import { fetchedDocument } from "../../../util/documentFactory"
import './documentItem.css'

interface DocumentItemProps {
    document: fetchedDocument,
    key: number,
    onDelete: (uuid: string) => void
    onClick: (UUID: string) => void
}

export const DocumentItem = ({ document, key, onDelete, onClick }: DocumentItemProps) => {
    return (
        <div className="documentItem" key={key}>
            <p onClick={() => onClick(document.uuid)}>{document.subject}</p>
            <button onClick={() => onDelete(document.uuid)}>X</button>
        </div>
    )
}