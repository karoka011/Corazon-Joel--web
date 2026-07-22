import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import {
    getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
    getFirestore, collection, getDocs, doc, updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

//El mismo firebase Config que ya usamos en el archivo de conexion del registro.html y que usamos en main.js

const firebaseConfig = {
    apiKey: "AIzaSyDs4yPkR2NxxUyd5jDaVYAZrozxiBWvQw4",
    authDomain: "arrulladoras.firebaseapp.com",
    projectId: "arrulladoras",
    storageBucket: "arrulladoras.firebasestorage.app",
    messagingSenderId: "344116098962",
    appId: "1:344116098962:web:2d7d6b4b8d2ad6b3e3b34b"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);