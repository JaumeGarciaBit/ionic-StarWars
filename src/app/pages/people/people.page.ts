import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.page.html',
  styleUrls: ['./people.page.scss'],
})
export class PeoplePage implements OnInit {
  routeResolveData: any;
  people : Observable<any>;

  constructor(private as : ApiService, private router : Router, private route : ActivatedRoute) { }

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

    this.people = this.as.getPeople$()
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

  onClick(people)
  {
    this.router.navigate([`tabs/people/details`], {state:people});
  }
}
