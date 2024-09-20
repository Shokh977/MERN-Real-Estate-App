// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "estate-fc034.firebaseapp.com",
  projectId: "estate-fc034",
  storageBucket: "estate-fc034.appspot.com",
  messagingSenderId: "625229684633",
  appId: "1:625229684633:web:64cc02e933b0278000bd08"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);