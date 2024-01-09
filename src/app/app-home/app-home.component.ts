import { Component } from '@angular/core';
import { ApicallService } from '../apicall.service';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-app-home',
  templateUrl: './app-home.component.html',
  styleUrls: ['./app-home.component.scss']
})
export class AppHomeComponent {
  selectedLanguage: string = '';
  isLanguageMenuOpen: boolean = false;
  searchQuery: string = '';
constructor(private apiCall:ApicallService, private httpclient:HttpClient){}
  changeLanguage(languageCode: string): void {
    // Implement language change logic here
    this.selectedLanguage = languageCode;
    this.hideLanguageMenu(); // Hide the language menu when a language is selected
  }

  showLanguageMenu(): void {
    this.isLanguageMenuOpen = true;
  }

  hideLanguageMenu(): void {
    this.isLanguageMenuOpen = false;
  }

  performSearch(): void {
    // Implement your search logic here
  }
  generatePdf(): void {
    console.log('Calling generatepdf()');
    this.apiCall.generatePDF().subscribe(
      response => {
        console.log('PDF generated successfully');
        // You can handle the response or download the PDF here if needed
      },
      error => {
        console.error('Error generating PDF', error);
      }
    );
  }
}