import { useEffect, useState, useRef, SetStateAction, Key } from 'react';
import Header from './components/molecules/header/header.tsx';
import HomePage from './components/pages/home_page.tsx';
import './App.css';
import ChatPage from './components/pages/chat_page.tsx';
import createChatMessage from './util/chatMessageFactory.ts';
import LocalApiHandler from './util/localApiHandler.ts';
import DocumentCheckPage from './components/pages/document_check_page/document_check_page.tsx';
import { createFetchDocument, fetchedDocument } from './util/documentFactory.ts';

export interface chatMessage {
  id: Key;
  fromUser: boolean;
  message: string;
  username: string;
  sources?: string[];
}

function App() {
  const [specialty, setspecialty] = useState('');
  const [initalized, setInitalized] = useState(false);
  const [APIcall, setAPIcall] = useState(false);
  const [messages, setMessages] = useState<chatMessage[]>([]);
  const [apiToken, setapiToken] = useState('');
  const [apiUrl, setApiUrl] = useState('http://127.0.0.1:5000');
  const APIhandler = useRef(new LocalApiHandler());
  const [errorOccured, setErrorOccured] = useState(false);
  const [DocumentsChecked, setDocumentsChecked] = useState<fetchedDocument[]>([]);

  const [documentsToCheck, setDocumentsToCheck] = useState<fetchedDocument[]>([]);
  useEffect(() => {
    APIhandler.current.setApiUrl(apiUrl);
    APIhandler.current.setApiToken(apiToken);
  }, [apiUrl, apiToken]);

  const emptyChat = () => {
    setMessages([]);
  };

  const handleMessage = (message: string) => {
    if (message === '') {
      return;
    }
    if (apiUrl === '') {
      return;
    }
    setAPIcall(true);
    setMessages((val) => val.concat(createChatMessage(message, true)));

    APIhandler.current
      .queryDocuments(message)
      .then((response) => {
        const { documents } = response;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fetchedDocuments = documents.map(
          (
            document: {
              metadata: {
                subject: string;
                UUID: string;
                source: string;
                page_number: number;
                question_number: string;
              };
              text: string;
            },
            index: number,
          ) =>
            createFetchDocument(
              document.metadata.subject,
              '',
              document.metadata.UUID,
              document.metadata.source,
              document.metadata.page_number,
              document.text,
              index,
              document.metadata.question_number,
            ),
        );
        setDocumentsToCheck(fetchedDocuments);
        setAPIcall(false);
      })
      .catch((error) => console.error('Error:', error));
  };

  const callLlm = (query: string, documents: fetchedDocument[]) => {
    APIhandler.current
      .infereLLM(query, documents)
      .then((response) => {
        if (response === false) {
          setErrorOccured(true);
          setAPIcall(false);
        } else {
          setErrorOccured(false);
          setMessages((val) => val.concat(createChatMessage(response.output, false)));
          setAPIcall(false);
        }
      })
      .catch((error: Error) => console.error('Error:', error));
  };
  return (
    <div className="wrapper">
      <Header
        chatPage={initalized}
        specialty={specialty}
      />
      {!initalized && (
        <HomePage
          onSubmit={(values: { specialty: SetStateAction<string>; question: string }) => {
            setspecialty(values.specialty);
            setInitalized(true);
            handleMessage(values.question);
          }}
          setApiToken={(token: SetStateAction<string>) => setapiToken(token)}
          setApiUrl={(url: SetStateAction<string>) => setApiUrl(url)}
        />
      )}
      {documentsToCheck.length > 0 && initalized && !APIcall && (
        <DocumentCheckPage
          documents={documentsToCheck}
          apiUrl={apiUrl}
          onSubmit={(documents: fetchedDocument[]) => {
            console.log('Documents:', documents);
            setDocumentsToCheck([]);
            setAPIcall(true);
            setDocumentsChecked(documents);
            callLlm(messages.at(messages.length - 1)?.message ?? '', documents);
          }}
        />
      )}
      {initalized && documentsToCheck.length === 0 && (
        <ChatPage
          messages={messages}
          disabled={APIcall}
          emptyChat={emptyChat}
          newMessage={(message: string) => {
            handleMessage(message);
            setErrorOccured(false);
            setDocumentsChecked([]);
          }}
          errorOccured={errorOccured}
          retryFailure={() => {
            setErrorOccured(false);
            callLlm(messages.at(messages.length - 1)?.message ?? '', DocumentsChecked);
          }}
        />
      )}
    </div>
  );
}

export default App;
