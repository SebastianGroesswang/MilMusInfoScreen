// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHGryGwiE0YRLOEIu9qG6yW71R6u_kWb8",
  authDomain: "test-infoscreen.firebaseapp.com",
  databaseURL: "https://test-infoscreen-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "test-infoscreen",
  storageBucket: "test-infoscreen.appspot.com",
  messagingSenderId: "866268909062",
  appId: "1:866268909062:web:5c1ff777e642a70a823d87",
  measurementId: "G-MSBRV7ES4P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);
export const storage = getStorage(app)