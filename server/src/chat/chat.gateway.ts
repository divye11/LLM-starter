import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'chat',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    this.server.emit('connection', {
      status: 'connected',
      id: client.id,
    });
  }

  handleDisconnect(client: Socket) {
    this.server.emit('connection', {
      status: 'disconnected',
      id: client.id,
    });
  }

  @SubscribeMessage('query')
  async handleMessage(client: Socket, message: any): Promise<any> {
    // Broadcast the received message to all clients (including the sender)
    console.log('message received', message);
    const response = await this.chatService.getResponseFromOllama(message);
    for await (const res of response) {
      this.server.emit('response', res);
    }
  }
}
