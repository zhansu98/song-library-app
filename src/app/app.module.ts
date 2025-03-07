import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    BrowserModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
