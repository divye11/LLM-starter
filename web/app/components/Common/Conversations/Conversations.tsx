import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { Text, useTheme } from "@geist-ui/core";

const Conversations: React.FC<ConversationProps> = ({ conversation }) => {
   const { palette } = useTheme();
   const [renderedConversations, setRenderedConversations] = useState<Conversation[]>([])


   useEffect(() => {
      console.log('memoized conv changed', conversation);
      setRenderedConversations(conversation);
   }, [conversation]);
   
   return (
      <div>
         {renderedConversations.length > 0 && renderedConversations.map((conv, index) => { 
            const key = `${new Date().getMilliseconds().toString()}-${index}`;
            console.log('conversation key', key, conv);
            return (
               <div key={key}>
                  <Text style={{ color: palette.background, textAlign: conv.generated ? 'left' : 'right' }}>
                     <Markdown>{conv.message.content}</Markdown>
                  </Text>
               </div>
            )
         })}
      </div>

   )
}

export default Conversations;