import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ComplainComponent } from './components/home/complain/complain.component';
import { RequestComponent } from './components/home/request/request.component';
import { AdminComponent } from './components/admin/admin.component';
import { ReciveRequestComponent } from './components/admin/recive-request/recive-request.component';
import { ReciveComplainComponent } from './components/admin/recive-complain/recive-complain.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'complain',
    component: ComplainComponent,
  },
  {
    path: 'request',
    component: RequestComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'admin/reciverequest',
    component: ReciveRequestComponent,
  },
  {
    path: 'admin/recivecomplain',
    component: ReciveComplainComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
