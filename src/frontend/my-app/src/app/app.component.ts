import {Component} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

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

  constructor(private http: HttpClient) {
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
          if (this.urls.length > 5) {
            this.urls.pop();
          }
        },
        error => {
          console.error('An error occurred:', error);
        }
      );

  }

  redirectToOriginalUrl(shortUrl: string) {
    window.location.href = `http://localhost:8080/my-app/${shortUrl}`;
  }

}
