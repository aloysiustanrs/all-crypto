import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAf0bjJyE8fEK6hsMK917hdnZiIonMNfok",
  authDomain: "allcrypto-bd982.firebaseapp.com",
  projectId: "allcrypto-bd982",
  storageBucket: "allcrypto-bd982.appspot.com",
  messagingSenderId: "497454338754",
  appId: "1:497454338754:web:4b1bf28f5a7d284840215b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Auth
export const auth = getAuth(app);
//Database
export const db = getFirestore(app);
