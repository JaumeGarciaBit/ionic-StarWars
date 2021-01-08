import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.page.html',
  styleUrls: ['./people.page.scss'],
})
export class PeoplePage implements OnInit {

  people : Observable<any>;

  constructor(private as : ApiService) { }

  ngOnInit() {
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
    return l_split[l_split.length-2];
  }

  onClick(id)
  {
    console.log(id);
  }
}
