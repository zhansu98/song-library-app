import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { SongService } from './services/song.service';
import { SongListComponent } from './components/song-list/song-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AddSongDialogComponent } from './components/add-song-dialog/add-song-dialog.component';

@NgModule({
  declarations: [AppComponent, SongListComponent, AddSongDialogComponent],
  imports: [
    CommonModule,
    RouterOutlet,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    //Materials
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    FormsModule,
    MatInputModule,
    MatSidenavModule,
    MatDialogModule,
  ],
  providers: [SongService, CurrencyPipe, DatePipe, provideNativeDateAdapter()],
  bootstrap: [AppComponent],
})
export class AppModule {}
