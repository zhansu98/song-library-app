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
      title: 'Song 1',
      artist: 'Artist 1',
      releaseDate: new Date('2025-01-01'),
      price: 10,
    },
    {
      id: 2,
      title: 'Song 2',
      artist: 'Artist 2',
      releaseDate: new Date('2025-02-01'),
      price: 20,
    },
    {
      id: 3,
      title: 'Song 3',
      artist: 'Artist 3',
      releaseDate: new Date('2025-03-01'),
      price: 30,
    },
    {
      id: 4,
      title: 'Song 4',
      artist: 'Artist 4',
      releaseDate: new Date('2025-04-01'),
      price: 40,
    },
    {
      id: 5,
      title: 'Song 5',
      artist: 'Artist 5',
      releaseDate: new Date('2025-05-01'),
      price: 50,
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

  deleteSong(id: number): void {
    this.songs = this.songs.filter((song) => song.id !== id);
  }

  updateSong(updatedSong: Song): void {
    const index = this.songs.findIndex((song) => song.id === updatedSong.id);
    if (index !== -1) {
      this.songs[index] = updatedSong;
    }
  }
}
