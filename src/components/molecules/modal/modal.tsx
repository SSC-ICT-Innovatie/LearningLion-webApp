import './modal.css'
interface ModalProps {
  title: string,
  description: string,
  onSubmit: () => void,
  children: React.ReactNode
}

export const Modal = ({ title, description, children, onSubmit}: ModalProps) => {
  return (
    <div className='modal-wrapper'>
    <div className="modal">
      <div className="modal--header">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="modal--body">
        {children}
      </div>
      <div className="modal--footer">
        <button onClick={() => onSubmit()}>Submit</button>
      </div>
    </div>
    </div>
  );
}