import {TestBed} from '@angular/core/testing';
import {MovieDetailService } from './movie-detail.service';
import {HttpClientTestingModule, provideHttpClientTesting} from "@angular/common/http/testing";
import {ActivatedRoute} from "@angular/router";
import {HttpClient, provideHttpClient} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {of} from "rxjs";

describe('MovieDetailService', () => {
  let service: MovieDetailService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let httpClientSpyObj = jasmine.createSpyObj('HttpClient', ['get']);
  const stubActiveRoute = {
    firstChild: {
      snapshot: {
        paramMap: {
          get: 'movieId'
        },
      },
    }
  }
  const mockMovieDetail = {
    "id": "37acb245-c015-4bee-be87-c8f7d93d6d24",
    "title": "Harry Potter and the Half-Blood Prince",
    "duration": "153",
    "budget": "250",
    "release_date": "2009-07-07",
    "box_office": "934.5",
    "cinematographers": [ "Bruno Delbonnel" ],
    "poster": "https://www.wizardingworld.com/images/products/films/rectangle-6.png",
    "producers": [ "David Heyman", "David Barron" ],
    "summary": "The sixth installment in the Harry Potter series begins with Harry accompanying Dumbledore to persuade Horace Slughorn to return to teaching at Hogwarts. Harry suspects Malfoy is now a Death Eater and is determined to find out the truth. Harry eventually becomes Slughorn’s favorite student upon finding a book belonging to the “Half-Blood Prince”. Using this connection, Dumbledore successfully obtains a memory from Slughorn linking to a young Voldemort and his inquiries about Horcruxes. Harry and Dumbledore venture out to find and destroy a Horcrux unaware of the grave fate that awaits them."
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {provide: MovieDetailService, useValue: {
            movieDetail$: of()
          }
        },
        provideHttpClient(),
        provideHttpClientTesting(),
        {provide:  ActivatedRoute, useValue: stubActiveRoute},
        {
          provide: HttpClient,
          useValue: httpClientSpyObj
        }

      ]
    });
    service = TestBed.inject(MovieDetailService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('movieDetail$', () => {
    it('should call movieDetail$ and return an movie detail', () => {
      httpClientSpy.get.and.returnValue(of(mockMovieDetail));
      service.movieDetail$.subscribe((movies) => {
        expect(movies).toBeDefined();
        expect(movies).toEqual(mockMovieDetail);
      });
    });
  });
});
