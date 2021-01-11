import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NonBlockingResolver } from '../../shared/services/non-blocking.resolver';

import { PeoplePage } from './people.page';

const routes: Routes = [
  {
    path: '',
    component: PeoplePage, resolve:{items:NonBlockingResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PeoplePageRoutingModule {}
