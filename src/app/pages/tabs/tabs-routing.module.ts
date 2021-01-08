import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: 
    [
      {
        path: 'films',
        children:
        [
          {
            path: '',
            loadChildren: () => import('../films/films.module').then( m => m.FilmsPageModule)
          },
          {
            path: 'details',
            loadChildren: () => import('../film-details/film-details.module').then( m => m.FilmDetailsPageModule)
          }
        ],
      },
      {
        path: 'people',
        children:
        [
          {
            path: '',
            loadChildren: () => import('../people/people.module').then( m => m.PeoplePageModule)
          },
          {
            path: 'details',
            loadChildren: () => import('../people-details/people-details.module').then( m => m.PeopleDetailsPageModule)
          }
        ],
      },
      {
        path: 'planets',
        children:
        [
          {
            path: '',
            loadChildren: () => import('../planets/planets.module').then( m => m.PlanetsPageModule)
          },
          {
            path: 'details',
            loadChildren: () => import('../planet-details/planet-details.module').then( m => m.PlanetDetailsPageModule)
          }
        ],
      }
    ]
  },
  {
    path:'',
    redirectTo:'tabs/films',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
