import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ErrorModalComponent} from './error-modal/error-modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import {SuccessModalComponent} from './success-modal/success-modal.component';
import { ExpiredModalComponent } from './expired-modal/expired-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorModalComponent,
    SuccessModalComponent,
    ExpiredModalComponent
  ],
  imports: [
    MatInputModule,
    MatButtonModule,
    MatListModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
