import React, { useState } from 'react'
import { Header } from './components/molecules/header/header'
import { HomePage } from './components/pages/home_page'
import './App.css'
import { ChatPage } from './components/pages/chat_page'
function App() {
  return (
    <>
      <div className='wrapper'>
        <Header chatPage={true}/>
        <ChatPage />
      </div>
    </>
  )
}

export default App
