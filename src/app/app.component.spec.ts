import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SongListComponent } from './components/song-list/song-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, SongListComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatCardModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatInputModule,
        FormsModule,
        MatTableModule,
      ],
      providers: [provideNativeDateAdapter()],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'song-library-app' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('song-library-app');
  });
});
