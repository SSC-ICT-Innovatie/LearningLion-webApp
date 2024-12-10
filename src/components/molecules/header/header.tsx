import TextElement from '../../atoms/TextElement/TextElement.tsx';
import SelectBox from '../selectbox/selectbox.tsx';
import './header.css';

interface HeaderProps {
  chatPage: boolean;
  specialty?: string;
  setDataScope: (scope: string) => void;
  datascope: string[];
}

function Header({ chatPage, specialty, setDataScope, datascope }: HeaderProps) {
  return (
    <div className="header">
      {chatPage && (
        <TextElement type="mid-heading bold">{`Learning Lion${!specialty ? '' : `- ${specialty}`}`}</TextElement>
      )}
      {!chatPage && (
        <>
          <TextElement type="heading bold">Learning Lion</TextElement>
          <TextElement
            type="info italic gray"
            onClick={() => window.open('https://learninglion.nl', '_self')}>
            i
          </TextElement>
        </>
      )}
      <SelectBox
        options={datascope}
        placeholder="Geen selectie"
        onSubmit={(val: string) => setDataScope(val)}
      />
    </div>
  );
}

Header.defaultProps = {
  specialty: '',
};

export default Header;
