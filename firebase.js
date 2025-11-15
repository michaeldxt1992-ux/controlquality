// =======================================================
//  CONFIGURAÇÃO DO FIREBASE — Control Quality (2025)
// =======================================================

// Configuração oficial do Firebase (copiada do console)
const firebaseConfig = {
    apiKey: "AIzaSyB2RTp8wKvDp4AeMZrzxjmjWkQCxPNhgRS",
    authDomain: "controlquality-28980.firebaseapp.com",
    projectId: "controlquality-28980",
    storageBucket: "controlquality-28980.firebasestorage.app",
    messagingSenderId: "414924671414",
    appId: "1:414924671414:web:9cd7527cd8e725fc14c9ef"
};

// Inicializa Firebase (modo compat)
firebase.initializeApp(firebaseConfig);

// Serviços usados no app
const auth = firebase.auth();
const db = firebase.firestore();

// Export global (acessível em qualquer HTML)
window.auth = auth;
window.db = db;
