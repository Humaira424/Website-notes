// js/firebase-db.js

// Firebase configuration from NEW PROJECT
const firebaseConfig = {
  apiKey: "AIzaSyBCAFa3AnU0eZKI6jM-nZhzO0D1onPTSvQ",
  authDomain: "learnify-education-website.firebaseapp.com",
  projectId: "learnify-education-website",
  storageBucket: "learnify-education-website.firebasestorage.app",
  messagingSenderId: "187642155716",
  appId: "1:187642155716:web:7e7811ca735f43189b2f91",
  measurementId: "G-SNGMC67GJC"
};

// Initialize Firebase using CDN approach (compat version)
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();

console.log("New Firebase Connected Successfully!");
