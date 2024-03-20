declare interface SearchboxProps {
   sendMessage: (message: string) => void; 
   disabled: boolean;
}

declare interface Message {
   content: string;
   role: string;
}

declare interface Conversation {
   model: string;
   done: boolean;
   created_at: string;
   message: Message;
   generated: boolean;
}