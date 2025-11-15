// complaint-create.js — módulo opcional para organização do projeto
// Função de criar reclamação usando Firebase v10

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { 
    getFirestore, collection, addDoc 
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

import { 
    getAuth 
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

// Config Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB2TRtp8wXdvP4eMzrxjmWlKQcxPNhgRS",
    authDomain: "controlquality-28980.firebaseapp.com",
    projectId: "controlquality-28980",
    storageBucket: "controlquality-28980.appspot.com",
    messagingSenderId: "414942674144",
    appId: "1:414942674144:web:9cd7527cd8e725f1c4f9ef"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// ------------------------------
// FUNÇÃO PRINCIPAL — CRIAR RECLAMAÇÃO
// ------------------------------
window.createComplaint = async function() {

    const empresa = document.getElementById("empresa")?.value.trim();
    const titulo = document.getElementById("titulo")?.value.trim();
    const descricao = document.getElementById("descricao")?.value.trim();

    if (!empresa || !titulo || !descricao) {
        alert("Preencha todos os campos.");
        return;
    }

    const user = auth.currentUser;

    await addDoc(collection(db, "complaints"), {
        company: empresa,
        title: titulo,
        description: descricao,
        userId: user ? user.uid : "anonimo",
        userEmail: user ? user.email : "anonimo",
        createdAt: new Date(),
        response: null
    });

    alert("Reclamação enviada com sucesso!");

    window.location.href = "complaint-list.html";
};
