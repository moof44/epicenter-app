import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAhF7a2tBc_97v1_sUcWJ6gI__UuAYUMMo",
  authDomain: "epicenter-app.firebaseapp.com",
  projectId: "epicenter-app",
  storageBucket: "epicenter-app.appspot.com",
  messagingSenderId: "190360788968",
  appId: "1:190360788968:web:cd81299c5a956b0f480e5d",
  measurementId: "G-5JEWL7H5H5"
};

export const firebaseProviders = [
  provideFirebaseApp(() => initializeApp(firebaseConfig)),
  provideFirestore(() => getFirestore()),
  provideAuth(() => getAuth()),
];
