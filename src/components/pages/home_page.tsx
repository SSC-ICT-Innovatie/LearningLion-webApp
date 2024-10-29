import { useState } from 'react'
import { TextElement } from '../atoms/TextElement/TextElement'
import { QuestionBar } from '../atoms/question-bar/question-bar'
import { SelectBox } from '../molecules/selectbox/selectbox'
import { Modal } from '../molecules/modal/modal'

interface HomePageProps {
  onSubmit: (values: {specialty: string, question: string}) => void,
  setApiToken: (token: string) => void,
  setApiUrl: (url: string) => void
}

export const HomePage = ({onSubmit, setApiToken, setApiUrl}: HomePageProps) => {
  const [specialty, setSpecialty] = useState("None")
  const [showModal, setshowModal] = useState(true)
  return (
    <div>
      {showModal &&
      <Modal 
        title='Welkom bij Learning Lion' 
        description='Voer je API gegevens in'  
        onSubmit={(token, url) => {
          setApiToken(token)
          setApiUrl(url)
          setshowModal(false)
        }
        }/>
      }
      <div className='main'>
        <div className='specialty'>
          <TextElement type='regular'>Specialiteit</TextElement>
          <SelectBox options={["Kamervragen"]} placeholder='Geen selectie' onSubmit={(val) => setSpecialty(val)}/>
        </div>

        <div className='question-section'>
          <TextElement type='mid-heading bold'>Stel je eerste vraag aan Learning Lion</TextElement>
          <QuestionBar onSubmit={(values) => {
              onSubmit(
                {
                  specialty: specialty, 
                  question: values
                })
          }
            }/>
        </div>
      </div>
    </div>
  )
}