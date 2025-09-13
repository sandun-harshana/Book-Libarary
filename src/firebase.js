import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD935CFi8nLXusE5fsa8Q2ERL21wB-I5og",
  authDomain: "gym-managemenet-system.firebaseapp.com",
  databaseURL: "https://gym-managemenet-system-default-rtdb.firebaseio.com",
  projectId: "gym-managemenet-system",
  storageBucket: "gym-managemenet-system.firebasestorage.app",
  messagingSenderId: "30149278618",
  appId: "1:30149278618:web:8d4e5c1510bbd4db9cd823",
  measurementId: "G-KNZVGSGC5Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);