import {Injectable} from '@angular/core';
import {BehaviorSubject, filter, firstValueFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MovieDetail} from "../interface/movie-detail.model";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: 'root'
})
export class MovieDetailService {
  private readonly _movieDetail = new BehaviorSubject<MovieDetail | null>(null);
  public movieDetail$ =  this._movieDetail.asObservable();
  private readonly _isLoading = new BehaviorSubject(true);
  public isLoading$ = this._isLoading.asObservable();
  constructor(
    private readonly http: HttpClient,
    private readonly route: ActivatedRoute,
    private readonly router: Router) {
    this.initRouteListener();
  }

  private initRouteListener() {
    this.router.events.pipe(
      takeUntilDestroyed(),
      filter(event => event instanceof NavigationEnd),
    ).subscribe(() => {
      const route = this.route.firstChild
      const movieId = route?.snapshot.paramMap.get('movieId')
      if (!!movieId) {
        this.fetchMovieDetail(movieId).then(() => this._isLoading.next(false))
      }
    })
  }

  private async fetchMovieDetail(movieId: string): Promise<void> {
    const detail = await firstValueFrom(this.http.get<MovieDetail>(`/movies/${movieId}`)
   // .pipe(delay(3000))
    )
    this._movieDetail.next(detail)
  }
}
