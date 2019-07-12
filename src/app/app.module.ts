import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DbProvider } from '../providers/db/db';
import { SQLite } from '@ionic-native/sqlite';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth/auth';
import { FirebaseDbProvider } from '../providers/firebase-db/firebase-db';

export const firebaseConfig = {
  apiKey: "AIzaSyAE2XEeThaNwTvo1ELwTpCMECvJkknGtFY",
  authDomain: "mis-sitios-ff175.firebaseapp.com",
  databaseURL: "https://mis-sitios-ff175.firebaseio.com",
  projectId: "mis-sitios-ff175",
  storageBucket: "mis-sitios-ff175.appspot.com",
  messagingSenderId: "216585770927"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}, Camera,
    DbProvider,
    SQLite,
    LaunchNavigator,
    AuthProvider,
    FirebaseDbProvider
  ]
})
export class AppModule {}
