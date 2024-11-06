import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message } from '../../models/message.interface';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="d-flex mb-3" [ngClass]="{'justify-content-end': message.sender === 'user'}">
      <div class="message p-3 rounded-3" 
           [ngClass]="message.sender === 'user' ? 'bg-primary text-white' : 'bg-light'">
        <div class="message-content">
          {{ message.content }}
        </div>
        <small class="text-opacity-75" [ngClass]="message.sender === 'user' ? 'text-white' : 'text-muted'">
          {{ message.timestamp | date:'short' }}
        </small>
      </div>
    </div>
  `,
  styles: [
    `
    .message {
      max-width: 70%;
    }
  `,
  ],
})
export class ChatMessageComponent {
  @Input() message!: Message;
}
