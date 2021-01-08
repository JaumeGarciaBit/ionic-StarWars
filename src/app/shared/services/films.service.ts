import { Injectable } from '@angular/core';
import * as data from "../../../assets/movieCovers.json";


@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  constructor() {}
  getData()
  {
    return data.data;
  }
  getDataById(id : string)
  {
    let l_array : any[] = data.data;
    let l_result = l_array.filter(e => e.id == id)[0];

    return l_result;
  }
}
