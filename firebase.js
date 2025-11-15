// Configuração do Firebase (copiada do Console corretamente)
const firebaseConfig = {
    apiKey: "AIzaSyB2RTp8wKVdpPAeMzrxjmjWkQCxNPhgRS",
    authDomain: "controlquality-28980.firebaseapp.com",
    projectId: "controlquality-28980",
    storageBucket: "controlquality-28980.appspot.com",
    messagingSenderId: "414924671414",
    appId: "1:414924671414:web:9cd7527cd8e725f1c4f9ef"
};

// Inicialização
firebase.initializeApp(firebaseConfig);

// Atalhos importantes
const auth = firebase.auth();
const db = firebase.firestore();
