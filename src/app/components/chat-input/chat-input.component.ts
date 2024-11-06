import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [FormsModule, TranslateModule],
  template: `
    <div class="input-group">
      <input
        type="text"
        class="form-control"
        [(ngModel)]="messageContent"
        (keyup.enter)="sendMessage()"
        [placeholder]="'CHAT.INPUT_PLACEHOLDER' | translate"
      />
      <button class="btn btn-primary" (click)="sendMessage()">
        {{ 'CHAT.SEND' | translate }}
      </button>
    </div>
  `
})
export class ChatInputComponent {
  @Output() send = new EventEmitter<string>();
  messageContent = '';

  sendMessage(): void {
    if (this.messageContent.trim()) {
      this.send.emit(this.messageContent);
      this.messageContent = '';
    }
  }
}