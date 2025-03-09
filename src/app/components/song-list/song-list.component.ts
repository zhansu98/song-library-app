import { Component, OnInit } from '@angular/core';
import { SongService } from '../../services/song.service';
import { Song } from '../../models/song';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css'],
  standalone: false
})
export class SongListComponent implements OnInit {
  songs: Song[] = [];
  private sortAttribute: string = 'title';
  private sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private songService: SongService) { }

  ngOnInit(): void {
    this.getSongs();
  }

  getSongs(): void {
    this.songService.getSongs().subscribe(songs => {
      this.songs = songs;
      this.sortSongs(this.sortAttribute);
    });
  }

  sortSongs(attribute: string): void {
    this.sortAttribute = attribute;
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.songs.sort((a, b) => {
      const aValue = a[attribute];
      const bValue = b[attribute];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return this.sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        return this.sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      } else if (aValue instanceof Date && bValue instanceof Date) {
        return this.sortDirection === 'asc' ? aValue.getTime() - bValue.getTime() : bValue.getTime() - aValue.getTime();
      } else {
        return 0;
      }
    });
  }

  deleteSong(id: number): void {
    // this.songService.deleteSong(id).subscribe(() => {
    //   this.getSongs();
    // });
  }
}