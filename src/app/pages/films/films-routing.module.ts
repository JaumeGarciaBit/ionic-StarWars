import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NonBlockingResolver } from 'src/app/shared/services/non-blocking.resolver';

import { FilmsPage } from './films.page';

const routes: Routes = [
  {
    path: '',
    component: FilmsPage, resolve:{items:NonBlockingResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilmsPageRoutingModule {}
