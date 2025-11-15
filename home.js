// home.js — módulo para carregar reclamações recentes na página inicial

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { 
    getFirestore, collection, query, orderBy, limit, getDocs
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
    loadRecentComplaints();
});

// ------------------------------
// CARREGAR RECLAMAÇÕES RECENTES
// ------------------------------
async function loadRecentComplaints() {
    const list = document.getElementById("lista");

    list.innerHTML = `<p style="opacity:.7;">Carregando...</p>`;

    const q = query(
        collection(db, "reclamacoes"),
        orderBy("data", "desc"),
        limit(20)
    );

    const snap = await getDocs(q);

    list.innerHTML = "";

    if (snap.empty) {
        list.innerHTML = "<p>Nenhuma reclamação recente.</p>";
        return;
    }

    snap.forEach(docSnap => {
        const c = docSnap.data();

        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
            <div class="titulo">${c.titulo}</div>
            <div class="empresa">${c.empresa}</div>
        `;

        // Opcional: abrir detalhes ao clicar
        // div.onclick = () => window.location.href = "complaint-detail.html?id=" + docSnap.id;

        list.appendChild(div);
    });
}
<script type="module" src="home.js"></script>
