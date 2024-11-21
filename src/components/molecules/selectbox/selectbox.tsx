import { useEffect, useState, JSX } from 'react';
import './selectbox.css';
import Option from '../../atoms/option/option.tsx';
import TextElement from '../../atoms/TextElement/TextElement.tsx';

interface SelectBoxProps {
  options: string[];
  placeholder: string;
  onSubmit: (values: string) => void;
}

function SelectBox({ options, placeholder, onSubmit }: SelectBoxProps): JSX.Element {
  const [showOptions, setshowOptions] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');

  useEffect(() => {
    onSubmit(selectedItem);
  }, [onSubmit, selectedItem]);

  const handleClick = () => {
    setshowOptions(!showOptions);
  };
  const renderOptions = () =>
    options.map((option: string) => (
      <Option
        key={option}
        onClick={() => {
          setSelectedItem(option);
        }}>
        {option}
      </Option>
    ));

  return (
    <div
      className="select-box"
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter') handleClick();
      }}
      role="button"
      tabIndex={0}>
      <div className="container">
        <div className="selectedValue">
          <TextElement type="option span">
            {selectedItem !== '' ? selectedItem : placeholder}
          </TextElement>
        </div>
        <div className="gylph">{showOptions ? '▲' : '▼'}</div>
      </div>
      <div className={`options_wrapper ${showOptions ? 'active' : ''}`}>
        {showOptions && <div className="options">{renderOptions()}</div>}
      </div>
    </div>
  );
}

export default SelectBox;
