import { Injectable } from '@angular/core';
import {BehaviorSubject, firstValueFrom} from "rxjs";
import {Movie} from "../interface/movie.model";
import {HttpClient} from "@angular/common/http";

const DEFAULT_MOVIE_LIST: Movie [] = [
  {
    id: '',
    title: '',
    duration: '',
    budget: '',
    release_date: ''
  }
];
@Injectable({
  providedIn: 'root'
})
export class MoviesListService {

  private readonly _availableMovies = new BehaviorSubject<Movie[]>(DEFAULT_MOVIE_LIST)
  public getMoviesList$ = this._availableMovies.asObservable();
  private readonly isLoading = new BehaviorSubject(true);
  public isLoading$ = this.isLoading.asObservable();
  constructor(private readonly http : HttpClient) {
    this.fetchMoviesList().then(() => this.isLoading.next(false))
  }


  private async fetchMoviesList(): Promise<void> {
    const moviesList = await firstValueFrom(this.http.get<Movie[]>('/movies')
     // .pipe(delay(3000))
    )
    this._availableMovies.next(moviesList)
  }
}
