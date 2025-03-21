import { Component, inject, OnInit } from '@angular/core';
import { SongService } from '../../services/song.service';
import { Song } from '../../models/song';
import { MatTableDataSource } from '@angular/material/table';
import { Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AddEditSongDialogComponent } from '../add-song-dialog/add-edit-song-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { of } from 'rxjs';
import { Title } from '@angular/platform-browser';

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

  /**
   * Section for CRUD operations
   */

  getSongs(): void {
    this.songService.getSongs().subscribe({
      next: (songs) => {
        this.dataSource.data = songs;
        this.fullSongList = songs;
      },
      error: (err) => {
        this.dialog.open(ConfirmationDialogComponent, {
          data: {
            message: 'Error fetching songs, please try again!',
            notification: true,
          },
        });
        console.error('Error fetching songs:', err);
      },
    });
  }

  addSong(song: Song): void {
    this.songService.addSong(song).subscribe({
      next: () => {
        this.getSongs();
      },
      error: (err) => {
        this.dialog.open(ConfirmationDialogComponent, {
          data: {
            title: 'Add Song Error',
            message: 'Server error when adding song, please try again!',
            notification: true,
          },
        });
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
            this.dialog.open(ConfirmationDialogComponent, {
              data: {
                title: 'Error Deleting Song',
                message: 'Server error when deleting song, please try again!',
                notification: true,
              },
            });
            console.error('Error deleting song:', err);
          },
        });
      }
    });
  }

  updateSong(song: Song): void {
    this.songService.updateSong(song).subscribe({
      next: () => {
        this.getSongs();
        this.dialog.open(ConfirmationDialogComponent, {
          data: {
            title: 'Update',
            message: 'Update Successful!',
            notification: true,
          },
        });
      },
      error: (err) => {
        this.dialog.open(ConfirmationDialogComponent, {
          data: {
            title: 'Update Error',
            message: 'Server error when trying to update, please try again!',
            notification: true,
          },
        });
        console.error('Error updating song:', err);
      },
    });
  }

  /**
   * Section for sorting and filtering
   */

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

  applyDateFilter(): void {
    this.dataSource.data = this.fullSongList.slice().filter((song) => {
      if (this.startDate && this.endDate) {
        return (
          new Date(song.releaseDate) >= this.startDate &&
          new Date(song.releaseDate) <= this.endDate
        );
      } else if (this.startDate) {
        return new Date(song.releaseDate) >= this.startDate;
      } else if (this.endDate) {
        return new Date(song.releaseDate) <= this.endDate;
      } else {
        return true;
      }
    });
  }

  /**
   * Section for dialog operations
   */

  openEditDialog(song: Song): void {
    this.dialog
      .open(AddEditSongDialogComponent, {
        data: {
          title: 'Edit Song Details',
          message: 'Edit the details of the song below:',
          song: {
            id: song.id,
            title: song.title,
            artist: song.artist,
            releaseDate: song.releaseDate,
            price: song.price,
          },
        },
      })
      .afterClosed()
      .subscribe({
        next: (result: any) => {
          if (result) {
            this.updateSong(result);
          }
        },
        error: (err) => {
          console.error('Error opening add song dialog:', err);
        },
      });
  }

  openAddDialog(): void {
    this.dialog
      .open(AddEditSongDialogComponent, {
        data: {
          title: 'Enter New Song Details',
          message: 'Add the details of the new song below:',
          song: {
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
