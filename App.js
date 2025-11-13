import { auth, db } from "./firebase.js";
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { 
    collection,
    addDoc,
    getDocs,
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

console.log("App.js carregado!");  // DEBUG

// LOGIN ------------------------------------------
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    console.log("Login form encontrado.");

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

// SIGNUP / CADASTRO -----------------------------------
const signupForm = document.getElementById("signupForm");
if (signupForm) {

    console.log("Signup form encontrado.");

    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const tipo = document.getElementById("accountType").value;
        const nome = document.getElementById("name").value;
        const email = document.getElementById("su-email").value;
        const senha = document.getElementById("su-password").value;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
            const user = userCredential.user;

            // Salvar dados no Firestore
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

// CRIAR RECLAMAÇÃO -----------------------------------------
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
