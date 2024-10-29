import { useState } from 'react'
import { TextElement } from '../atoms/TextElement/TextElement'
import { QuestionBar } from '../atoms/question-bar/question-bar'
import { SelectBox } from '../molecules/selectbox/selectbox'
import { Modal } from '../molecules/modal/modal'

interface HomePageProps {
  onSubmit: (values: {specialty: string, question: string, apiToken: string, apiUrl: string}) => void
}

export const HomePage = ({onSubmit}: HomePageProps) => {
  const [specialty, setSpecialty] = useState("None")
  const [showModal, setshowModal] = useState(true)
  const [apiToken, setApiToken] = useState("")
  const [apiUrl, setApiUrl] = useState("")
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
                  question: values,
                  apiToken: apiToken,
                  apiUrl: apiUrl
                })
          }
            }/>
        </div>
      </div>
    </div>
  )
}