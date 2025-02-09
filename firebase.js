import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAE2VA3gwJQFqjJLeCTwm1T57xVQRY8JpU",
  authDomain: "miniflow-a1238.firebaseapp.com",
  projectId: "miniflow-a1238",
  storageBucket: "miniflow-a1238.firebasestorage.app",
  messagingSenderId: "494767251431",
  appId: "1:494767251431:web:9f6e59d5ab61bf95f96742",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);