import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanActivateViaAuthGuard } from 'app/auth/auth.routeguard';
import { DashboardComponent } from 'app/dashboard/dashboard.component';
import { InfoComponent } from 'app/info/info.component';
import { IntroComponent } from 'app/intro/intro.component';
import { PreviewComponent } from 'app/preview/preview.component';
import { ThemesComponent } from 'app/themes/themes.component';

const routes: Routes = [
  { path: 'intro', component: IntroComponent },
  { path: 'info', component: InfoComponent },
  { path: 'theme', component: ThemesComponent },
  { path: 'preview', component: PreviewComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [CanActivateViaAuthGuard] },
  { path: '**', redirectTo: '/intro'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
