import React, { useState } from 'react'
import { TextElement } from '../../atoms/TextElement/TextElement'
import './chatmessage.css'

interface ChatMessageProps {
  fromUser?: boolean
  username?: string
  message: string
  sources?: string[]
}

export const ChatMessage = ({fromUser, username, message, sources}:ChatMessageProps) => {
  const [showSources, setShowSources] = useState(false)

  const renderSources = () => {
    return sources.map((source, index) => {
      return <TextElement link={source} key={index} type='chatmessage chat-message__sources__container__source link' onClick={() => console.log(source)}>{source}</TextElement>
    })
  }
  return (
      <div className={`chat-message ${fromUser ? 'from-user': 'from-ai'}`}>
        <div className='chat-message__container'>
          {username && (
          <div className='chat-message__container__profile'>
            <TextElement type='chatname option span'>{username}</TextElement>
          </div>
          )}
          <div className='chat-message__container__message'>
            <TextElement type='chatmessage chat-message__container__message__text'>{message}</TextElement>
          </div>

          {sources && sources.length > 0 && (
          <div className="chat-message__sources">
            <div className="chat-message__sources-header" onClick={() => setShowSources(!showSources)}>
              <TextElement type='chatmessage chat-message__sources__text'>Gebruikte bronnen</TextElement>
              <div className="gylph">
                {showSources ? "▲" : "▼"}
              </div>
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
  )
}