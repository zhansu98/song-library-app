import { Component, OnInit } from '@angular/core';
import { SongService } from '../../services/song.service';
import { Song } from '../../models/song';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css'],
  standalone: false
})
export class SongListComponent implements OnInit {
  songs: Song[] = [];
  filterDate: string = '';
  sortAttribute: string = 'title';
  sortDirection: string = 'asc';

  constructor(private songService: SongService) { }

  ngOnInit(): void {
    this.songService.getSongs().subscribe(songs => {
      this.songs = songs;
    });
  }

  getSongs(): Observable<Song[]> {
    return this.songService.getSongs();
  }

  sortSongs(attribute: keyof Song, order: 'asc' | 'desc' = 'asc'): Song[] {
    return this.songs.slice().sort((a, b) => {
        const aValue = a[attribute];
        const bValue = b[attribute];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
            // Sort strings alphabetically
            return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        } else if (typeof aValue === 'number' && typeof bValue === 'number') {
            // Sort numbers in ascending or descending order
            return order === 'asc' ? aValue - bValue : bValue - aValue;
        } else if (aValue instanceof Date && bValue instanceof Date) {
            // Sort dates in ascending or descending order
            return order === 'asc' ? aValue.getTime() - bValue.getTime() : bValue.getTime() - aValue.getTime();
        } else {
            // Fallback for unsupported types
            return 0;
        }
    });
}

  deleteSong(id: number): void {
    this.songService.deleteSong(id);
    this.songService.getSongs().subscribe(songs => {
      this.songs = songs;
    });
  }
}