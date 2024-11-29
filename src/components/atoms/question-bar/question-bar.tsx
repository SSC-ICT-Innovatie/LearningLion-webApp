import { useState } from 'react';
import './question-bar.css';
import sendIcon from '../../../assets/send-black.svg';

interface QuestionBarProps {
  onSubmit: (values: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

function QuestionBar({ onSubmit, disabled, placeholder }: QuestionBarProps) {
  const [question, setquestion] = useState('');

  const handleSubmit = () => {
    if (question === '') return;
    if (disabled) return;
    onSubmit(question);
    setquestion('');
  };

  return (
    <div className={`question-bar ${disabled && 'disabled'}`}>
      <input
        type="text"
        placeholder={placeholder ?? 'Schrijf hier je vraag'}
        value={question}
        onChange={(val) => setquestion(val.target.value)}
        disabled={disabled}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSubmit();
        }}
      />
      <button
        type="button"
        aria-label="verstuur vraag"
        onClick={handleSubmit}
        disabled={disabled}
        style={{
          background: `url(${sendIcon}) no-repeat center center`,
          backgroundSize: 'contain',
          border: 'none',
          width: '24px',
          height: '24px',
          cursor: 'pointer',
        }}
      />
    </div>
  );
}

QuestionBar.defaultProps = {
  disabled: false,
  placeholder: 'Schrijf hier je vraag',
};

export default QuestionBar;
