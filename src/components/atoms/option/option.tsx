import { JSX } from 'react';
import { Button } from '../button/Button.tsx';

export interface OptionProps {
  children: string;
  onClick?: () => void;
}

function Option({ children, onClick = () => {} }: OptionProps): JSX.Element {
  return (
    <div className="option">
      <Button onClick={onClick}>{children}</Button>
    </div>
  );
}

Option.defaultProps = {
  onClick: () => {},
};

export default Option;
