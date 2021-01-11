import { Component, OnInit } from '@angular/core';
import { FavoriteService } from 'src/app/shared/services/favorite.service';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.page.html',
  styleUrls: ['./film-details.page.scss'],
})
export class FilmDetailsPage implements OnInit {

  film : any;
  isFavorite = false;

  constructor(private fs :FavoriteService) { }

  async ngOnInit() 
  {
    this.film = history.state;
    this.isFavorite = await this.fs.isFavorite(this.film.properties.id);

  }

  async favoriteFilm(fav :boolean)
  {
    if(fav)
    {
      await this.fs.favoriteFilmById(this.film.properties.id)
      this.isFavorite = true;
    }
    else
    {
      this.fs.removefavoriteById(this.film.properties.id);
      this.isFavorite = false;
    }
  }

}
