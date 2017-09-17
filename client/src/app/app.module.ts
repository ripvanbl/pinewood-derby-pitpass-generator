import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MdToolbarModule, MdInputModule, MdButtonModule, MdCardModule, MdProgressSpinnerModule, MdSelectModule } from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { InfoComponent } from './info/info.component';
import { PhotoComponent } from './photo/photo.component';

export const firebaseConfig = {
    apiKey: "AIzaSyBSd4lMjgFlqMGZQre1jkVXp51tGHyFCw0",
    authDomain: "pinewood-derby-pitpass-gen.firebaseapp.com",
    databaseURL: "https://pinewood-derby-pitpass-gen.firebaseio.com",
    projectId: "pinewood-derby-pitpass-gen",
    storageBucket: "",
    messagingSenderId: "908496029912"
  };

@NgModule({
  declarations: [
    AppComponent,
    InfoComponent,
    PhotoComponent
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
    MdToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
