// ===============================
// CONFIGURAÇÃO DO FIREBASE
// ===============================
const firebaseConfig = {
    apiKey: "AIzaSyB2TRPqb8WxVdpP4eMzrxmjmWkQCxPNhgRS",
    authDomain: "controlquality-28980.firebaseapp.com",
    projectId: "controlquality-28980",
    storageBucket: "controlquality-28980.appspot.com",
    messagingSenderId: "414924761414",
    appId: "1:414924761414:web:9cd7527cd8e725f1c4f9ef"
};

// Inicializa Firebase (SDK 8)
firebase.initializeApp(firebaseConfig);

// Exporta instâncias globais
window.auth = firebase.auth();
window.db = firebase.firestore();
