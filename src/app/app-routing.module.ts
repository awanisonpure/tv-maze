import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowsComponent } from './shows/shows.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ShowDetailsComponent } from './show-details/show-details.component';

const routes: Routes = [
  { path: '', component: ShowsComponent },
  { path: 'shows/:id', component: ShowDetailsComponent },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/page-not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
