import { Component, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ChatMessageComponent } from './app/components/chat-message/chat-message.component';
import { ChatInputComponent } from './app/components/chat-input/chat-input.component';
import { LanguageSwitcherComponent } from './app/components/language-switcher/language-switcher.component';
import { ChatService } from './app/services/chat.service';
import { provideHttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    ChatInputComponent,
    LanguageSwitcherComponent,
    TranslateModule,
  ],
  template: `
    <div class="container py-4">
      <div class="card">
        <div class="card-header bg-primary text-white">
          <div class="d-flex justify-content-between align-items-center">
            <h1 class="h4 mb-0">{{ 'CHAT.TITLE' | translate }}</h1>
            <app-language-switcher />
          </div>
        </div>
        <div class="card-body messages-container">
          @for (message of messages(); track message.id) {
            <app-chat-message [message]="message" />
          }
         @if(isLoading()){
          <div class="d-flex mb-3">
            <div class="message p-3 rounded-3 bg-light">
               <div class="message-content">
                <div className="loading-dots">...</div>
              </div>
            </div>
          </div>
         }
        </div>
        <div class="card-footer bg-light">
          <app-chat-input (send)="sendMessage($event)" />
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .messages-container {
      height: 70vh;
      overflow-y: auto;
    }

    // Loading Dots for Chat Bubble
    .loading-dots {
      animation: dots 1s infinite;
      margin-left: 5px;
      overflow: ellipsis;
    }

    @keyframes dots {
    0% { content: "."; }
    33% { content: ".."; }
    66% { content: "..."; }
    100% { content: "."; }
  }

  `,
  ],
})
export class App {
  isLoading = signal<boolean>(false);
  messages = this.chatService.messages;

  constructor(private chatService: ChatService) {
    this.isLoading = chatService.isProcessing;
  }

  sendMessage(content: string): void {
    this.chatService.sendMessage(content);
  }
}

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    importProvidersFrom(
      HttpClientModule,
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
  ],
}).catch((err) => console.error(err));
