import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'translationDebug',
  standalone: true
})
export class TranslationDebugPipe implements PipeTransform {
  constructor(private translate: TranslateService) {}

  transform(key: string): string {
    const translation = this.translate.instant(key);
    console.log(`Translation key: ${key}, Result:`, translation);
    return translation === key ? `[Missing: ${key}]` : translation;
  }
}