import { Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguage = signal<string>('en');
  public availableLanguages = ['en', 'es', 'fr', 'de', 'ar'];

  constructor(private translateService: TranslateService) {
    // Add all languages to the translate service
    this.translateService.addLangs(this.availableLanguages);
    
    // Set default language
    this.translateService.setDefaultLang('en');
    
    // Use browser language if available, otherwise use English
    const browserLang = this.translateService.getBrowserLang();
    const langToUse = browserLang && this.availableLanguages.includes(browserLang) ? browserLang : 'en';
    
    // Initialize with the selected language
    this.setLanguage(langToUse);
  }

  setLanguage(lang: string): void {
    this.currentLanguage.set(lang);
    this.translateService.use(lang);
    document.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }

  getCurrentLanguage(): string {
    return this.currentLanguage();
  }
}