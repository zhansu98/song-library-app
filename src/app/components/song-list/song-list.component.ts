import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SongService } from '../../services/song.service';
import { Song } from '../../models/song';
import { MatTableDataSource } from '@angular/material/table';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css'],
  standalone: false
})
export class SongListComponent implements OnInit{
  dataSource = new MatTableDataSource<Song>();
  sortAttribute: keyof Song = 'title';
  sortDirection: string = 'asc';
  displayedColumns: string[] = ['title', 'artist', 'releaseDate', 'price', 'actions'];

  constructor(private songService: SongService) { }

  ngOnInit(): void {
    this.getSongs();
  }

  getSongs(): void {
    this.songService.getSongs().subscribe(songs => {
      this.dataSource.data = songs;
    });
  }

  sortData(sort: Sort): void {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'title':
          return compare(a.title, b.title, isAsc);
        case 'artist':
          return compare(a.artist, b.artist, isAsc);
        case 'releaseDate':
          return compare(a.releaseDate, b.releaseDate, isAsc);
        case 'price':
          return compare(a.price, b.price, isAsc);
        default:
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

function compare(a: string | number | Date, b: string | number | Date, isAsc: boolean): number {
  if (a instanceof Date && b instanceof Date) {
    return (a.getTime() - b.getTime()) * (isAsc ? 1 : -1);
  } else if (typeof a === 'number' && typeof b === 'number') {
    return (a - b) * (isAsc ? 1 : -1);
  } else if (typeof a === 'string' && typeof b === 'string') {
    return a.localeCompare(b) * (isAsc ? 1 : -1);
  } else {
    return 0;
  }
}
