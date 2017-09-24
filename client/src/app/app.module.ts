import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MdToolbarModule, MdInputModule, MdButtonModule, MdCardModule, MdProgressSpinnerModule, MdSelectModule } from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { InfoComponent } from './info/info.component';
import { PhotoComponent } from './photo/photo.component';
import { IntroComponent } from './intro/intro.component';

import { RacerService } from './racer/racer.service';

import { AppRoutingModule } from './app-routing.module';

export const firebaseConfig = {
    apiKey: "",
    authDomain: "pinewood-derby-pitpass-gen.firebaseapp.com",
    databaseURL: "https://pinewood-derby-pitpass-gen.firebaseio.com",
    projectId: "pinewood-derby-pitpass-gen",
    storageBucket: "",
    messagingSenderId: ""
  };

@NgModule({
  declarations: [
    AppComponent,
    InfoComponent,
    PhotoComponent,
    IntroComponent
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
    MdProgressSpinnerModule,
    MdSelectModule,
    MdToolbarModule,
    AppRoutingModule
  ],
  providers: [
    RacerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
