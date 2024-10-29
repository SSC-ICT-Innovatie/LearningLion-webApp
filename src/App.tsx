import { useState } from 'react'
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
                if(response.error_message !== null || response.sucess === false || response.result === null || response.status === "failed") {
                  console.error("Error:", response.error_message)
                  setAPIcall(false)
                  setMessages(val => val.concat(createChatMessage(`Een fout is opgetreden: ${response.error_message}`, false)))
                  return
                }

                console.log("Response:", response)
                const resultOutput = response.result.output;
                console.log("Result Output:", resultOutput);
                const latestMessage = resultOutput.split('<|im_start|>').pop().split('<|im_end|>')[0].trim();
                console.log("Result Output:", resultOutput);
                console.log("Latest AI Message:", latestMessage);
                const outputText = response.result.output;
                console.log("Result Output:", outputText);
                const messages = outputText.split('<|im_start|>assistant');
                const lastMessage = messages.pop().split('<|im_end|>')[0].trim();
                console.log("Last AI Message:", lastMessage);
                setMessages(val => val.concat(createChatMessage(lastMessage, false)))
                setAPIcall(false)
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
