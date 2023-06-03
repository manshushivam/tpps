import { Component } from '@angular/core';


declare const google: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  hindiText?: string;

  ngOnInit() {
    const googleScript = document.createElement('script');
    googleScript.src = 'https://www.google.com/jsapi';
    googleScript.async = true;
    googleScript.defer = true;
    googleScript.onload = () => {
      this.loadGoogleInputTools();
    };
    document.body.appendChild(googleScript);
  }

  loadGoogleInputTools() {
    google.load('', '1', {
      callback: () => {
        const options = {
          sourceLanguage: google.elements.transliteration.LanguageCode.ENGLISH,
          destinationLanguage: google.elements.transliteration.LanguageCode.HINDI,
          transliterationEnabled: true,
        };

        const transliterationControl = new google.elements.transliteration.TransliterationControl(options);
        transliterationControl.transliterate((englishToHindi: string) => {
          this.hindiText = englishToHindi;
        });
      },
    });
  }

  convertToHindi(event: Event) {
    const englishText = (event.target as HTMLInputElement).value;
    if (!englishText) return;

    this.loadGoogleInputTools(); // Make sure Google Input Tools API is loaded before transliterating

    const options = {
      sourceLanguage: google.elements.transliteration.LanguageCode.ENGLISH,
      destinationLanguage: google.elements.transliteration.LanguageCode.HINDI,
      transliterationEnabled: true,
    };

    const transliterationControl = new google.elements.transliteration.TransliterationControl(options);
    transliterationControl.transliterate((englishToHindi: string) => {
      this.hindiText = englishToHindi;
    });
  }
}
