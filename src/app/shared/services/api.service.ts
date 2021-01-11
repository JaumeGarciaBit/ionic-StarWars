import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService{

  private _url : string = "http://swapi.tech/api/";

  constructor(private http : HttpClient) {}

  getFilms$(): Observable<any>
  {
    return this.http.get(this._url+"films/");
  }

  getFilmById$(id): Observable<any>
  {
    return this.http.get(this._url+"films/"+id)
  }

  getPeople$(): Observable<any>
  {
    return this.http.get(this._url+"people/");
  }

  getPeopleById$(id): Observable<any>
  {
    return this.http.get(this._url+"people/"+id)
  }

  getPlanets$(): Observable<any>
  {
    return this.http.get(this._url+"planets/");
  }

  getPlanetById$(id): Observable<any>
  {
    return this.http.get(this._url+"planets/"+id)
  }
}
