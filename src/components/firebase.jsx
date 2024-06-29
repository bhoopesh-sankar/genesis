import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDJervr6WqLUR7JSC-TPspSGihnLgPW2RY",
    authDomain: "agro-blockchain-aa2003.firebaseapp.com",
    projectId: "agro-blockchain-aa2003",
    storageBucket: "agro-blockchain-aa2003.appspot.com",
    messagingSenderId: "283908958897",
    appId: "1:283908958897:web:aed51dafd9975e0d3f9090"
};


export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);