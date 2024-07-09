import {ComponentFixture, TestBed} from '@angular/core/testing';
import { MovieListComponent } from './movie-list.component';
import {provideHttpClient} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {ActivatedRoute} from "@angular/router";
import {of} from "rxjs";
import {MoviesListService} from "../../services/movies-list.service";

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;
  const movieListServiceSpy = jasmine.createSpyObj(['MoviesListService']);
  const mockMovies = [
    {
      "id": "e80d5a37-620e-4be2-92b9-fb1f5262494f",
      "title": "Harry Potter and the Philosopher's Stone",
      "duration": "152",
      "budget": "125",
      "release_date": "2001-11-04"
    }, {
      "id": "1e04ad42-c21f-40d3-9a7e-0a521980c192",
      "title": "Harry Potter and the Chamber of Secrets",
      "duration": "161",
      "budget": "125",
      "release_date": "2002-11-15"
    }, {
      "id": "ab80790f-0f6d-4ca7-bd7e-e7e1f06e6982",
      "title": "Harry Potter and the Prisoner of Azkaban",
      "duration": "142",
      "budget": "130",
      "release_date": "2002-11-15"
    }
  ]

  movieListServiceSpy.getMoviesList$  = of(mockMovies)
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieListComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {provide:  ActivatedRoute, useValue: {
            snapshot: {
              params: {
                movieId: 1
              },
            },
          },
        },
        {
          provide: MoviesListService, useValue: movieListServiceSpy
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe on filteredAvailableMovies$ to get the available movies list', () => {
    component.filteredAvailableMovies$.subscribe({
      next: (movies) => {
        expect(movies).toBeDefined();
        expect(movies.length).toEqual(mockMovies.length);
      }
    })
  })
});
