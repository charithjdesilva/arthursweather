import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAhKidlIRnkzYIp5FOrJbWHXWywqUiF1nQ",
    authDomain: "arthurs-weather.firebaseapp.com",
    projectId: "arthurs-weather",
    storageBucket: "arthurs-weather.appspot.com",
    messagingSenderId: "989511949987",
    appId: "1:989511949987:web:dd2090b2254bdb656ce916",
    measurementId: "G-FXHZKWB9YL"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app); // Initialize the Auth service

export { auth };// Export the initialized Auth service
