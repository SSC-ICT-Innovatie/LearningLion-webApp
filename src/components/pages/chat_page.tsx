import { useEffect, useRef } from 'react'
import { QuestionBar } from "../atoms/question-bar/question-bar";
import { TextElement } from "../atoms/TextElement/TextElement";
import { ChatMessage } from "../molecules/chatmessage/chatmessage";
import { chatMessage } from "../../App";

interface chatPageProps {
  messages: chatMessage[]
  newMessage: (message: string) => void
  disabled?: boolean
}

export const ChatPage = ({messages, newMessage,disabled}:chatPageProps) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

    }
  }
  ,[messages
  ]);
  return (
    <div className="wrapper">
    <div style={{display: 'flex', flexDirection:"column", height:"65vh", overflow:'scroll', padding: "5px 0", margin:"10px 0"}}>
      {
        messages.map((message, index) => {
          return <ChatMessage key={index} fromUser={message.fromUser} message={message.message} username={message.username} sources={message.sources}/>
        })
      }
    <div ref={messagesEndRef}></div>

    </div>
    {disabled && <TextElement type='small bold left'>Learning Lion is aan het typen...</TextElement>}
    <QuestionBar disabled={disabled} onSubmit={(values) => {
      newMessage(values)
    }}/>

    <TextElement type='regular bold center'>Learning Lion kan fouten maken</TextElement>

    </div>
  );
}