import { chatMessage } from "../App"

export const createChatMessage = (message: string, fromUser?:boolean, sources?:string[]): chatMessage => {

  return {
    fromUser: fromUser ? fromUser : false,
    message: message,
    username: fromUser ? "Jij" : "Learning Lion (genAI)",
    sources: sources ? sources : []
  }
}