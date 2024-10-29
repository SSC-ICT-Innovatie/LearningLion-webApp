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
  const [messages, setMessages] = useState<chatMessage[]>([])
  const [apiToken, setapiToken] = useState("")
  const [apiUrl, setApiUrl] = useState("")


  async function postRequest(url = "", data = "", headers = {}) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        ...headers,
        Authorization: apiToken,
      },
      body: data,
    });
    return response.json();
  }

  return (
    <>
      <div className='wrapper'>
        <Header chatPage={initalized} specialty={specialty}/>
        {!initalized && <HomePage onSubmit={(values) => {
          setspecialty(values.specialty)
          setInitalized(true)
          setapiToken(values.apiToken)
          setApiUrl(values.apiUrl)
          console.log({specialty: values.specialty, question: values.question})
          setMessages(val => val.concat(createChatMessage(values.question, true)))
        }}/>}
        {initalized &&
          <ChatPage messages={messages} disabled={APIcall} newMessage={
            (message) => {
              setAPIcall(true)
                setMessages(val => val.concat({fromUser:true, username:"Jij",message:message}
              ))
              const data = JSON.stringify({
                chatlog: messages,
                prompt: message
              })
                  
              // Using the postRequest function
              postRequest(
                apiUrl, data, {"Content-Type": "application/json"}
              ).then((response) => {
                console.log("Response:", response)
                setMessages(val => val.concat(createChatMessage(response.response, false)))
              })
              .catch((error) => console.error("Error:", error))
            }
            }/>
        }
      </div>
    </>
  )
}

export default App