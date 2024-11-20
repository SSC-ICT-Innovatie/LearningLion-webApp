import { useEffect, useState, useRef } from 'react'
import { Header } from './components/molecules/header/header'
import { HomePage } from './components/pages/home_page'
import './App.css'
import { ChatPage } from './components/pages/chat_page'
import { createChatMessage } from './util/chatMessageFactory'
import { LocalApiHandler } from './util/localApiHandler'
import { DocumentCheckPage } from './components/pages/document_check_page/document_check_page'
import { createFetchDocument, fetchedDocument } from './util/documentFactory'

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
  const [apiUrl, setApiUrl] = useState("http://127.0.0.1:5000")
  const APIhandler = useRef(new LocalApiHandler())
  const [errorOccured, setErrorOccured] = useState(false)
  const [DocumentsChecked, setDocumentsChecked] = useState<fetchedDocument[]>([])

  const [documentsToCheck, setDocumentsToCheck] = useState<fetchedDocument[]>([])
  useEffect(() => {
    APIhandler.current.setApiUrl(apiUrl)
    APIhandler.current.setApiToken(apiToken)
    console.log("APIhandler:", APIhandler.current)
  }
  , [apiUrl, apiToken])

  useEffect(() => {
    if(documentsToCheck.length > 0) {
      console.log("Documents Check:", documentsToCheck)
    }
  }
  , [documentsToCheck])

  const emptyChat = () => {
    setMessages([])
  }

  const handleMessage = (message:string) => {
    if(message === "") {
      return
    }
    if(apiUrl === "") {
      return
    }
    setAPIcall(true)
    setMessages(val => val.concat(
        createChatMessage(message, true)
    ))
    
    APIhandler.current.queryDocuments(message).then((response) => {
      console.log("Response:", response)
      const documents = response.documents;
      console.log("Documents:", documents);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const fetchedDocuments = documents.map((document: { metadata: { [key: string]: any }, text: string }, index: number) => {
        console.log(`Document ${index}: ${JSON.stringify(document)}`);
        return createFetchDocument(document.metadata["subject"], "", document.metadata["UUID"], document.metadata.source, document.metadata.page_number, document.text, index, document.metadata["question_number"])
      })
      setDocumentsToCheck(fetchedDocuments)
      setAPIcall(false);
    }
    ).catch((error) => console.error("Error:", error));
  }

  const callLlm = (query: string ,documents: fetchedDocument[]) => {
    APIhandler.current.infereLLM(query, documents).then((response) => {
      console.log("Response:", response)
      if(response === false) {
        setErrorOccured(true)
        setAPIcall(false);
      }
      else{
        setErrorOccured(false)
        setMessages(val => val.concat(createChatMessage(response.output, false)))
        setAPIcall(false);
      }
    }
    ).catch((error) => console.error("Error:", error));
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
        {documentsToCheck.length > 0 && initalized && !APIcall &&
        <DocumentCheckPage documents={documentsToCheck} apiUrl={apiUrl} onSubmit={(documents) => {
          console.log("Documents:", documents)
          setDocumentsToCheck([])
          setAPIcall(true);
          setDocumentsChecked(documents)
          callLlm(messages.at(messages.length-1)?.message ?? "", documents)
        }}/>}
        {initalized && documentsToCheck.length == 0 &&
          <ChatPage messages={messages} disabled={APIcall} emptyChat={emptyChat} newMessage={
            (message) => {
              handleMessage(message)
              setErrorOccured(false)
              setDocumentsChecked([])
            }
            } errorOccured={errorOccured} retryFailure={
              () => {
                setErrorOccured(false)
                callLlm(messages.at(messages.length-1)?.message ?? "", DocumentsChecked)
              }
            }/>
        }
      </div>
    </>
  )
}

export default App
