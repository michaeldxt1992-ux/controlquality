import { auth, db } from "./firebase.js";
import { 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

import { 
    addDoc,
    collection,
    getDocs,
    doc,
    getDoc,
    where,
    query
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

console.log("🔥 app.firebase.js carregado!");

/*
=========================
 LOGIN
=========================
*/

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        try {
            await signInWithEmailAndPassword(auth, email, senha);
            window.location.href = "home.html";
        } catch (error) {
            alert("Erro ao entrar: " + error.message);
        }
    });
}

/*
=========================
 CADASTRO
=========================
*/

const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const tipo = document.getElementById("accountType").value;
        const nome = document.getElementById("name").value;
        const email = document.getElementById("su-email").value;
        const senha = document.getElementById("su-password").value;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
            const user = userCredential.user;

            await addDoc(collection(db, "usuarios"), {
                uid: user.uid,
                nome,
                email,
                tipo,
                criadoEm: new Date()
            });

            alert("Conta criada com sucesso!");
            window.location.href = "index.html";
        } catch (error) {
            alert("Erro ao criar conta: " + error.message);
        }
    });
}

/*
=========================
 LOGOUT
=========================
*/
window.logout = async function () {
    await signOut(auth);
    window.location.href = "index.html";
}


/*
=========================
 CRIAR RECLAMAÇÃO
=========================
*/

const complaintForm = document.getElementById("createComplaintForm");

if (complaintForm) {

    complaintForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const empresa = document.getElementById("empresa").value;
        const titulo = document.getElementById("titulo").value;
        const descricao = document.getElementById("descricao").value;

        const user = auth.currentUser;

        if (!user) {
            alert("Você precisa estar logado!");
            return window.location.href = "index.html";
        }

        try {
            await addDoc(collection(db, "complaints"), {
                uid: user.uid,
                empresa,
                titulo,
                descricao,
                data: new Date(),
                status: "aberto"
            });

            alert("Reclamação enviada!");
            window.location.href = "home.html";
        } catch (error) {
            alert("Erro ao enviar reclamação: " + error.message);
        }
    });
}

/*
=========================
 LISTAR RECLAMAÇÕES DO USUÁRIO
=========================
*/

async function carregarReclamacoes() {
    const list = document.getElementById("list");
    const userNameEl = document.getElementById("userName");

    if (!list) return;

    const user = auth.currentUser;

    if (!user) return;

    // Puxa os dados do Firestore
    const q = query(collection(db, "complaints"), where("uid", "==", user.uid));
    const snap = await getDocs(q);

    const data = [];
    snap.forEach(doc => data.push({ id: doc.id, ...doc.data() }));

    if (userNameEl) userNameEl.textContent = user.email.split("@")[0];

    if (data.length === 0) {
        list.innerHTML = `<div class="p-4 bg-[#0f1724] text-[color:var(--muted)] rounded-lg">Nenhuma reclamação ainda.</div>`;
        return;
    }

    list.innerHTML = data.map(c => `
        <div class="p-4 bg-[#0f1724] rounded-lg flex justify-between">
            <div>
                <div class="text-[color:var(--muted)] text-sm">${c.empresa} • ${new Date(c.data.seconds * 1000).toLocaleString()}</div>
                <div class="font-semibold mt-1">${c.titulo}</div>
            </div>
            <a href="complaint.html?id=${c.id}" class="px-3 py-2 bg-[color:var(--purple)] rounded-lg">Abrir</a>
        </div>
    `).join("");
}

auth.onAuthStateChanged(() => {
    carregarReclamacoes();
});

/*
=========================
 DETALHE DA RECLAMAÇÃO
=========================
*/

async function carregarDetalhe() {
    const card = document.getElementById("complaintCard");
    if (!card) return;

    const params = new URLSearchParams(location.search);
    const id = params.get("id");

    const docRef = doc(db, "complaints", id);
    const snap = await getDoc(docRef);

    if (!snap.exists()) {
        card.innerHTML = `<p class="text-[color:var(--muted)]">Reclamação não encontrada.</p>`;
        return;
    }

    const c = snap.data();

    card.innerHTML = `
      <div class="text-sm text-[color:var(--muted)]">${c.empresa} • ${new Date(c.data.seconds * 1000).toLocaleString()}</div>
      <div class="text-xl font-semibold mt-2">${c.titulo}</div>
      <div class="mt-3 text-[color:var(--muted)]">${c.descricao}</div>
      <div class="mt-4"><strong>Status:</strong> ${c.status}</div>
    `;
}

carregarDetalhe();
