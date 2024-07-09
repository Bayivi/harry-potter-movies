import { TestBed } from '@angular/core/testing';
import { MoviesListService } from './movies-list.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";

describe('MoviesListService', () => {
  let service: MoviesListService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let httpClientSpyObj = jasmine.createSpyObj('HttpClient', ['get']);
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
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: MoviesListService, useValue: {
            getMoviesList$: of(),
          }
        },
        {
          provide: HttpClient,
          useValue: httpClientSpyObj
        }
      ]
    });
    service = TestBed.inject(MoviesListService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('getMoviesList$', () => {
    it('should call getMoviesList$ and return an movies array', () => {
      httpClientSpy.get.and.returnValue(of(mockMovies));
      service.getMoviesList$.subscribe((movies) => {
        expect(movies).toBeDefined();
        expect(movies).toEqual(mockMovies);
        expect(movies.length).toEqual(mockMovies.length)
      });
    });
  });
});
