// ================================
// CONFIGURAÇÃO DO FIREBASE
// ================================
const firebaseConfig = {
    apiKey: "AIzaSyB2TRp8vxWdvpP4eMzrxmiWjKQcxPNhgRs",
    authDomain: "michaeldxt1992-ux.github.io",
    projectId: "controlquality-28980",
    storageBucket: "controlquality-28980.appspot.com",
    messagingSenderId: "414924671414",
    appId: "1:414924671414:web:9cd7527cd8e7251fc4f9ef"
};

// Inicializa Firebase (SDK 8)
firebase.initializeApp(firebaseConfig);

// Exporta instâncias globais
window.auth = firebase.auth();
window.db = firebase.firestore();
