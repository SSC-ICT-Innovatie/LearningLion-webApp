import { SetStateAction, useState } from 'react';
import TextElement from '../atoms/TextElement/TextElement.tsx';
// import QuestionBar from '../atoms/question-bar/question-bar.tsx';
import SelectBox from '../molecules/selectbox/selectbox.tsx';
import Modal from '../molecules/modal/modal.tsx';

interface HomePageProps {
  setApiToken: (_token: string) => void;
  setApiUrl: (_url: string) => void;
  specialties: string[];
  setSpecialtyCallback(selectedSpecialty: SetStateAction<string>): void;
  template: JSX.Element;
}

function HomePage({
  setApiToken,
  setApiUrl,
  specialties,
  setSpecialtyCallback,
  template,
}: HomePageProps) {
  const [showModal, setshowModal] = useState(true);
  const [token, setToken] = useState('');
  const [url, setUrl] = useState('');

  return (
    <div>
      {showModal && (
        <Modal
          title="Welkom bij Learning Lion"
          description="Voer je API gegevens in"
          onSubmit={() => {
            setApiToken(token);
            setApiUrl(url);
            setshowModal(false);
          }}>
          <input
            placeholder="Api token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <input
            placeholder="Api URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </Modal>
      )}
      <div className="main">
        <div className="specialty">
          <TextElement type="regular">Specialiteit</TextElement>
          <SelectBox
            options={specialties}
            placeholder="Geen selectie"
            onSubmit={(val: SetStateAction<string>) => setSpecialtyCallback(val)}
          />
        </div>
        {template}
      </div>
    </div>
  );
}

export default HomePage;
