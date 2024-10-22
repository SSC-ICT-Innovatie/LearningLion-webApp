import React, { useState } from 'react'
import { TextElement } from '../atoms/TextElement/TextElement'
import { QuestionBar } from '../atoms/question-bar/question-bar'
import { SelectBox } from '../molecules/selectbox/selectbox'

export const HomePage = () => {
  const [specialty, setSpecialty] = useState("None")
  return (
    <div>
      <div className='main'>
        <div className='specialty'>
          <TextElement type='regular'>Specialiteit</TextElement>
          <SelectBox options={["Kamervragen"]} placeholder='Geen selectie' onSubmit={(val) => setSpecialty(val)}/>
        </div>

        <div className='question-section'>
          <TextElement type='mid-heading bold'>Stel je eerste vraag aan Learning Lion</TextElement>
          <QuestionBar onSubmit={(values) => {
            console.log(`PROMPT:${values}`)
            console.log(`SPECIALTY: ${specialty}`)
          }
            }/>
        </div>
      </div>
    </div>
  )
}