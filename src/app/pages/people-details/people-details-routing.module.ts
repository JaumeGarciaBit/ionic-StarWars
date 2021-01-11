import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NonBlockingResolver } from '../../shared/services/non-blocking.resolver';

import { PeopleDetailsPage } from './people-details.page';

const routes: Routes = [
  {
    path: '',
    component: PeopleDetailsPage, resolve:{items:NonBlockingResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PeopleDetailsPageRoutingModule {}
