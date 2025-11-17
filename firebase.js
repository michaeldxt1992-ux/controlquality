/* ============================================================
   FIREBASE.JS - CONFIGURAÇÃO OFICIAL DO CONTROL QUALITY
   ============================================================ */

var firebaseConfig = {
    apiKey: "AIzaSyB2TRTP8vwXdvP4eMzrxmjMWKQcxPNhgRs",
    authDomain: "controlquality-28980.firebaseapp.com",
    databaseURL: "https://controlquality-28980-default-rtdb.firebaseio.com",
    projectId: "controlquality-28980",
    storageBucket: "controlquality-28980.firebasestorage.app",
    messagingSenderId: "414926471614",
    appId: "1:414926471614:web:9cd7527cd8e725f1c4f9ef"
};


// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

// Inicializa serviços usados no app
window.db = firebase.firestore();
window.auth = firebase.auth();

// Ajuste para evitar warnings do Firestore
db.settings({ ignoreUndefinedProperties: true });

console.log("🔥 Firebase carregado com sucesso!");
