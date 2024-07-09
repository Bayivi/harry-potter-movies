import {Component, inject} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {MoviesListService} from "../../services/movies-list.service";
import {combineLatest, debounceTime, map, Observable, startWith} from "rxjs";
import {Utils} from "../../utils/Utils";
import {Movie} from "../../interface/movie.model";
@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    AsyncPipe,
    ReactiveFormsModule,
    RouterLink,
    FormsModule,
  ],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent  {
  public filterByReleaseYear =  new FormControl('');
  public filterByTitle =  new FormControl('');
  protected readonly moviesListService = inject(MoviesListService)
  private readonly availableMovies$ = this.moviesListService.getMoviesList$;
  protected readonly utils = Utils;
  private readonly filterByTitle$= this.filterByTitle.valueChanges
    .pipe(
      debounceTime(500),
      startWith('')
    );
  private readonly filterByReleaseYear$ = this.filterByReleaseYear.valueChanges
    .pipe(
      debounceTime(500),
      startWith('')
    )
  public filteredAvailableMovies$: Observable<Movie[]> = combineLatest([this.availableMovies$, this.filterByTitle$, this.filterByReleaseYear$])
    .pipe(
      map(([movies, titleFilter, releaseFilter]) => {
        let result = movies
        if (!!titleFilter) {
          result =  result.filter(movie => movie.title.toLowerCase().indexOf(titleFilter.toLowerCase()) !== -1);
        }
        if (!!releaseFilter) {
          result =  result.filter(movie =>  movie.release_date.split("-")[0].toLowerCase().indexOf(releaseFilter.toLowerCase()) !== -1)
        }
        return result;
      }));
}
