declare interface ConnectionProps {
   id: string;
   status: ConnectionStatus
}

declare interface UseSocketProps {
   returnTopic: string;
   topic: string;
   onMessageReceive: (message: Conversation) => void;
   onConnect?: (status: ConnectionProps) => void;
   onDisconnect?: (status: ConnectionProps) => void;
   onError: (error: Error) => void
}

declare interface UseSocket { 
   sendMessage: (message: string) => void;
}