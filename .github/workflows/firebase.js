// Firebase App
import { initializeApp } from "firebase/app";

// Firebase Authentication
import { getAuth } from "firebase/auth";

// Firebase Firestore
import { getFirestore } from "firebase/firestore";

// Firebase Analytics
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {

  apiKey: "AIzaSyAOgH1varztWqwe-unI2QD4xqMis3prgSg",

  authDomain:
    "cafe-shop-online-ordering.firebaseapp.com",

  projectId:
    "cafe-shop-online-ordering",

  storageBucket:
    "cafe-shop-online-ordering.firebasestorage.app",

  messagingSenderId:
    "351955376785",

  appId:
    "1:351955376785:web:cd2a9a1bd034cd980efd30",

  measurementId:
    "G-DE440GXBBM"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Authentication
const auth = getAuth(app);


// Initialize Firestore
const db = getFirestore(app);


// Initialize Analytics
const analytics = getAnalytics(app);

// Export
export {
  app,
  auth,
  db,
  analytics
};