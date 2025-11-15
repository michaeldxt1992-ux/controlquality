// CONFIGURAÇÃO DO FIREBASE (SDK 8 COMPATÍVEL COM GITHUB PAGES)
const firebaseConfig = {
    apiKey: "AIzaSyB2TRpBvwKvD4eMzzrwjimWjKQcXNPhgRs",
    authDomain: "controlquality-28980.firebaseapp.com",
    projectId: "controlquality-28980",
    storageBucket: "controlquality-28980.appspot.com",
    messagingSenderId: "414924671464",
    appId: "1:414924671464:web:9cd7527cd8e725fc14c9ef"
};

// Inicializa Firebase (SDK 8)
firebase.initializeApp(firebaseConfig);

// Exporta instâncias globais
window.auth = firebase.auth();
window.db = firebase.firestore();
