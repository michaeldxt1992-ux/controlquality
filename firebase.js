// ======================
// CONFIGURAÇÃO DO FIREBASE (SDK 8 COMPATÍVEL COM GITHUB PAGES)
// ======================

var firebaseConfig = {
    apiKey: "AIZzSyB2TRp8wKvDpA4eMzrxmjmWjKQxPNhgRS",
    authDomain: "controlquality-28980.firebaseapp.com",
    projectId: "controlquality-28980",
    storageBucket: "controlquality-28980.appspot.com",
    messagingSenderId: "414924671414",
    appId: "1:414924671414:web:9cd7527cd8e725f1c4f9ef"
};

// Inicializa Firebase (SDK 8)
firebase.initializeApp(firebaseConfig);

// Exporta instâncias globais
window.auth = firebase.auth();
window.db = firebase.firestore();
