import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanActivateViaAuthGuard } from './auth/auth.routeguard';
import { InfoComponent } from './info/info.component';
import { IntroComponent } from './intro/intro.component';
 
const routes: Routes = [
  { path: 'intro', component: IntroComponent },
  { path: 'info', component: InfoComponent, canActivate: [CanActivateViaAuthGuard] },
  { path: '**', redirectTo: '/intro'}
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}