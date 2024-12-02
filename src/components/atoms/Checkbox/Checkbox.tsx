interface CheckboxProps {
  onClick: () => void;
  value: boolean;
}

function Checkbox({ onClick, value }: CheckboxProps) {
  return (
    <div
      role="checkbox"
      aria-checked={value}
      tabIndex={0}
      onClick={onClick}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
      style={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        gap: '10px',
        marginTop: '10px',
      }}>
      <div
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '4px',
          border: `2px solid ${value ? 'rgb(50,115,30)' : '#ccc'}`,
          backgroundColor: value ? 'rgb(103,173,91)' : 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'all 0.3s ease',
        }}>
        {value && (
          <span
            style={{
              width: '10px',
              height: '10px',
              backgroundColor: 'white',
              borderRadius: '2px',
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Checkbox;
