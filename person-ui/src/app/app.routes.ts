import { Routes } from '@angular/router';
import { PersonListComponent } from './components/person-list/person-list.component';

export const routes: Routes = [
  {
    path: '',
    component: PersonListComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
