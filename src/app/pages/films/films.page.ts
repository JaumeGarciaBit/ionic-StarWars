import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../../shared/services/api.service';
import { FilmsService } from '../../shared/services/films.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.page.html',
  styleUrls: ['./films.page.scss'],
})
export class FilmsPage implements OnInit {
  routeResolveData:any;
  films : Observable<any>;

  constructor(private route:ActivatedRoute, private router : Router, private fs : FilmsService, private as : ApiService) { }

  ngOnInit() {
    if(this.route && this.route.data){
  
      const promiseObservable = this.route.data;    

      if(promiseObservable){

        promiseObservable.subscribe(promiseValue =>{
          const dataObservable = promiseValue['items'];
          if(dataObservable){
            dataObservable.subscribe(observableValue =>{
              const pageData: any = observableValue;
              if(pageData){
                this.routeResolveData = pageData;
              }
            });
          }else {
            console.warn('No dataObservable coming from Route Resolver promiseObservable');
          }
        });
      } else {
        console.warn('No promiseObservable coming from Route Resolver data');
      }
    } else {
      console.warn('No data coming from Route Resolver');
    }

    this.films = this.as.getFilms$()
      .pipe
      (
        map((films:any) => 
        {
          films.results.map
          (
            e => 
            {
              e.properties.id = this.getIdFromUrl(e.properties.url);
              e.img = this.fs.getDataById(e.properties.id).poster_path;
              return e;
            }
          )
          return films;
        })
      );
  }

  openDetails(film)
  {
    this.router.navigate([`tabs/films/details`], {state:film});
  }

  getIdFromUrl(value)
  {
    let l_split = value.split('/');
    return l_split[l_split.length-1];
  }
}
