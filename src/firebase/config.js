// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAC0yQZeG9rB39xpBxJJq6D4vRsGZs9vCk",
    authDomain: "flyff-idle.firebaseapp.com",
    projectId: "flyff-idle",
    storageBucket: "flyff-idle.appspot.com",
    messagingSenderId: "866070089994",
    appId: "1:866070089994:web:aec739977e69677db2eaf3",
    measurementId: "G-DTZKXV1QLJ",
};
console.log(firebaseConfig);

// Initialize Firebase
let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
// const analytics = getAnalytics(app);

export default firebase_app;
