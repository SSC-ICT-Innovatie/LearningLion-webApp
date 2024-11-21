import './button.css';
import React from 'react';

interface ButtonProps {
  onClick: () => void;
  style?: React.CSSProperties;
  purpose?:
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'warning'
    | 'info'
    | 'delete'
    | 'edit'
    | 'add'
    | 'cancel'
    | 'sucess';
  children?: React.ReactNode;
  className?: string;
}

export function Button({ onClick, style, purpose, children, className }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      style={style}
      className={`${purpose || 'general'} button ${className}`}
      type="button">
      {children}
    </button>
  );
}

Button.defaultProps = {
  style: {},
  purpose: 'general',
  children: '',
  className: '',
};

export default Button;
