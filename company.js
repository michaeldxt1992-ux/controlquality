// company.js — painel da empresa

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { 
    getFirestore, collection, getDocs 
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

import {
    getAuth, onAuthStateChanged, signOut
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

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

// -------------------------------
// Verificar login
// -------------------------------
onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.href = "index.html";
        return;
    }

    loadComplaints();
});

// -------------------------------
// Carregar reclamações
// -------------------------------
async function loadComplaints() {
    const listDiv = document.getElementById("complaintList");

    listDiv.innerHTML = "<p style='opacity:.8;'>Carregando...</p>";

    const ref = collection(db, "complaints");
    const snap = await getDocs(ref);

    listDiv.innerHTML = "";

    snap.forEach(docSnap => {
        const c = docSnap.data();
        const id = docSnap.id;

        const box = document.createElement("div");
        box.className = "item";
        box.innerHTML = `
            <h3>${c.title}</h3>
            <p><b>Usuário:</b> ${c.userEmail}</p>
            <p><b>Status:</b> ${c.response ? "Respondida" : "Pendente"}</p>
            <button onclick="openComplaint('${id}')">
                ${c.response ? "Ver resposta" : "Responder"}
            </button>
        `;

        listDiv.appendChild(box);
    });
}

// -------------------------------
// Abrir detalhes para responder
// -------------------------------
window.openComplaint = function(id) {
    window.location.href = "company-response.html?id=" + id;
};

// -------------------------------
// Logout
// -------------------------------
window.doLogout = async function() {
    await signOut(auth);
    window.location.href = "index.html";
};
