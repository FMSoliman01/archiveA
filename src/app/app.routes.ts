import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './Components/home/home.component';
import { OutgoingComponent } from './Components/Outgoing/Outgoing.component';
import { IncomingComponent} from './Components/incoming/incoming.component';

import { AddComponent } from './Components/add/add.component';
import { SearchComponent } from './Components/Search/Search.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { AuthGuard } from './auth.guard';

// تعريف المسارات
export const routes: Routes = [
  { path: '', redirectTo:"home",pathMatch:"full" },
  { path:  'home', canActivate:[AuthGuard],component: HomeComponent },
  { path: 'search',canActivate:[AuthGuard], component: SearchComponent },
  { path: 'add',canActivate:[AuthGuard], component: AddComponent },
  { path: 'outgoing',canActivate:[AuthGuard], component: OutgoingComponent },
  { path: 'incoming',canActivate:[AuthGuard], component: IncomingComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

// تصدير AppRoutingModule
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
