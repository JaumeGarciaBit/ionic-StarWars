import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.page.html',
  styleUrls: ['./planets.page.scss'],
})
export class PlanetsPage implements OnInit {


  planets : Observable<any>;

  constructor(private as : ApiService, private router: Router) { }

  ngOnInit() {
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
    return l_split[l_split.length-2];
  }

  onClick(planet)
  {
    this.router.navigate([`tabs/planets/details`], {state:planet});
  }
}
