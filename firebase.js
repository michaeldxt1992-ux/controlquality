// ==============================================================
// CONFIGURAÇÃO DO FIREBASE (SDK 8 + GitHub Pages)
// ==============================================================

const firebaseConfig = {
    apiKey: "AIzaSyB2TRTp8vwXdvP4eMzrxmjMWkQCxPNhgRs",
    authDomain: "controlquality-28980.firebaseapp.com",
    projectId: "controlquality-28980",
    storageBucket: "controlquality-28980.appspot.com",
    messagingSenderId: "414926471644",
    appId: "1:414926471644:web:9cd7527cd8e725fc14c9ef"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

// Exporta instâncias globais
window.auth = firebase.auth();
window.db = firebase.firestore();
