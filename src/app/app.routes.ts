import { Routes } from '@angular/router';
import {MovieListComponent} from "./harry-potter/components/movie-list/movie-list.component";
import {MovieDetailComponent} from "./harry-potter/components/movie-detail/movie-detail.component";

export const routes: Routes = [
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  { path: 'movies', component: MovieListComponent },
  { path: 'movies/:movieId', component: MovieDetailComponent}
];
