import { useState } from 'react'
import './question-bar.css'
import sendIcon from '../../../assets/send-black.svg'

interface QuestionBarProps {
  onSubmit: (values: string) => void
  disabled?: boolean
}

export const QuestionBar = ({onSubmit, disabled}:QuestionBarProps) => {
  const [question, setquestion] = useState("")
  return (
    <div className={`question-bar ${disabled && "disabled"}`}>
      <input type="text" placeholder='Schrijf hier je vraag' value={question} onChange={(val) => setquestion(val.target.value)} disabled={disabled}/>
      <img src={sendIcon} alt='verstuur icoon' onClick={()=>{
        if(question === "") return
        if(disabled) return
        onSubmit(question)
        setquestion("")
      }}/>
    </div>
  )
}