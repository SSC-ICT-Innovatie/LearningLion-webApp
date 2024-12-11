import TextElement from '../../atoms/TextElement/TextElement.tsx';
import SelectBox from '../selectbox/selectbox.tsx';
import './header.css';

interface HeaderProps {
  chatPage: boolean;
  specialty?: string;
  setDataScope: (scope: string) => void;
  datascope?: string[];
  selectedDatascope: string;
}

function Header({ chatPage, specialty, setDataScope, datascope, selectedDatascope }: HeaderProps) {
  return (
    <div className="header">
      <div className="title">
        <TextElement type="mid-heading bold">{`Learning Lion${!specialty ? '' : `- ${specialty}`}`}</TextElement>
        <TextElement
          type="info italic gray"
          onClick={() => window.open('https://learninglion.nl', '_self')}>
          i
        </TextElement>
      </div>
      <div className="scope">
        {chatPage ? (
          <TextElement type="mid-heading bold">{selectedDatascope}</TextElement>
        ) : (
          <SelectBox
            options={datascope || []}
            placeholder="Geen selectie"
            onSubmit={(val: string) => setDataScope(val)}
          />
        )}
      </div>
    </div>
  );
}

Header.defaultProps = {
  specialty: '',
  datascope: [],
};

export default Header;
