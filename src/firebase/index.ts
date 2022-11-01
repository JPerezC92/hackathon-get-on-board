// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY_FIREBASE,
  authDomain: "hackajob-76be9.firebaseapp.com",
  projectId: "hackajob-76be9",
  storageBucket: "hackajob-76be9.appspot.com",
  messagingSenderId: "133658437122",
  appId: "1:133658437122:web:749bb2e64a1d2491d1e91b",
  measurementId: "G-0K45EDQGQR",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);