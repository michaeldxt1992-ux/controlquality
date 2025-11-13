// app.js (módulo)
import { auth, db } from "./firebase.js";
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { 
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

console.log("App.js carregado!");  // DEBUG

// ----------------- LOGIN -----------------
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    console.log("Login form encontrado.");

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        // IDs do index.html: email, senha
        const emailField = document.getElementById("email");
        const senhaField = document.getElementById("senha");

        if (!emailField || !senhaField) {
            console.error("Campos de login não encontrados (email/senha). IDs esperados: 'email', 'senha'");
            alert("Erro: campos de login ausentes. Abra o console para detalhes.");
            return;
        }

        const email = emailField.value.trim();
        const senha = senhaField.value;

        try {
            await signInWithEmailAndPassword(auth, email, senha);
            console.log("Login bem-sucedido:", email);
            window.location.href = "home.html";
        } catch (error) {
            console.error("Erro ao entrar:", error);
            alert("Erro ao entrar: " + error.message);
        }
    });
}

// ----------------- SIGNUP / CADASTRO -----------------
const signupForm = document.getElementById("signupForm");
if (signupForm) {
    console.log("Signup form encontrado.");

    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        // IDs do signup.html: accountType, name, email, senha
        const tipoEl = document.getElementById("accountType");
        const nomeEl = document.getElementById("name");
        const emailEl = document.getElementById("email");
        const senhaEl = document.getElementById("senha");

        if (!tipoEl || !nomeEl || !emailEl || !senhaEl) {
            console.error("Campos de cadastro ausentes. IDs esperados: accountType, name, email, senha");
            alert("Erro: campos de cadastro ausentes. Veja o console.");
            return;
        }

        const tipo = tipoEl.value;
        const nome = nomeEl.value.trim();
        const email = emailEl.value.trim();
        const senha = senhaEl.value;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
            const user = userCredential.user;
            console.log("Usuário criado no Auth:", user.uid);

            // Salvar dados do usuário no Firestore
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
            console.error("Erro ao criar conta:", error);
            alert("Erro ao criar conta: " + error.message);
        }
    });
}

// ----------------- CRIAR RECLAMAÇÃO -----------------
const complaintForm = document.getElementById("createComplaintForm");
if (complaintForm) {
    complaintForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const empresa = document.getElementById("empresa").value;
        const titulo = document.getElementById("titulo").value;
        const descricao = document.getElementById("descricao").value;

        try {
            await addDoc(collection(db, "complaints"), {
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
