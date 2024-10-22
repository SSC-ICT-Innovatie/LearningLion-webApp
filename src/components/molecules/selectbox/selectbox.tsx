import React, { useEffect, useState } from 'react'
import './selectbox.css'
import { Option } from '../../atoms/option/option'
import { TextElement } from '../../atoms/TextElement/TextElement'

interface SelectBoxProps {
  options: string[]
  placeholder: string
  onSubmit: (values: string) => void
}

export const SelectBox = ({ options, placeholder,onSubmit }: SelectBoxProps): JSX.Element => {
  const [showOptions, setshowOptions] = useState(false)
  const [selectedItem, setSelectedItem] = useState("")

  useEffect(() => {
    onSubmit(selectedItem)
  }, [onSubmit, selectedItem])
  

  const handleClick = () => {
    console.log("Click")
    setshowOptions(!showOptions)
  }
  const renderOptions = () => {
    return options.map((option: string, index: React.Key | null | undefined) => {
      return <Option key={index} onClick={() => { setSelectedItem(option) }}>{option}</Option>
    })
  }

  return (
    <div className="select-box" onClick={handleClick}>
      <div className="container">
        <div className="selectedValue">
          <TextElement type='option span'>{selectedItem != "" ? selectedItem : placeholder}</TextElement>
        </div>
        <div className="gylph">
          {showOptions ? "▲" : "▼"}
        </div>
      </div>
      <div className={"options_wrapper " + (showOptions ? "active" : "")}>
        {showOptions &&
          <div className="options">
            {renderOptions()}

          </div>
        }
      </div>
    </div>
  )
}