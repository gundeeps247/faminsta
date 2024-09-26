// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAmBcvb6iUcK4YFIzumohNni7xWycKbCfs",
    authDomain: "pavmol-631ec.firebaseapp.com",
    projectId: "pavmol-631ec",
    storageBucket: "pavmol-631ec.appspot.com",
    messagingSenderId: "409977493897",
    appId: "1:409977493897:web:fc88be28ac31e69d3a6958",
    measurementId: "G-95HJSPQR4C"
  };
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export { storage, db };
