import { useEffect, useRef } from 'react';
import QuestionBar from '../atoms/question-bar/question-bar.tsx';
import TextElement from '../atoms/TextElement/TextElement.tsx';
import ChatMessage from '../molecules/chatmessage/chatmessage.tsx';
import { chatMessage } from '../../App.tsx';
import { Button } from '../atoms/button/Button.tsx';
import KamervragenTemplate from '../template/kamervragen-Template.tsx';

interface chatPageProps {
  messages: chatMessage[];
  newMessage: (
    message:
      | string
      | {
          inleiding: string;
          vragen: string;
          departmentSentiment: string;
          news: string;
        },
  ) => void;
  disabled: boolean;
  errorOccured: boolean;
  retryFailure: () => void;
  isTyping: boolean;
  isSearching: boolean;
  specialty: string;
}

function ChatPage({
  messages,
  newMessage,
  disabled = false,
  errorOccured = false,
  retryFailure,
  isTyping,
  isSearching,
  specialty,
}: chatPageProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div
      className="wrapper"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'auto',
        width: '100%',
      }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '65vh',
          overflow: 'scroll',
          padding: '5px 0',
          margin: '10px 0',
          width: '100%',
        }}>
        {messages.map((message, _index) => (
          <ChatMessage
            key={message.id}
            fromUser={message.fromUser}
            message={message.message}
            username={message.username}
            sources={message.sources}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      {disabled && isTyping && (
        <TextElement type="small bold left">Learning Lion is aan het typen...</TextElement>
      )}
      {disabled && isSearching && (
        <TextElement type="small bold left">Learning Lion is aan het zoeken...</TextElement>
      )}
      {errorOccured && (
        <div>
          <TextElement type="small bold left">Excuus er is een fout opgetreden</TextElement>
          <Button onClick={retryFailure}>Probeer het opnieuw</Button>
        </div>
      )}
      {specialty === 'KamerVragen' ? (
        <KamervragenTemplate onSubmit={(_values) => newMessage(_values)} />
      ) : (
        <QuestionBar
          disabled={disabled}
          onSubmit={(values: string) => {
            newMessage(values);
          }}
        />
      )}

      <TextElement type="regular bold center">Learning Lion kan fouten maken</TextElement>
    </div>
  );
}

export default ChatPage;
