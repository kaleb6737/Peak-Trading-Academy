// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8WUb2jgdIwPEca6czK6ipWfDfwA46IYY",
  authDomain: "peak-trader-academy-6c798.firebaseapp.com",
  projectId: "peak-trader-academy-6c798",
  storageBucket: "peak-trader-academy-6c798.appspot.com", // Fix storage bucket URL
  messagingSenderId: "749820586981",
  appId: "1:749820586981:web:e65ab03c70032bf1645d0c",
  measurementId: "G-GZ3LTJGNMK"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

// Initialize Google Auth Provider
const provider = new GoogleAuthProvider(); // No need to pass firebaseApp here

// Export Firebase services
export { auth, provider };
export default db;

