import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MdGridListModule,
  MdMenuModule,
  MdToolbarModule,
  MdInputModule,
  MdButtonModule,
  MdCardModule,
  MdProgressSpinnerModule,
  MdSelectModule } from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { InfoComponent } from './info/info.component';
import { IntroComponent } from './intro/intro.component';
import { PhotoComponent } from './photo/photo.component';
import { ThemesComponent } from './themes/themes.component';
import { Pack1722018Component } from './themes/pack172-2018/pack172-2018.component';

import { AuthService } from './auth/auth.service';
import { CanActivateViaAuthGuard } from './auth/auth.routeguard';
import { RacerService } from './racer/racer.service';
import { StorageService } from './storage/storage.service';
import { HttpService } from './network/http.service';

import { AppRoutingModule } from './app-routing.module';
import { PrintComponent } from './print/print.component';
import { SaveComponent } from './save/save.component';
import { PitpassComponent } from './pitpass/pitpass.component';
import { DashboardComponent } from './dashboard/dashboard.component';


export const firebaseConfig = {
    apiKey: 'AIzaSyBSd4lMjgFlqMGZQre1jkVXp51tGHyFCw0',
    authDomain: 'pinewood-derby-pitpass-gen.firebaseapp.com',
    databaseURL: 'https://pinewood-derby-pitpass-gen.firebaseio.com',
    projectId: 'pinewood-derby-pitpass-gen',
    storageBucket: '',
    messagingSenderId: '908496029912'
  };

@NgModule({
  declarations: [
    AppComponent,
    InfoComponent,
    PhotoComponent,
    IntroComponent,
    ThemesComponent,
    Pack1722018Component,
    PrintComponent,
    SaveComponent,
    PitpassComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdGridListModule,
    MdMenuModule,
    MdProgressSpinnerModule,
    MdSelectModule,
    MdToolbarModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    CanActivateViaAuthGuard,
    RacerService,
    StorageService,
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
