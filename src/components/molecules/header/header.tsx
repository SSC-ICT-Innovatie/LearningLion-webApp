import TextElement from '../../atoms/TextElement/TextElement.tsx';
import SelectBox from '../selectbox/selectbox.tsx';
import './header.css';

interface HeaderProps {
  chatPage: boolean;
  specialty?: string;
  setLLMModel: (_model: string) => void;
  models: string[];
}

function Header({ chatPage, specialty, setLLMModel, models }: HeaderProps) {
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
        options={models}
        placeholder="Geen selectie"
        onSubmit={(val: string) => setLLMModel(val)}
      />
    </div>
  );
}

Header.defaultProps = {
  specialty: '',
};

export default Header;
