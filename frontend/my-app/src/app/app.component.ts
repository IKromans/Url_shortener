import {Component} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {ErrorModalComponent} from './error-modal/error-modal.component';
import {SuccessModalComponent} from './success-modal/success-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  longUrl = '';
  expiresDate = '';
  shortUrl = '';
  urls: string[] = [];

  constructor(private http: HttpClient, public dialog: MatDialog) {
  }

  convertToShortUrl(longUrl: string, expiresDate: string) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    const urlLongRequest = {
      longUrl: longUrl,
      expiresDate: expiresDate
    };

    this.http.post('http://localhost:8080/my-app/shorten', urlLongRequest, httpOptions)
      .subscribe(
        (shortUrl: any) => {
          this.shortUrl = shortUrl.shortUrl;
          this.longUrl = '';
          this.expiresDate = '';
          this.urls.unshift(this.shortUrl);
          this.dialog.open(SuccessModalComponent);
          if (this.urls.length > 5) {
            this.urls.pop();
          }
        },
        error => {
          let errorMessage = "Url is not valid, check if protocol is included, please try again.";
          if (error.error && error.error.message) {
            errorMessage = error.error.message;
          }
          this.dialog.open(ErrorModalComponent, {
            data: {errorMessage: errorMessage}
          });
        }
      );
  }

  redirectToOriginalUrl(shortUrl: string) {
    window.open(`http://localhost:8080/my-app/${shortUrl}`, '_blank');
  }
}
