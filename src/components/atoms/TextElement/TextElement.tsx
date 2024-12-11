import './TextElement.css';

interface TextProps {
  type: string;
  children: string[] | string;
  onClick?: () => void;
  link?: string;
}

function TextElement({ type, children, onClick, link }: TextProps) {
  let presentableText = '';
  if (children instanceof Array) {
    presentableText = children.join(' ');
  }
  if (typeof children === 'string') {
    presentableText = children;
  } else {
    presentableText = `${children}`;
  }
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
        {presentableText}
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
          {presentableText}
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
      {presentableText.split('\\n').map((line) => (
        <p key={line}>{line}</p>
      ))}
    </div>
  );
}

TextElement.defaultProps = {
  onClick: () => {},
  link: '',
};

export default TextElement;
