import { useState } from 'react';
import InputTextField from '../atoms/inputTextField/inputTextField.tsx';
import TextElement from '../atoms/TextElement/TextElement.tsx';
import SubmitButton from '../atoms/SubmitButton/SubmitButton.tsx';

interface KamervragenTemplateProps {
  onSubmit: (_values: {
    inleiding: string;
    vragen: string;
    departmentSentiment: string;
    news: string;
  }) => void;
}

function KamervragenTemplate({ onSubmit }: KamervragenTemplateProps) {
  const [inleiding, setInleiding] = useState('');
  const [vragen, setVragen] = useState('');
  const [departmentSentiment, setDepartmentSentiment] = useState('');
  const [news, setNews] = useState('');
  return (
    <div className="question-section">
      <TextElement type="mid-heading bold">Stel de kamervragen aan Learning Lion</TextElement>
      <InputTextField
        label="inleiding kamervraag"
        id="inleiding"
        onChange={(val) => {
          setInleiding(val);
        }}
      />
      <InputTextField
        label="vragen"
        id="vraag"
        onChange={(val) => {
          setVragen(val);
        }}
      />
      <InputTextField
        label="departement sentiment"
        id="departmentSentiment"
        onChange={(val) => {
          setDepartmentSentiment(val);
        }}
      />
      <InputTextField
        label="Relevante nieuws feiten"
        id="news"
        onChange={(val) => {
          setNews(val);
        }}
      />

      <SubmitButton
        text="Versturen"
        onClick={() => onSubmit({ inleiding, vragen, departmentSentiment, news })}
      />
    </div>
  );
}

export default KamervragenTemplate;
