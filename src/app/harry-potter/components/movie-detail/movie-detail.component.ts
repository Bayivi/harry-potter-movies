import {Component, inject} from '@angular/core';
import {RouterLink} from "@angular/router";
import {MovieDetailService} from "../../services/movie-detail.service";
import {Utils} from "../../utils/Utils";
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css'
})
export class MovieDetailComponent  {
  protected readonly movieDetailService = inject(MovieDetailService);
  protected readonly utils = Utils;
}
