import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="dropdown">
      <button 
        class="btn btn-light dropdown-toggle" 
        type="button" 
        id="languageDropdown" 
        data-bs-toggle="dropdown" 
        aria-expanded="false">
        {{ 'LANGUAGE.' + languageService.getCurrentLanguage().toUpperCase() | translate }}
      </button>
      <ul class="dropdown-menu" aria-labelledby="languageDropdown">
        @for (lang of languages; track lang) {
          <li>
            <button 
              class="dropdown-item" 
              [class.active]="lang === languageService.getCurrentLanguage()"
              (click)="switchLanguage(lang)">
              {{ 'LANGUAGE.' + lang.toUpperCase() | translate }}
            </button>
          </li>
        }
      </ul>
    </div>
  `,
  styles: [`
    .dropdown-item.active {
      background-color: var(--bs-primary);
      color: white;
    }
  `]
})
export class LanguageSwitcherComponent {
  languages = this.languageService.availableLanguages;

  constructor(public languageService: LanguageService) {}

  switchLanguage(lang: string): void {
    this.languageService.setLanguage(lang);
  }
}