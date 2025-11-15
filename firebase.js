// ================================
// CONFIGURAÇÃO FIREBASE (SDK 8 COMPAT)
// ================================

const firebaseConfig = {
    apiKey: "AIzaSyB2TRPto8wKdvP4eMzrxjmWkQCxPNhgRS",
    authDomain: "controlquality-28980.firebaseapp.com",
    projectId: "controlquality-28980",
    storageBucket: "controlquality-28980.appspot.com",
    messagingSenderId: "414926471614",
    appId: "1:414926471614:web:9cd7527cd8e725fc14c9ef"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Exportar para o app
window.auth = firebase.auth();
window.db = firebase.firestore();
