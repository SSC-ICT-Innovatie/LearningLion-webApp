import { SetStateAction, useState } from 'react';
import TextElement from '../atoms/TextElement/TextElement.tsx';
import QuestionBar from '../atoms/question-bar/question-bar.tsx';
import SelectBox from '../molecules/selectbox/selectbox.tsx';
import Modal from '../molecules/modal/modal.tsx';

interface HomePageProps {
  onSubmit: (_values: { specialty: string; question: string }) => void;
  setApiToken: (_token: string) => void;
  setApiUrl: (_url: string) => void;
}

function HomePage({ onSubmit, setApiToken, setApiUrl }: HomePageProps) {
  const [specialty, setSpecialty] = useState('None');
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
            options={['Kamervragen']}
            placeholder="Geen selectie"
            onSubmit={(val: SetStateAction<string>) => setSpecialty(val)}
          />
        </div>

        <div className="question-section">
          <TextElement type="mid-heading bold">Stel je eerste vraag aan Learning Lion</TextElement>
          <QuestionBar
            onSubmit={(values: string) => {
              onSubmit({
                specialty,
                question: values,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
