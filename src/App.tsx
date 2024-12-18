import { useEffect, useState, useRef, SetStateAction, Key } from 'react';
import Header from './components/molecules/header/header.tsx';
import HomePage from './components/pages/home_page.tsx';
import './App.css';
import ChatPage from './components/pages/chat_page.tsx';
import createChatMessage from './util/chatMessageFactory.ts';
import LocalApiHandler from './util/localApiHandler.ts';
import DocumentCheckPage from './components/pages/document_check_page/document_check_page.tsx';
import { fetchedDocument } from './util/documentFactory.ts';
import DefaultTemplate from './components/template/default-Template.tsx';
import KamervragenTemplate from './components/template/kamervragen-Template.tsx';
import { fetchedDocuments } from './util/KamerVragenUtil.ts';

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
  const [LLMModel, _setLLMModel] = useState('BramVanRoy/fietje-2-chat');
  // const [availableModels, setAvailableModels] = useState([]);
  const [datascopes, setDatascopes] = useState([]);
  const [jsonBodyPrompt, setJsonBodyPrompt] = useState({});
  const [dataScope, setDataScope] = useState('default');
  const [isSearching, setIsSearching] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    APIhandler.current.setLLMModel(LLMModel);
  }, [LLMModel]);

  useEffect(() => {
    APIhandler.current.setDataScope(dataScope);
  }, [dataScope]);

  // useEffect(() => {
  //   // filter documents on duplicates
  //   const filteredDocuments = documentsToCheck.filter(
  //     (doc: { uuid: string }) =>
  //       !documentsToCheck.some((documentToCheck) => documentToCheck.uuid === doc.uuid),
  //   );
  //   setDocumentsToCheck((prev) => [...prev, ...filteredDocuments]);
  // }, [documentsToCheck])

  useEffect(() => {
    APIhandler.current.setApiUrl(apiUrl);
    APIhandler.current.setApiToken(apiToken);
    APIhandler.current.getSpecialties().then((response) => {
      setAllSpecialties(response);
    });
    APIhandler.current.getDataScopes().then((response) => {
      setDatascopes(response);
    });
  }, [apiUrl, apiToken]);

  useEffect(() => {
    APIhandler.current.setSpecialty(specialty);
  }, [specialty]);

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
    setIsSearching(true);

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
    fetchedDocuments(combinedMessage, specialty, APIhandler)
      .then((response: fetchedDocument[]) => {
        setDocumentsToCheck(response);
        setAPIcall(false);
        setIsSearching(false);
      })
      .catch((_error) => {
        // Handle errors if necessary
        setAPIcall(false); // Ensure the API call flag is reset on error
        setIsSearching(false);
      });
  };
  const callLlm = (query: string | object, documents: fetchedDocument[]) => {
    APIhandler.current
      .infereLLM(query, documents)
      .then((response) => {
        if (response === false) {
          setErrorOccured(true);
        } else {
          setErrorOccured(false);
          setMessages((val) => val.concat(createChatMessage(response.output, false)));
        }
        setAPIcall(false);
        setIsTyping(false);
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
        setDataScope={(scope: SetStateAction<string>) => setDataScope(scope)}
        // setLLMModel={(model: SetStateAction<string>) => setLLMModel(model)}
        datascope={datascopes}
        selectedDatascope={dataScope}
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
      {documentsToCheck.length > 0 && initalized && (
        <DocumentCheckPage
          key={documentsToCheck.map((doc) => doc.uuid).join('-')}
          checkedDocuments={DocumentsChecked}
          documents={documentsToCheck}
          apiUrl={apiUrl}
          question={messages.at(messages.length - 1)?.message ?? ''}
          onCheck={(document: fetchedDocument) => {
            setDocumentsChecked((prev) => [...prev, document]);
          }}
          onUncheck={(document: fetchedDocument) => {
            setDocumentsChecked((prev) => prev.filter((doc) => doc.uuid !== document.uuid));
          }}
          onSubmit={(documents: fetchedDocument[]) => {
            setDocumentsToCheck([]);
            setAPIcall(true);
            setIsTyping(true);
            setDocumentsChecked(documents);
            if (Object.keys(jsonBodyPrompt).length > 0) {
              callLlm(jsonBodyPrompt, documents);
            } else {
              callLlm(messages.at(messages.length - 1)?.message ?? '', documents);
            }
          }}
          getNewDocs={(query: string) => {
            setAPIcall(true);
            setIsSearching(true);
            fetchedDocuments(query, specialty, APIhandler)
              .then((response: fetchedDocument[]) => {
                setAPIcall(false);
                setIsSearching(false);
                const filteredDocuments = response.filter(
                  (doc: { uuid: string }) =>
                    !documentsToCheck.some((documentToCheck) => documentToCheck.uuid === doc.uuid),
                );
                setDocumentsToCheck((prev) => [...prev, ...filteredDocuments]);
              })
              .catch((_error) => {
                setAPIcall(false);
                setIsSearching(false);
              });
          }}
        />
      )}
      {initalized && documentsToCheck.length === 0 && (
        <ChatPage
          messages={messages}
          disabled={APIcall}
          newMessage={(
            message:
              | string
              | {
                  inleiding: string;
                  vragen: string;
                  departmentSentiment: string;
                  news: string;
                },
          ) => {
            handleMessage(message);
            setErrorOccured(false);
            setDocumentsChecked([]);
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
          isSearching={isSearching}
          isTyping={isTyping}
          specialty={specialty}
        />
      )}
    </div>
  );
}

export default App;
