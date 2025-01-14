import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';  
import { getAuth } from 'firebase/auth';          

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDz018hW0rxa0ctXkGIr4v2f1OMph5DYgQ",
  authDomain: "firestoreapp-4de1d.firebaseapp.com",
  projectId: "firestoreapp-4de1d",
  storageBucket: "firestoreapp-4de1d.firebasestorage.app",
  messagingSenderId: "152265495642",
  appId: "1:152265495642:web:a9a911aca619493b7d3463",
  measurementId: "G-7LDTPHFEW6"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);   
const auth = getAuth(app);      

export { db, auth };  
