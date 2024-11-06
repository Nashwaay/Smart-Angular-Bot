import { Injectable, signal, computed, Signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Message } from '../models/message.interface';
import { LanguageService } from './language.service';
import { GeminiService } from './gemini.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private messagesSignal = signal<Message[]>([]);
  public messages: Signal<Message[]> = computed(() => this.messagesSignal());
  isProcessing = signal<boolean>(false);


  constructor(
    private translateService: TranslateService,
    private languageService: LanguageService,
    private geminiService: GeminiService
  ) {}

  async sendMessage(content: string): Promise<void> {
    if (this.isProcessing()) return;

    const userMessage: Message = {
      id: Date.now(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    this.isProcessing.set(true);
    this.messagesSignal.update((messages) => [...messages, userMessage]);

    try {
      const currentLang = this.languageService.getCurrentLanguage();
      const languageMap: { [key: string]: string } = {
        en: 'English',
        es: 'Spanish',
        fr: 'French',
        de: 'German',
        ar: 'Arabic',
      };

      const response = await this.geminiService.generateResponse(
        content,
        languageMap[currentLang]
      );

      const botMessage: Message = {
        id: Date.now() + 1,
        content: response,
        sender: 'bot',
        timestamp: new Date(),
      };

      this.messagesSignal.update((messages) => [...messages, botMessage]);
    } catch (error) {
      const errorMessage = await this.translateService
        .get('RESPONSES.ERROR')
        .toPromise();
      const botMessage: Message = {
        id: Date.now() + 1,
        content: errorMessage,
        sender: 'bot',
        timestamp: new Date(),
      };
      this.messagesSignal.update((messages) => [...messages, botMessage]);
    } finally {
      this.isProcessing.set(false);
    }
  }
}
