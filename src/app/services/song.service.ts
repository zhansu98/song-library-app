import { Injectable } from '@angular/core';
import { Song } from '../models/song';
import { of, Observable, tap, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SongService {
  apiUrl = '/api/songs';

  constructor(private http: HttpClient) {}

  getSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(this.apiUrl).pipe(
      catchError((error: any) => {
        console.error('Error fetching songs:', error);
        return throwError(() => error);
      })
    );
  }

  addSong(song: Song): Observable<Song> {
    return this.http.post<Song>(this.apiUrl, song).pipe(
      // tap((newSong) => {
      //   console.log('newSong', JSON.stringify(newSong));
      // }),
      catchError((error: any) => {
        return throwError(() => error);
      })
    );
  }

  deleteSong(id: number): Observable<number> {
    return this.http.delete<number>(`${this.apiUrl}/${id}`).pipe(
      // tap(() => {
      //   console.log(`Deleted song with id: ${id}`);
      // }),
      catchError((error: any) => {
        return throwError(() => error);
      })
    );
  }

  updateSong(updatedSong: Song): Observable<Song> {
    return this.http
      .put<Song>(`${this.apiUrl}/${updatedSong.id}`, updatedSong)
      .pipe(
        // tap((song) => {
        //   console.log('Updated song:', JSON.stringify(song));
        // }),
        catchError((error: any) => {
          return throwError(() => error);
        })
      );
  }
}
