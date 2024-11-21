import Button from '../../atoms/button/Button.tsx';
import { fetchedDocument } from '../../../util/documentFactory.ts';
import TextElement from '../../atoms/TextElement/TextElement.tsx';
import './documentitem.css';

interface DocumentItemProps {
  document: fetchedDocument;
  onDelete: (uuid: number) => void;
  onClick: (UUID: string) => void;
}

function DocumentItem({ document, onDelete, onClick }: DocumentItemProps) {
  return (
    <div className="documentItem">
      <div
        className="documentitem__body"
        role="button"
        tabIndex={0}
        onClick={() => onClick(document.uuid)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onClick(document.uuid);
          }
        }}>
        <TextElement type="small gray subtitle">{document.subject}</TextElement>
        <TextElement type="medium black content">{document.text}</TextElement>
      </div>
      <Button
        purpose="delete"
        onClick={() => onDelete(document.id)}>
        <span>X</span>
      </Button>
    </div>
  );
}

export default DocumentItem;
