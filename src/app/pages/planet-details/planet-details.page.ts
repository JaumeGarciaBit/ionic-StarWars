import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-planet-details',
  templateUrl: './planet-details.page.html',
  styleUrls: ['./planet-details.page.scss'],
})
export class PlanetDetailsPage implements OnInit {

  planet: Observable<any>;
  info = [];

  constructor(private as : ApiService) { }


    ngOnInit() 
    {
      let l_state = history.state;
      this.planet = this.as.getPlanetById$(l_state.id)
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
