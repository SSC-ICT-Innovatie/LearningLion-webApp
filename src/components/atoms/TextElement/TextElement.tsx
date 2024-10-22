import React from 'react'
import './TextElement.css'

interface TextProps {
  type: string
  children: string
  onClick?: () => void
  link?: string
}

export const TextElement = ({ type, children,onClick,link }: TextProps) => {
  if (type.includes("span")){
    return <span className={type} onClick={onClick}>{children}</span>
  }
  if(type.includes("link")){
    return <p className={type} onClick={onClick}><a href={link} target='_blank'>{children
    }</a>
    </p>
  }
  return <p className={type} onClick={onClick}>{children}</p>
}