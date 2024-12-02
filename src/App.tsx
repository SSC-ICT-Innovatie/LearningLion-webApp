import { useEffect, useState, useRef, SetStateAction, Key } from 'react';
import Header from './components/molecules/header/header.tsx';
import HomePage from './components/pages/home_page.tsx';
import './App.css';
import ChatPage from './components/pages/chat_page.tsx';
import createChatMessage from './util/chatMessageFactory.ts';
import LocalApiHandler from './util/localApiHandler.ts';
import DocumentCheckPage from './components/pages/document_check_page/document_check_page.tsx';
import { createFetchDocument, fetchedDocument } from './util/documentFactory.ts';
import DefaultTemplate from './components/template/default-Template.tsx';
import KamervragenTemplate from './components/template/kamervragen-Template.tsx';

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
  const [allSpecialties, setAllSpecialties] = useState([]);
  const [LLMModel, setLLMModel] = useState('BramVanRoy/fietje-2-chat');
  const [availableModels, setAvailableModels] = useState([]);
  const [jsonBodyPrompt, setJsonBodyPrompt] = useState({});

  useEffect(() => {
    APIhandler.current.setLLMModel(LLMModel);
  }, [LLMModel]);

  useEffect(() => {
    APIhandler.current.setApiUrl(apiUrl);
    APIhandler.current.setApiToken(apiToken);
    APIhandler.current.getSpecialties().then((response) => {
      setAllSpecialties(response);
    });
    APIhandler.current.getAvailableModles().then((response) => {
      setAvailableModels(response);
    });
  }, [apiUrl, apiToken]);

  useEffect(() => {
    APIhandler.current.setSpecialty(specialty);
  }, [specialty]);

  const emptyChat = () => {
    setMessages([]);
  };

  const handleMessage = (
    message:
      | string
      | {
          inleiding: string;
          vragen: string;
          departmentSentiment: string;
          news: string;
        },
  ) => {
    // Early returns for edge cases
    if (!message || apiUrl === '') {
      return;
    }

    // Set API call status
    setAPIcall(true);

    // Combine message if it's an object, otherwise use it as-is
    const combinedMessage =
      typeof message === 'object'
        ? `${message.inleiding} ${message.vragen} ${message.departmentSentiment} ${message.news}`
        : message;
    if (typeof message === 'object') {
      setJsonBodyPrompt({
        message,
        combinedMessage,
        prompt: `${message.inleiding} ${message.vragen}`,
      });
    }
    // Update the messages state
    setMessages((val) => val.concat(createChatMessage(combinedMessage, true)));

    // Fetch documents using the combined message
    APIhandler.current
      .queryDocuments(combinedMessage)
      .then((response) => {
        const { documents } = response;

        // Map fetched documents to the desired format
        console.log(documents);
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
              answer: string;
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
              document.answer
            ),
        );

        // Update documents state
        setDocumentsToCheck(fetchedDocuments);
        setAPIcall(false);
      })
      .catch((_error) => {
        // Handle errors if necessary
        setAPIcall(false); // Ensure the API call flag is reset on error
      });
  };
  const callLlm = (query: string | object, documents: fetchedDocument[]) => {
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
      .catch((_error: Error) => {});
  };

  const renderTemplate = () => {
    if (specialty === 'KamerVragen') {
      return (
        <KamervragenTemplate
          onSubmit={(values: {
            inleiding: string;
            vragen: string;
            departmentSentiment: string;
            news: string;
          }) => {
            setInitalized(true);
            handleMessage(values);
          }}
        />
      );
    }

    return (
      <DefaultTemplate
        onSubmit={(values: { question: string }) => {
          setInitalized(true);
          handleMessage(values.question);
        }}
      />
    );
  };

  return (
    <div className="wrapper">
      <Header
      chatPage={initalized}
      specialty={specialty}
      setLLMModel={(model: SetStateAction<string>) => setLLMModel(model)}
      models={availableModels}
      />
      {!initalized && (
      <HomePage
        template={renderTemplate()}
        setApiToken={(token: SetStateAction<string>) => setapiToken(token)}
        setApiUrl={(url: SetStateAction<string>) => setApiUrl(url)}
        setSpecialtyCallback={(selectedSpecialty: SetStateAction<string>) =>
        setspecialty(selectedSpecialty)
        }
        specialties={allSpecialties}
      />
      )}
      {documentsToCheck.length > 0 && initalized && !APIcall && (
      <DocumentCheckPage
        key={documentsToCheck.map((doc) => doc.uuid).join('-')}
        documents={documentsToCheck}
        apiUrl={apiUrl}
        question={messages.at(messages.length - 1)?.message ?? ''}
        onRemove={(uuid: string) => {
        setDocumentsToCheck((prev) =>
          prev.filter((document) => document.uuid !== uuid)
        );
        }
        }
        onSubmit={(documents: fetchedDocument[]) => {
        setDocumentsToCheck([]);
        setAPIcall(true);
        setDocumentsChecked(documents);
        if (Object.keys(jsonBodyPrompt).length > 0) {
          callLlm(jsonBodyPrompt, documents);
        } else {
          callLlm(messages.at(messages.length - 1)?.message ?? '', documents);
        }
        }}
        getNewDocs={(query: string) => {
        APIhandler.current
          .queryDocuments(query)
          .then((response) => {
          const { documents } = response;
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
              answer: string;
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
              document.answer
            ),
          );
          // filter already existing documents
          const filteredDocuments = fetchedDocuments.filter(
            (doc: { uuid: string; }) =>
            !documentsToCheck.some(
              (documentToCheck) => documentToCheck.uuid === doc.uuid
            )
          );
          console.log(filteredDocuments);
          console.log(documentsToCheck.length);
          setDocumentsToCheck((prev) => [...prev, ...filteredDocuments]);
          })
          .catch((_error) => {
          setAPIcall(false);
          });
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
        regenerateMessage={() => {
        if (Object.keys(jsonBodyPrompt).length > 0) {
          callLlm(jsonBodyPrompt, DocumentsChecked);
        } else {
          callLlm(messages.at(messages.length - 1)?.message ?? '', DocumentsChecked);
        }
        }}
        errorOccured={errorOccured}
        retryFailure={() => {
        setErrorOccured(false);
        if (Object.keys(jsonBodyPrompt).length > 0) {
          callLlm(jsonBodyPrompt, DocumentsChecked);
        } else {
          callLlm(messages.at(messages.length - 1)?.message ?? '', DocumentsChecked);
        }
        }}
      />
      )}
    </div>
  );
}

export default App;
