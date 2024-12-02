interface SubmitButtonProps {
  onClick: () => void;
  text: string;
}

function SubmitButton({ onClick, text }: SubmitButtonProps) {
  return (
    <button
      style={{
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        marginTop: '10px',
        backgroundColor: 'rgb(103,173,91)',
        color: 'white',
        fontSize: '1.1rem',
      }}
      type="button"
      className="submit-button"
      onClick={() => onClick()}>
      {text}
    </button>
  );
}

export default SubmitButton;
