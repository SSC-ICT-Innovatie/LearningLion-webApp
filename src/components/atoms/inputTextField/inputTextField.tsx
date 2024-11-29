interface InputTextFieldProps {
  label: string;
  id: string;
  onChange: (val: string) => void;
}

function InputTextField({ label, id, onChange }: InputTextFieldProps) {
  return (
    <div className="input-text-field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="text"
        name={label}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
    </div>
  );
}

export default InputTextField;
