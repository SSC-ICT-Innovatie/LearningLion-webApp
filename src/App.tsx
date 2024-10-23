import React, { useState } from 'react'
import { Header } from './components/molecules/header/header'
import { HomePage } from './components/pages/home_page'
import './App.css'
import { ChatPage } from './components/pages/chat_page'
import { createChatMessage } from './util/chatMessageFactory'

export interface chatMessage {
  fromUser: boolean
  message: string
  username: string,
  sources?: string[]
}

function App() {
  const [specialty, setspecialty] = useState("")
  const [initalized, setInitalized] = useState(false)
  const [APIcall, setAPIcall] = useState(false)
  const [messages, setMessages] = useState<chatMessage[]>([
    createChatMessage("Hoeveel P’s zijn er in appel?", true),
    createChatMessage(`Er zijn geen 'p's in het woord "appel", het is een 'a'.`, false),
    createChatMessage("Is er informatie beschikbaar over de toepassing van AI binnen de overheid?", true),
    createChatMessage("Op basis van de beschikbare documenten kan er geen specifiek antwoord worden gegeven op de gestelde vragen, maar ze geven wel aan dat er plannen zijn om betaalbare woningen te bouwen, het aantal bouwvergunningen te verhogen en ruimtelijke ordeningsprocedures te versnellen.", false, ["https://www.rijksoverheid.nl/onderwerpen/ruimtelijke-ordening-en-bouwen/bouwregelgeving"]),
  ])

  return (
    <>
      <div className='wrapper'>
        <Header chatPage={initalized} specialty={specialty}/>
        {!initalized && <HomePage onSubmit={(values) => {
          setspecialty(values.specialty)
          setInitalized(true)
          console.log({specialty: values.specialty, question: values.question})

        }}/>}
        {initalized &&
          <ChatPage messages={messages} disabled={APIcall} newMessage={
            (message) => {
                setMessages(val => val.concat({fromUser:true, username:"Jij",message:message}
              ))
              setAPIcall(true)
            }
            }/>
        }
      </div>
    </>
  )
}

export default App
