import {Movie} from "./movie.model";

export interface MovieDetail extends Movie{
  box_office: string,
  cinematographers: string [],
  poster: string,
  producers: string [],
  summary: string
}
