import { TextElement } from "../../atoms/TextElement/TextElement"
import "./header.css"

interface HeaderProps {
  chatPage: boolean
  specialty?: string
}

export const Header = ({chatPage, specialty}: HeaderProps) => {
  return (
    <div className='header'>
      {chatPage && (
        <>
          <TextElement type="mid-heading bold">{`Learning Lion${!specialty ? "" : `- ${specialty}`}`}</TextElement>
        </>
      )}
      {!chatPage && (
        <>
    <TextElement type="heading bold">Learning Lion</TextElement>
    <TextElement type='info italic gray' onClick={()=>window.open("https://learninglion.nl","_self")}>i</TextElement>
      </>
      )}
  </div>
  )
}