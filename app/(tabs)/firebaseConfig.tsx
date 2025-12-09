// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDNncmEwItQddat1gRbeKjEI9q6u_e1bFQ",
    authDomain: "chatapp-59279.firebaseapp.com",
    projectId: "chatapp-59279",
    storageBucket: "chatapp-59279.firebasestorage.app",
    messagingSenderId: "340725297058",
    appId: "1:340725297058:web:4be62f3a2cdf9c0a0eccfb",
    measurementId: "G-QN13JQ53J3"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
