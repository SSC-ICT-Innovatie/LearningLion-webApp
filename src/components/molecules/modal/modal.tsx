import { useState } from 'react'
import './modal.css'
interface ModalProps {
  title: string,
  description: string,
  onSubmit: (apiToken: string, apiUrl: string) => void,
}

export const Modal = ({ title, description, onSubmit}: ModalProps) => {
  const [token, setToken] = useState("")
  const [url, setUrl] = useState("")
  return (
    <div className='modal-wrapper'>
    <div className="modal">
      <div className="modal--header">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="modal--body">
        <input placeholder="Api token" value={token} onChange={(e) => setToken(e.target.value)} />
        <input placeholder="Api URL" value={url} onChange={(e) => setUrl(e.target.value)} />
      </div>
      <div className="modal--footer">
        <button onClick={() => onSubmit(token,url)}>Submit</button>
      </div>
    </div>
    </div>
  );
}