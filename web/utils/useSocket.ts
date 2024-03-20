import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { ConnectionStatus } from '../constants/utils';

export function useSocket({ topic, returnTopic, onMessageReceive, onConnect = () => {}, onDisconnect = () => {}, onError }: UseSocketProps): UseSocket {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Initialize Socket.IO client
    socketRef.current = io(`http://localhost:3030/chat`, { 
      retries: 3, 
      transports: ['websockets', 'polling'],
      secure: false,
    });

    socketRef.current.on('connect', () => {
      onConnect({
        id: '',
        status: ConnectionStatus.CONNECTED
      })
    });

    // Listen for messages from the server
    socketRef.current.on(returnTopic, (message: any) => {
      if (message) {
        onMessageReceive(message);
      }
    });

    socketRef.current.on('connect_error', (error) => {
      onError(error);
    })

    socketRef.current.on('error', (error) => {
      onError(error);
    })
    
    // Clean up on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current && socketRef.current.disconnect();
        onDisconnect({
          id: socketRef.current.id?.toString() || '',
          status: ConnectionStatus.DISCONNECTED
        })
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic, returnTopic]);

  // Function to send a message to the server
  const sendMessage = (message: string) => {
    if (socketRef.current) {
      console.log('socket emit', message);
      socketRef.current.emit('query', message);
    }
  };

  return { sendMessage };
}
