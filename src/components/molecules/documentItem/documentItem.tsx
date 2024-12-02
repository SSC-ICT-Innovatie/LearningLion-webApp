import { fetchedDocument } from '../../../util/documentFactory.ts';
import TextElement from '../../atoms/TextElement/TextElement.tsx';
import './documentitem.css';
import Checkbox from '../../atoms/Checkbox/Checkbox.tsx';

interface DocumentItemProps {
  document: fetchedDocument;
  onCheck: (id: string) => void;
  onClick: (UUID: string) => void;
  checked: boolean;
}

function DocumentItem({ document, onCheck, onClick, checked }: DocumentItemProps) {
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
        <TextElement type="small gray subtitle">{document.text}</TextElement>
        <TextElement type="medium black content">{document.answer}</TextElement>
      </div>
      <Checkbox
        value={checked}
        onClick={() => onCheck(document.id.toString())}
      />
    </div>
  );
}

export default DocumentItem;
