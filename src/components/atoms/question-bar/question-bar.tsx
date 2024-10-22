import React, { useState } from 'react'
import './question-bar.css'
import sendIcon from '../../../assets/send-black.svg'

interface QuestionBarProps {
  onSubmit: (values: string) => void
}

export const QuestionBar = ({onSubmit}:QuestionBarProps) => {
  const [question, setquestion] = useState("")
  return (
    <div className="question-bar">
      <input type="text" placeholder='Schrijf hier je vraag' onChange={(val) => setquestion(val.target.value)}/>
      <img src={sendIcon} alt='verstuur icoon' onClick={()=>{
        onSubmit(question)
      }}/>
    </div>
  )
}