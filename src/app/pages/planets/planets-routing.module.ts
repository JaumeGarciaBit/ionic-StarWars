import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NonBlockingResolver } from '../../shared/services/non-blocking.resolver';

import { PlanetsPage } from './planets.page';

const routes: Routes = [
  {
    path: '',
    component: PlanetsPage, resolve:{items:NonBlockingResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanetsPageRoutingModule {}
