import './TextElement.css';

interface TextProps {
  type: string;
  children: string;
  onClick?: () => void;
  link?: string;
}

function TextElement({ type, children, onClick, link }: TextProps) {
  if (type.includes('span')) {
    return (
      <span
        className={type}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (onClick) {
              onClick();
            }
          }
        }}>
        {children}
      </span>
    );
  }
  if (type.includes('link')) {
    return (
      <button
        type="button"
        className={type}
        onClick={onClick}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
        }}>
        <a
          href={link}
          target="_blank"
          rel="noreferrer">
          {children}
        </a>
      </button>
    );
  }
  return (
    <div
      className={type}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (onClick) {
            onClick();
          }
        }
      }}>
      <p>{children}</p>
    </div>
  );
}

TextElement.defaultProps = {
  onClick: () => {},
  link: '',
};

export default TextElement;
