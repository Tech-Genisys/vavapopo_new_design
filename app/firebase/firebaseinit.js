// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMv5Z6c5eZCyEsP1RY2c9YM4Y3Ha9QDfU",
  authDomain: "vavapopo-e9bbe.firebaseapp.com",
  projectId: "vavapopo-e9bbe",
  storageBucket: "vavapopo-e9bbe.appspot.com",
  messagingSenderId: "355169230204",
  appId: "1:355169230204:web:dc9b1d3eabb782468d18f9",
  measurementId: "G-3YFKBKF0E4",
};

export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const imageDb = getStorage(app);
