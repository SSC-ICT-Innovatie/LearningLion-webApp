import {Button} from "../../atoms/button/Button"
import { fetchedDocument } from "../../../util/documentFactory"
import { TextElement } from "../../atoms/TextElement/TextElement"
import './documentitem.css'

interface DocumentItemProps {
    document: fetchedDocument,
    onDelete: (uuid: number) => void
    onClick: (UUID: string) => void
}

export const DocumentItem = ({ document, onDelete, onClick }: DocumentItemProps) => {
    return (
        <div className="documentItem">
            <div className="documentitem__body" onClick={() => onClick(document.uuid)}>
                <TextElement type={"small gray subtitle"}>{document.subject}</TextElement>
                <TextElement type={"medium black content"}>{document.text}</TextElement>
            </div>
            <Button purpose="delete" onClick={() => onDelete(document.id)}><span>X</span></Button>
        </div>
    )
}