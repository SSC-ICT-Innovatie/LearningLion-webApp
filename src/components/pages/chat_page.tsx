import { ChatMessage } from "../molecules/chatmessage/chatmessage";

export const ChatPage = () => {
  return (
    <div style={{display: 'flex', flexDirection:"column", height:"80vh", overflow:'scroll'}}>
      <ChatMessage fromUser message="Hoeveel P’s zijn er in appel?" username="Jij"/>

      <ChatMessage username="Learning Lion (genAI)" message={`Er zijn geen 'p's in het woord "appel", het is een 'a'.`}/>
      <ChatMessage fromUser message="Is er informatie beschikbaar over de toepassing van AI binnen de overheid?" username="Jij"/>
      <ChatMessage username="Learning Lion (genAI)" message="Op basis van de beschikbare documenten kan er geen specifiek antwoord worden gegeven op de gestelde vragen, maar ze geven wel aan dat er plannen zijn om betaalbare woningen te bouwen, het aantal bouwvergunningen te verhogen en ruimtelijke ordeningsprocedures te versnellen."
      sources={["ABC","DEF"]}/>
    </div>
  );
}