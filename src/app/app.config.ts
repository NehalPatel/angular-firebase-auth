import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyBj5nTzcVZ4DPdZoP9-Waw-8Fb5gdWmpN8",
      authDomain: "tybca-fswd-e60de.firebaseapp.com",
      projectId: "tybca-fswd-e60de",
      storageBucket: "tybca-fswd-e60de.firebasestorage.app",
      messagingSenderId: "436197176460",
      appId: "1:436197176460:web:fb1e4d25ddaa7108edb7a9"
    })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideAnimationsAsync()
  ]
};
