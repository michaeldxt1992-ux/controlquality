// complaint-list.js — versão modular da listagem de reclamações

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { 
    getFirestore, collection, query, where, orderBy, getDocs 
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
// VERIFICAR LOGIN
// ------------------------------
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "index.html";
        return;
    }
    loadUserComplaints(user.uid);
});

// ------------------------------
// LISTAR RECLAMAÇÕES DO USUÁRIO
// ------------------------------
async function loadUserComplaints(uid) {
    const list = document.getElementById("lista");

    list.innerHTML = `<p style="opacity: .7;">Carregando...</p>`;

    const q = query(
        collection(db, "reclamacoes"),
        where("uid", "==", uid),
        orderBy("data", "desc")
    );

    const snap = await getDocs(q);

    list.innerHTML = "";

    if (snap.empty) {
        list.innerHTML = "<p>Você ainda não enviou reclamações.</p>";
        return;
    }

    snap.forEach(docSnap => {
        const data = docSnap.data();
        const id = docSnap.id;

        const card = document.createElement("div");
        card.className = "card";
        card.onclick = () => openComplaint(id);

        card.innerHTML = `
            <div class="titulo">${data.titulo}</div>
            <div class="empresa">${data.empresa}</div>
            <div class="status">Status: ${data.status}</div>
        `;

        list.appendChild(card);
    });
}

// ------------------------------
// ABRIR DETALHES
// ------------------------------
window.openComplaint = function(id) {
    window.location.href = "complaint-detail.html?id=" + id;
};
