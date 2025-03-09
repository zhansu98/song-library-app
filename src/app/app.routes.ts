import { Routes } from '@angular/router';
import { SongListComponent } from './components/song-list/song-list.component';

export const routes: Routes = [
  { path: '', component: SongListComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];