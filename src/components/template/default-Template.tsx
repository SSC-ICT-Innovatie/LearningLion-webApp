import QuestionBar from '../atoms/question-bar/question-bar.tsx';
import TextElement from '../atoms/TextElement/TextElement.tsx';

interface defaultTemplateProps {
  onSubmit: (_values: { question: string }) => void;
}

const defaultTemplate = ({ onSubmit }: defaultTemplateProps) => (
  <div className="question-section">
    <TextElement type="mid-heading bold">Stel je eerste vraag aan Learning Lion</TextElement>
    <QuestionBar
      onSubmit={(values: string) => {
        onSubmit({
          question: values,
        });
      }}
    />
  </div>
);

export default defaultTemplate;
