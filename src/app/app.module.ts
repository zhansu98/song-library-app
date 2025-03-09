import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { SongService } from './services/song.service';
import { SongListComponent } from "./components/song-list/song-list.component";
import { MockBackendService } from './services/mock-backend.service';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SongListComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    BrowserModule,
],
providers: [
  SongService,
  MockBackendService,
  CurrencyPipe,
  DatePipe,
  provideHttpClient()
],
  bootstrap: [AppComponent]
})
export class AppModule { }
