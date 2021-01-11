import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class NonBlockingResolver implements Resolve<Observable<any>>{

  constructor(private api:ApiService) { }

  resolve(){
    const dataObservable = this.api.getPeople$()

    const observablePromise = Promise.resolve(dataObservable);
    return observablePromise;
  }
}
