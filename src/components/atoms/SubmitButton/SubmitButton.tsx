interface SubmitButtonProps {
  onClick: () => void;
  text: string;
}

function SubmitButton({ onClick, text }: SubmitButtonProps) {
  return (
    <button
      type="button"
      className="submit-button"
      onClick={() => onClick()}>
      {text}
    </button>
  );
}

export default SubmitButton;
