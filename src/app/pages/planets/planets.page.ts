import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.page.html',
  styleUrls: ['./planets.page.scss'],
})
export class PlanetsPage implements OnInit {

  routeResolveData :any;
  planets : Observable<any>;

  constructor(private route: ActivatedRoute, private as : ApiService, private router: Router) { }

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

    this.planets = this.as.getPlanets$()
      .pipe
      (
        map((p:any) => 
        {
          p.results.map
          (
            e => 
            {
              e.id = this.getIdFromUrl(e.url);
              return e;
            }
          )
          return p;
        })
      );
  }

  getIdFromUrl(value)
  {
    let l_split = value.split('/');
    return l_split[l_split.length-1];
  }

  onClick(planet)
  {
    this.router.navigate([`tabs/planets/details`], {state:planet});
  }
}
