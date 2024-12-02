interface InputTextFieldProps {
  label: string;
  id: string;
  onChange: (val: string) => void;
}

function InputTextField({ label, id, onChange }: InputTextFieldProps) {
  return (
    <div className="input-text-field" style={{
      padding: "10px",
      borderRadius: "5px",

    }}>
      <label htmlFor={id}>{label}</label>
      <input
        style={{
          padding: "10px",
          borderRadius: "5px",
          width: "100%",
          border: "1px solid #ccc",
          marginTop: "10px",
          backgroundColor: "#f9f9f9",
        }}
        id={id}
        type="text"
        name={label}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
    </div>
  );
}

export default InputTextField;
