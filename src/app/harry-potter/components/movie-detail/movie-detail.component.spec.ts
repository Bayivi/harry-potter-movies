import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieDetailComponent } from './movie-detail.component';
import {of} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideHttpClient} from "@angular/common/http";
import {MovieDetailService} from "../../services/movie-detail.service";

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;
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
  const movieDetailServiceSpy = jasmine.createSpyObj(['MovieDetailService']);
  movieDetailServiceSpy.movieDetail$  = of(mockMovieDetail)



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieDetailComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {provide:  ActivatedRoute, useValue: stubActiveRoute},
        {
          provide: MovieDetailService, useValue: movieDetailServiceSpy
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check movieDetail of defined', () => {
    expect(fixture.debugElement.nativeElement.querySelector('h2')?.textContent).toBeDefined();
    expect(fixture.debugElement.nativeElement.querySelector('h2').textContent).toEqual(mockMovieDetail.title)
  })
});
