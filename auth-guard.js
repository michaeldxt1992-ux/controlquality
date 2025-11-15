// auth-guard.js — protege páginas que exigem autenticação

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

// Config Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB2TRtp8wXdvP4eMzrxjmWlKQcxPNhgRS",
    authDomain: "controlquality-28980.firebaseapp.com",
    projectId: "controlquality-28980",
    storageBucket: "controlquality-28980.appspot.com",
    messagingSenderId: "414942674144",
    appId: "1:414942674144:web:9cd7527cd8e725f1c4f9ef"
};

// Evita inicialização duplicada
let app;

try {
    app = initializeApp(firebaseConfig);
} catch (e) {
    // ignora erro "app já inicializado"
}

const auth = getAuth();

// Proteger página
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "index.html";
    }
});
