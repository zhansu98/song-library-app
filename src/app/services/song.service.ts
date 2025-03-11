import { Injectable } from '@angular/core';
import { Song } from '../models/song';
import { of, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SongService {
  private songs: Song[] = [
    {
      id: 1,
      title: 'Bohemian Rhapsody',
      artist: 'Queen',
      releaseDate: new Date('1975-10-31'),
      price: 1.29,
    },
    {
      id: 2,
      title: 'Hotel California',
      artist: 'Eagles',
      releaseDate: new Date('1977-02-26'),
      price: 1.49,
    },
    {
      id: 3,
      title: 'Smells Like Teen Spirit',
      artist: 'Nirvana',
      releaseDate: new Date('1991-09-10'),
      price: 1.19,
    },
    {
      id: 4,
      title: 'Rolling in the Deep',
      artist: 'Adele',
      releaseDate: new Date('2010-11-29'),
      price: 1.39,
    },
    {
      id: 5,
      title: 'Shape of You',
      artist: 'Ed Sheeran',
      releaseDate: new Date('2017-01-06'),
      price: 1.59,
    },
    {
      id: 6,
      title: 'Uptown Funk',
      artist: 'Mark Ronson ft. Bruno Mars',
      releaseDate: new Date('2014-11-10'),
      price: 1.49,
    },
    {
      id: 7,
      title: 'Billie Jean',
      artist: 'Michael Jackson',
      releaseDate: new Date('1983-01-02'),
      price: 1.29,
    },
    {
      id: 8,
      title: 'Stairway to Heaven',
      artist: 'Led Zeppelin',
      releaseDate: new Date('1971-11-08'),
      price: 1.69,
    },
    {
      id: 9,
      title: 'Blinding Lights',
      artist: 'The Weeknd',
      releaseDate: new Date('2019-11-29'),
      price: 1.49,
    },
    {
      id: 10,
      title: 'Hey Jude',
      artist: 'The Beatles',
      releaseDate: new Date('1968-08-26'),
      price: 1.19,
    },
  ];

  constructor() {}

  getSongs(): Observable<Song[]> {
    return of(this.songs);
  }

  addSong(song: Song): Observable<Song> {
    // Simulate an API call
    return of(song).pipe(
      tap((newSong) => {
        newSong.id = this.songs.length + 1;
        this.songs.push(newSong);
      })
    );
  }

  deleteSong(id: number): Observable<number> {
    // Simulate an API call
    return of(id).pipe(
      tap(() => {
        this.songs = this.songs.filter((song) => song.id !== id);
      })
    );
  }

  updateSong(updatedSong: Song): Observable<Song> {
    // Simulate an API call
    return of(updatedSong).pipe(
      tap((song) => {
        const index = this.songs.findIndex((s) => s.id === song.id);
        if (index !== -1) {
          this.songs[index] = song;
        }
      })
    );
  }
}
