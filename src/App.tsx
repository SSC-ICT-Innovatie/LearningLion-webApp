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

  const emptyChat = () => {
    setMessages([])
  }

  const handleMessage = (message:string) => {
    if(message === "") {
      return
    }
    if(apiToken === "" || apiUrl === "") {
      return
    }
    setAPIcall(true)
      setMessages(val => val.concat(
        createChatMessage(message, true)
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
      const lastMessage = messages.pop().split('<|im_end|>')[0].split(']]')[0].trim();
      console.log("Last AI Message:", lastMessage);
      
      const sourcesText = response.result.sources;
      console.log("Sources Text:", sourcesText);
      const sourceItems = Array.from(sourcesText.matchAll(/UUID:([^ ]+).*?page_number:(\d+)/g));
      const sourcesArray = sourceItems.map((match) => {
        const matchArray = match as RegExpMatchArray;
        return {
          UUID: matchArray[1],
          page: matchArray[2]
        };
      });
      const formattedSources = sourcesArray.map(
        item => `Document UUID: ${item.UUID}, pagina: ${item.page}`
      );
      console.log("Formatted Sources:", formattedSources); 
      setMessages(val => val.concat(createChatMessage(lastMessage, false, formattedSources)))
      setAPIcall(false)
    })
    .catch((error) => console.error("Error:", error))
  }

  return (
    <>
      <div className='wrapper'>
        <Header chatPage={initalized} specialty={specialty}/>
        {!initalized && <HomePage onSubmit={(values) => {
          setspecialty(values.specialty)
          setInitalized(true)
          console.log({specialty: values.specialty,question: values.question})
          handleMessage(values.question)
        }}
        setApiToken={(token) => setapiToken(token)}
        setApiUrl={(url) => setApiUrl(url)}
        />}
        {initalized &&
          <ChatPage messages={messages} disabled={APIcall} emptyChat={emptyChat} newMessage={
            (message) => {
              handleMessage(message)
            }
            }/>
        }
      </div>
    </>
  )
}

export default App
