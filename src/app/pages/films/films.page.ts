import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  films : Observable<any>;

  constructor(private router : Router, private fs : FilmsService, private as : ApiService) { }

  ngOnInit() {
    this.films = this.as.getFilms$()
      .pipe
      (
        map((films:any) => 
        {
          films.results.map
          (
            e => 
            {
              e.id = this.getIdFromUrl(e.url);
              e.img = this.fs.getDataById(e.id).poster_path;
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
    return l_split[l_split.length-2];
  }
}
