import { useState } from 'react';
import TextElement from '../../atoms/TextElement/TextElement.tsx';
import './chatmessage.css';

interface ChatMessageProps {
  fromUser?: boolean;
  username?: string;
  message: string;
  sources?: string[];
}
function ChatMessage({ fromUser, username, message, sources }: ChatMessageProps) {
  const [showSources, setShowSources] = useState(false);

  const renderSources = () => {
    if (!sources) return null;
    return sources.map((source, _index) => (
      <TextElement
        link={source}
        key={source}
        type="chatmessage chat-message__sources__container__source link"
        onClick={() => {}}>
        {source}
      </TextElement>
    ));
  };
  return (
    <div className={`chat-message ${fromUser ? 'from-user' : 'from-ai'}`}>
      <div className="chat-message__container">
        {username && (
          <div className="chat-message__container__profile">
            <TextElement type="chatname option span">{username}</TextElement>
          </div>
        )}
        <div className="chat-message__container__message">
          <TextElement type="chatmessage chat-message__container__message__text">
            {message}
          </TextElement>
        </div>

        {sources && sources.length > 0 && (
          <div className="chat-message__sources">
            <div
              className="chat-message__sources-header"
              role="button"
              tabIndex={0}
              onClick={() => setShowSources(!showSources)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setShowSources(!showSources);
                }
              }}>
              <TextElement type="chatmessage chat-message__sources__text">
                Gebruikte bronnen
              </TextElement>
              <div className="gylph">{showSources ? '▲' : '▼'}</div>
            </div>
            {showSources && (
              <div className="chat-message__sources__container">
                {showSources && renderSources()}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

ChatMessage.defaultProps = {
  fromUser: false,
  username: '',
  sources: [],
};

export default ChatMessage;
