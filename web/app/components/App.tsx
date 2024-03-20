import { useState } from 'react';
import { Page, useTheme, Text, Grid, useToasts } from '@geist-ui/core';
import Searchbox from './Common/Searchbox/Searchbox';
import { useSocket } from '../../utils/useSocket';
import Conversations from './Common/Conversations/Conversations';

const App: React.FC = () => {
   const { palette } = useTheme();
   const { setToast } = useToasts();

   const [ disableInput, setDisableInput ] = useState<boolean>(true);
   const [ conversations, setConversation ] = useState<Conversation[]>([]);
   
   const onMessageReceive = (message: Conversation) => {
      setConversation((prevConversations) => {
        const lastMessageIndex = prevConversations.length > 0 ? prevConversations.length - 1 : 0;
        const wasLastMessageComplete = prevConversations[lastMessageIndex]?.done ?? true;
    
        if (wasLastMessageComplete) {
          // Add a new message to the conversation
          return [...prevConversations, {...message, generated: true }];
        } else {
          // Update the last message in the conversation
          const modifiedConversation = prevConversations;
          modifiedConversation[lastMessageIndex] = {
            ...modifiedConversation[lastMessageIndex],
            message: {
               ...modifiedConversation[lastMessageIndex].message,
               content: modifiedConversation[lastMessageIndex].message.content + message.message.content
            }
          }
          return modifiedConversation;          
        }
      });
    };

   const onError = (error: Error) => {
      setToast({
         text: error.message.toString(),
         delay: 200
      })
   }

   const onConnect = () => {
      setDisableInput(false);
   }

   const onDisconnect = () => {
      setDisableInput(true);
   }

   const onSendQuery = (query: string) => {
      setConversation((prevConversations: Conversation[]) => [
         ...prevConversations,
         {
           model: 'llama2',
           done: true,
           created_at: new Date().toString(),
           message: {
             content: query,
             role: 'user', // Assuming this is a user message. Use 'assistant' if it's an assistant's message.
           },
           generated: false,
         }
       ]);
      sendMessage(query);
   }

   const { sendMessage } = useSocket({
      topic: 'query', 
      returnTopic: 'response',
      onMessageReceive: onMessageReceive,
      onError: onError,
      onConnect: onConnect,
      onDisconnect: onDisconnect
   });

   return (
      <Page height={50} style={{ background: palette.accents_8, display: 'flex', justifyContent: 'center', width: '100%' }}>
         <Page.Content  
            width={100}
            style={{ 
               display: 'flex',
               justifyContent: 'center', 
               alignItems: 'center', 
               flexDirection: 'column'
            }}>
               <Grid.Container
                  style={{
                     display: 'flex', 
                     flexDirection: 'column',
                     justifyContent: 'center',
                     alignItems: 'center'
                  }}
                  width={40}
                  marginLeft='30%'
                  marginRight='30%'
               >
                  <Grid>
                     <Text h1 style={{ color: palette.background, textAlign: 'center' }}>Ask anything away!</Text>
                     <Searchbox 
                        sendMessage={onSendQuery}
                        disabled={disableInput}
                     />
                     <Conversations 
                        conversation={conversations}
                     />
                  </Grid>
               </Grid.Container>
         </Page.Content>
      </Page>
   );
}
   
export default App;
