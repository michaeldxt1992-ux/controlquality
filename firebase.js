// ==============================================
// CONFIGURAÇÃO DO FIREBASE (SDK 8 + GitHub Pages)
// ==============================================

const firebaseConfig = {
  apiKey: "AIzaSyB2TRTp8vwXdvP4eMzrzxmjwlKQxXNPhgRs",
  authDomain: "controlquality-28980.firebaseapp.com",
  projectId: "controlquality-28980",
  storageBucket: "controlquality-28980.firebasestorage.app",
  messagingSenderId: "414926471464",
  appId: "1:414926471464:web:9cd7527cd8e725fc14c9ef"
};

// Inicializa Firebase (SDK 8)
firebase.initializeApp(firebaseConfig);

// Exporta instâncias globais
window.auth = firebase.auth();
window.db = firebase.firestore();
