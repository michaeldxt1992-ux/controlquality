// complaint-detail.js — módulo para exibir detalhes da reclamação

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { 
    getFirestore, doc, getDoc 
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

import {
    getAuth, onAuthStateChanged
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
// AUTENTICAÇÃO
// ------------------------------
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "index.html";
        return;
    }

    loadComplaintDetail();
});

// ------------------------------
// LER DETALHE DA RECLAMAÇÃO
// ------------------------------
async function loadComplaintDetail() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        alert("ID inválido.");
        return;
    }

    const ref = doc(db, "complaints", id);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
        alert("Reclamação não encontrada!");
        return;
    }

    const data = snap.data();

    document.getElementById("detailCompany").textContent = data.company;
    document.getElementById("detailTitle").textContent = data.title;
    document.getElementById("detailDescription").textContent = data.description;
    document.getElementById("detailStatus").textContent = data.response ? "Respondida" : "Pendente";
    document.getElementById("detailResponse").textContent = data.response ?? "Nenhuma resposta ainda.";
}
