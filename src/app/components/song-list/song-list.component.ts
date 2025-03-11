import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SongService } from '../../services/song.service';
import { Song } from '../../models/song';
import { MatTableDataSource } from '@angular/material/table';
import { Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AddSongDialogComponent } from '../add-song-dialog/add-edit-song-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css'],
  standalone: false,
})
export class SongListComponent implements OnInit {
  dataSource = new MatTableDataSource<Song>();
  sortAttribute: keyof Song = 'title';
  sortDirection: string = 'asc';
  displayedColumns: string[] = [
    'title',
    'artist',
    'releaseDate',
    'price',
    'actions',
  ];
  startDate: Date | null = null;
  endDate: Date | null = null;
  fullSongList: Song[] = [];

  readonly dialog = inject(MatDialog);

  constructor(private songService: SongService) {}

  ngOnInit(): void {
    this.getSongs();
    this.fullSongList = this.dataSource.data;
  }

  getSongs(): void {
    this.songService.getSongs().subscribe((songs) => {
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

  openAddDialog(): void {
    this.dialog
      .open(AddSongDialogComponent, {
        data: {
          song: {
            id: -1,
            title: '',
            artist: '',
            releaseDate: new Date(),
            price: 0,
          },
        },
      })
      .afterClosed()
      .subscribe({
        next: (song: Song) => {
          if (song) {
            this.addSong(song);
          }
        },
        error: (err) => {
          console.error('Error opening add song dialog:', err);
        },
      });
  }

  addSong(song: Song): void {
    this.songService.addSong(song).subscribe({
      next: () => {
        this.getSongs();
      },
      error: (err) => {
        console.error('Error adding song:', err);
      },
    });
  }

  deleteSong(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: 'Are you sure you want to delete this song?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.songService.deleteSong(id).subscribe({
          next: () => {
            this.getSongs();
          },
          error: (err) => {
            console.error('Error deleting song:', err);
          },
        });
      }
    });
  }

  applyDateFilter(): void {
    this.dataSource.data = this.fullSongList.filter((song) => {
      if (this.startDate && this.endDate) {
        return (
          song.releaseDate >= this.startDate && song.releaseDate <= this.endDate
        );
      } else if (this.startDate) {
        return song.releaseDate >= this.startDate;
      } else if (this.endDate) {
        return song.releaseDate <= this.endDate;
      } else {
        return true;
      }
    });
  }
}

function compare(
  a: string | number | Date,
  b: string | number | Date,
  isAsc: boolean
): number {
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
