import { Injectable } from '@nestjs/common';
import { Ollama } from 'ollama';

@Injectable()
export class ChatService {
  private ollama: Ollama;

  constructor() {
    this.ollama = new Ollama({
      host: 'http://localhost:11434',
    });
  }
  getResponseFromOllama = async (message: string) => {
    try {
      return this.ollama.chat({
        model: process.env.MODEL_NAME || 'llama2',
        messages: [
          {
            role: 'user',
            content: message,
          },
        ],
        stream: true,
      });
    } catch (error) {
      console.error('Error calling Ollama', error);
      throw error;
    }
  };
}
