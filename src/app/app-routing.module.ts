import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {HeroesComponent} from './components/heroes/heroes.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {HeroDetailComponent} from './components/hero-detail/hero-detail.component';
const routers:Routes = [
  {path: 'heroes', component: HeroesComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'detail/:id', component: HeroDetailComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
]
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routers)]
})
export class AppRoutingModule { }
