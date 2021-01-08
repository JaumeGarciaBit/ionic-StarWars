import { Injectable } from '@angular/core';
import { Plugins} from "@capacitor/core"

const {Storage} = Plugins;

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor() {}

  async getAllFavoriteFilms():Promise<{value:any}>
  {
    const l_result = await Storage.get({key:'FavoriteFilms'});

    return JSON.parse(l_result.value);
  }

  async favoriteFilmById(id)
  {
    let l_result : any = await this.getAllFavoriteFilms();

    if(l_result)
    {
      l_result.push(id);

      return Storage.set({key:'FavoriteFilms', value: JSON.stringify(l_result)});
    }
    else
    {
      return Storage.set({key:'FavoriteFilms', value: JSON.stringify([id])});
    }
  }

  async isFavorite(filmId){
    let result: any = await this.getAllFavoriteFilms();
    return result && result?.indexOf(filmId)>=0;
  }


  async removefavoriteById(id)
  {
    let l_result : any = await this.getAllFavoriteFilms();

    if(l_result)
    {
      let l_index = l_result.indexOf(id);

      if (l_index > -1) {
        l_result.splice(l_index, 1);
      } 

      return Storage.set({key:'FavoriteFilms', value: JSON.stringify(l_result)});
    }
  }

}
