// app.firebase.js

// Configuração Firebase (COMPLETA)
const firebaseConfig = {
    apiKey: "AIzaSyB2TRPto8wKdvP4eMzrxjmWkQCxPNhgRS",
    authDomain: "controlquality-28980.firebaseapp.com",
    projectId: "controlquality-28980",
    storageBucket: "controlquality-28980.appspot.com",
    messagingSenderId: "414926471614",
    appId: "1:414926471614:web:9cd7527cd8e725fc14cf9ef"
};

// Inicializa Firebase (modo compatível com seu código)
firebase.initializeApp(firebaseConfig);

// Autenticação e Firestore
const auth = firebase.auth();
const db = firebase.firestore();
