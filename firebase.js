// ================================
// CONFIGURAÇÃO FIREBASE (SDK 8)
// ================================

var firebaseConfig = {
    apiKey: "AIZaSyB2TRTp8vwXd... (sua API KEY)",
    authDomain: "controlquality-28980.firebaseapp.com",
    projectId: "controlquality-28980",
    storageBucket: "controlquality-28980.appspot.com",
    messagingSenderId: "414924674164",
    appId: "1:414924674164:web:9cd7527cd8e725fc14c9ef"
};

// Inicializar
firebase.initializeApp(firebaseConfig);

// Exportar
window.auth = firebase.auth();
window.db = firebase.firestore();
