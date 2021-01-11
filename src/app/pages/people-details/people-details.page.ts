import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-people-details',
  templateUrl: './people-details.page.html',
  styleUrls: ['./people-details.page.scss'],
})
export class PeopleDetailsPage implements OnInit {

  routeResolveData: any;
  people: Observable<any>;
  info = [];

  constructor(private as : ApiService, private route : ActivatedRoute) { }

  ngOnInit() 
  {
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

    
    let l_state = history.state;
    this.people = this.as.getPeopleById$(l_state.id)
      .pipe
      (
        map((p:any) => 
        {
          Object.keys(p.result.properties).forEach((k) =>
          {
            this.info.push(`${k}: ${p.result.properties[k]}`);
          })  
          return p;
        })
      );
  }
}
