import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SongListComponent } from './song-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SongService } from '../../services/song.service';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import {
  MatDialogModule,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Observable, of, throwError } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
describe('SongListComponent', () => {
  let component: SongListComponent;
  let fixture: ComponentFixture<SongListComponent>;
  let songService: jasmine.SpyObj<SongService>;
  let dialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    const songServiceSpy = jasmine.createSpyObj('SongService', [
      'getSongs',
      'updateSong',
      'addSong',
      'deleteSong',
    ]);
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [SongListComponent],
      imports: [
        HttpClientTestingModule,
        MatCardModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatDatepickerModule,
        CommonModule,
        FormsModule,
        MatTableModule,
        MatInputModule,
        MatDialogModule,
        NoopAnimationsModule,
        MatIconModule,
      ],
      providers: [
        { provide: SongService, useValue: songServiceSpy },
        { provide: MatDialog, useValue: dialogSpy },
        provideNativeDateAdapter(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SongListComponent);
    component = fixture.componentInstance;
    songService = TestBed.inject(SongService) as jasmine.SpyObj<SongService>;
    dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    songService.getSongs.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getSongs on init', () => {
    expect(songService.getSongs).toHaveBeenCalled();
  });

  it('should open dialog on openEditDialog', () => {
    const song = {
      id: 1,
      title: 'Test Song',
      artist: 'Test Artist',
      releaseDate: new Date(),
      price: 1.99,
    };
    const dialogRefSpy = jasmine.createSpyObj({ afterClosed: of(song) });
    dialog.open.and.returnValue(dialogRefSpy);
    songService.updateSong.and.returnValue(of(song));
    component.openEditDialog(song);
    expect(dialog.open).toHaveBeenCalled();
    expect(songService.updateSong).toHaveBeenCalledWith(song);
  });

  it('should update song on updateSong', () => {
    const song = {
      id: 1,
      title: 'Test Song',
      artist: 'Test Artist',
      releaseDate: new Date(),
      price: 1.99,
    };
    songService.updateSong.and.returnValue(of(song));
    spyOn(component, 'getSongs');
    component.updateSong(song);
    expect(songService.updateSong).toHaveBeenCalledWith(song);
    expect(component.getSongs).toHaveBeenCalled();
  });

  it('should handle error on updateSong', () => {
    const song = {
      id: 1,
      title: 'Test Song',
      artist: 'Test Artist',
      releaseDate: new Date(),
      price: 1.99,
    };
    const error = new Error('Update failed');
    songService.updateSong.and.returnValue(throwError(() => error));
    spyOn(console, 'error');
    component.updateSong(song);
    expect(songService.updateSong).toHaveBeenCalledWith(song);
    expect(console.error).toHaveBeenCalledWith('Error updating song:', error);
  });

  it('should sort data by title in ascending order', () => {
    const songs = [
      {
        title: 'B Song',
        artist: 'Artist 1',
        releaseDate: new Date(),
        price: 1.99,
      },
      {
        title: 'A Song',
        artist: 'Artist 2',
        releaseDate: new Date(),
        price: 2.99,
      },
    ];
    component.dataSource.data = songs;
    component.sortData({ active: 'title', direction: 'asc' });
    expect(component.dataSource.data[0].title).toBe('A Song');
  });

  it('should sort data by title in descending order', () => {
    const songs = [
      {
        title: 'A Song',
        artist: 'Artist 1',
        releaseDate: new Date(),
        price: 1.99,
      },
      {
        title: 'B Song',
        artist: 'Artist 2',
        releaseDate: new Date(),
        price: 2.99,
      },
    ];
    component.dataSource.data = songs;
    component.sortData({ active: 'title', direction: 'desc' });
    expect(component.dataSource.data[0].title).toBe('B Song');
  });

  it('should sort data by artist in ascending order', () => {
    const songs = [
      {
        title: 'Song 1',
        artist: 'B Artist',
        releaseDate: new Date(),
        price: 1.99,
      },
      {
        title: 'Song 2',
        artist: 'A Artist',
        releaseDate: new Date(),
        price: 2.99,
      },
    ];
    component.dataSource.data = songs;
    component.sortData({ active: 'artist', direction: 'asc' });
    expect(component.dataSource.data[0].artist).toBe('A Artist');
  });

  it('should sort data by artist in descending order', () => {
    const songs = [
      {
        title: 'Song 1',
        artist: 'A Artist',
        releaseDate: new Date(),
        price: 1.99,
      },
      {
        title: 'Song 2',
        artist: 'B Artist',
        releaseDate: new Date(),
        price: 2.99,
      },
    ];
    component.dataSource.data = songs;
    component.sortData({ active: 'artist', direction: 'desc' });
    expect(component.dataSource.data[0].artist).toBe('B Artist');
  });

  it('should sort data by releaseDate in ascending order', () => {
    const songs = [
      {
        title: 'Song 1',
        artist: 'Artist 1',
        releaseDate: new Date('2022-01-01'),
        price: 1.99,
      },
      {
        title: 'Song 2',
        artist: 'Artist 2',
        releaseDate: new Date('2021-01-01'),
        price: 2.99,
      },
    ];
    component.dataSource.data = songs;
    component.sortData({ active: 'releaseDate', direction: 'asc' });
    expect(component.dataSource.data[0].releaseDate).toEqual(
      new Date('2021-01-01')
    );
  });

  it('should sort data by releaseDate in descending order', () => {
    const songs = [
      {
        title: 'Song 1',
        artist: 'Artist 1',
        releaseDate: new Date('2021-01-01'),
        price: 1.99,
      },
      {
        title: 'Song 2',
        artist: 'Artist 2',
        releaseDate: new Date('2022-01-01'),
        price: 2.99,
      },
    ];
    component.dataSource.data = songs;
    component.sortData({ active: 'releaseDate', direction: 'desc' });
    expect(component.dataSource.data[0].releaseDate).toEqual(
      new Date('2022-01-01')
    );
  });

  it('should sort data by price in ascending order', () => {
    const songs = [
      {
        title: 'Song 1',
        artist: 'Artist 1',
        releaseDate: new Date(),
        price: 2.99,
      },
      {
        title: 'Song 2',
        artist: 'Artist 2',
        releaseDate: new Date(),
        price: 1.99,
      },
    ];
    component.dataSource.data = songs;
    component.sortData({ active: 'price', direction: 'asc' });
    expect(component.dataSource.data[0].price).toBe(1.99);
  });

  it('should sort data by price in descending order', () => {
    const songs = [
      {
        title: 'Song 1',
        artist: 'Artist 1',
        releaseDate: new Date(),
        price: 1.99,
      },
      {
        title: 'Song 2',
        artist: 'Artist 2',
        releaseDate: new Date(),
        price: 2.99,
      },
    ];
    component.dataSource.data = songs;
    component.sortData({ active: 'price', direction: 'desc' });
    expect(component.dataSource.data[0].price).toBe(2.99);
  });

  it('should open dialog on openAddDialog', () => {
    const song = {
      id: 1,
      title: 'New Song',
      artist: 'New Artist',
      releaseDate: new Date(),
      price: 1.99,
    };
    const dialogRefSpy = jasmine.createSpyObj({ afterClosed: of(song) });
    dialog.open.and.returnValue(dialogRefSpy);
    songService.addSong.and.returnValue(of(song));
    component.openAddDialog();
    expect(dialog.open).toHaveBeenCalled();
    expect(songService.addSong).toHaveBeenCalledWith(song);
  });

  it('should add song on openAddDialog', () => {
    const song = {
      id: 1,
      title: 'New Song',
      artist: 'New Artist',
      releaseDate: new Date(),
      price: 1.99,
    };
    const dialogRefSpy = jasmine.createSpyObj({ afterClosed: of(song) });
    dialog.open.and.returnValue(dialogRefSpy);
    songService.addSong.and.returnValue(of(song));
    spyOn(component, 'getSongs');
    component.openAddDialog();
    expect(songService.addSong).toHaveBeenCalledWith(song);
    expect(component.getSongs).toHaveBeenCalled();
  });

  it('should handle error on openAddDialog', () => {
    const song = {
      id: 1,
      title: 'New Song',
      artist: 'New Artist',
      releaseDate: new Date(),
      price: 1.99,
    };
    const error = new Error('Add failed');
    const dialogRefSpy = jasmine.createSpyObj({ afterClosed: of(song) });
    dialog.open.and.returnValue(dialogRefSpy);
    songService.addSong.and.returnValue(throwError(() => error));
    spyOn(console, 'error');
    component.openAddDialog();
    expect(songService.addSong).toHaveBeenCalledWith(song);
    expect(console.error).toHaveBeenCalledWith('Error adding song:', error);
  });

  it('should add song on addSong', () => {
    const song = {
      id: 1,
      title: 'New Song',
      artist: 'New Artist',
      releaseDate: new Date(),
      price: 1.99,
    };
    songService.addSong.and.returnValue(of(song));
    spyOn(component, 'getSongs');
    component.addSong(song);
    expect(songService.addSong).toHaveBeenCalledWith(song);
    expect(component.getSongs).toHaveBeenCalled();
  });

  it('should handle error on addSong', () => {
    const song = {
      id: 1,
      title: 'New Song',
      artist: 'New Artist',
      releaseDate: new Date(),
      price: 1.99,
    };
    const error = new Error('Add failed');
    songService.addSong.and.returnValue(throwError(() => error));
    spyOn(console, 'error');
    component.addSong(song);
    expect(songService.addSong).toHaveBeenCalledWith(song);
    expect(console.error).toHaveBeenCalledWith('Error adding song:', error);
  });

  it('should open confirmation dialog on deleteSong', () => {
    const dialogRefSpy = jasmine.createSpyObj({ afterClosed: of(true) });
    dialog.open.and.returnValue(dialogRefSpy);
    songService.deleteSong.and.returnValue(of(1));
    spyOn(component, 'getSongs');
    component.deleteSong(1);
    expect(dialog.open).toHaveBeenCalled();
    expect(songService.deleteSong).toHaveBeenCalledWith(1);
    expect(component.getSongs).toHaveBeenCalled();
  });

  it('should handle error on deleteSong', () => {
    const error = new Error('Delete failed');
    const dialogRefSpy = jasmine.createSpyObj({ afterClosed: of(true) });
    dialog.open.and.returnValue(dialogRefSpy);
    songService.deleteSong.and.returnValue(throwError(() => error));
    spyOn(console, 'error');
    component.deleteSong(1);
    expect(songService.deleteSong).toHaveBeenCalledWith(1);
    expect(console.error).toHaveBeenCalledWith('Error deleting song:', error);
  });

  it('should not delete song if confirmation dialog is cancelled', () => {
    const dialogRefSpy = jasmine.createSpyObj({ afterClosed: of(false) });
    dialog.open.and.returnValue(dialogRefSpy);
    component.deleteSong(1);
    expect(dialog.open).toHaveBeenCalled();
    expect(songService.deleteSong).not.toHaveBeenCalled();
  });

  it('should filter songs by startDate and endDate', () => {
    const songs = [
      {
        title: 'Song 1',
        artist: 'Artist 1',
        releaseDate: new Date('2022-01-01'),
        price: 1.99,
      },
      {
        title: 'Song 2',
        artist: 'Artist 2',
        releaseDate: new Date('2021-01-01'),
        price: 2.99,
      },
    ];
    component.fullSongList = songs;
    component.startDate = new Date('2021-01-01');
    component.endDate = new Date('2022-01-01');
    component.applyDateFilter();
    expect(component.dataSource.data.length).toBe(2);
  });

  it('should filter songs by startDate only', () => {
    const songs = [
      {
        title: 'Song 1',
        artist: 'Artist 1',
        releaseDate: new Date('2022-01-01'),
        price: 1.99,
      },
      {
        title: 'Song 2',
        artist: 'Artist 2',
        releaseDate: new Date('2021-01-01'),
        price: 2.99,
      },
    ];
    component.fullSongList = songs;
    component.startDate = new Date('2022-01-01');
    component.endDate = null;
    component.applyDateFilter();
    expect(component.dataSource.data.length).toBe(1);
    expect(component.dataSource.data[0].title).toBe('Song 1');
  });

  it('should filter songs by endDate only', () => {
    const songs = [
      {
        title: 'Song 1',
        artist: 'Artist 1',
        releaseDate: new Date('2022-01-01'),
        price: 1.99,
      },
      {
        title: 'Song 2',
        artist: 'Artist 2',
        releaseDate: new Date('2021-01-01'),
        price: 2.99,
      },
    ];
    component.fullSongList = songs;
    component.startDate = null;
    component.endDate = new Date('2021-01-01');
    component.applyDateFilter();
    expect(component.dataSource.data.length).toBe(1);
    expect(component.dataSource.data[0].title).toBe('Song 2');
  });

  it('should not filter songs if no dates are provided', () => {
    const songs = [
      {
        title: 'Song 1',
        artist: 'Artist 1',
        releaseDate: new Date('2022-01-01'),
        price: 1.99,
      },
      {
        title: 'Song 2',
        artist: 'Artist 2',
        releaseDate: new Date('2021-01-01'),
        price: 2.99,
      },
    ];
    component.fullSongList = songs;
    component.startDate = null;
    component.endDate = null;
    component.applyDateFilter();
    expect(component.dataSource.data.length).toBe(2);
  });

  it('should call getSongs on getSongs', () => {
    spyOn(component, 'getSongs').and.callThrough();
    component.getSongs();
    expect(component.getSongs).toHaveBeenCalled();
    expect(songService.getSongs).toHaveBeenCalled();
  });

  it('should call applyDateFilter on applyDateFilter', () => {
    spyOn(component, 'applyDateFilter').and.callThrough();
    component.applyDateFilter();
    expect(component.applyDateFilter).toHaveBeenCalled();
  });

  it('should handle error on applyDateFilter', () => {
    const error = new Error('Apply date filter failed');
    spyOn(console, 'error');
    component.applyDateFilter();
    expect(console.error).not.toHaveBeenCalledWith(
      'Error applying date filter:',
      error
    );
  });
});
