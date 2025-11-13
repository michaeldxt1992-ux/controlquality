import { auth, db } from "./firebase.js";
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { 
    collection,
    addDoc,
    getDocs,
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// LOGIN
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

// CADASTRO
const signupForm = document.getElementById("signupForm");
if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        try {
            await createUserWithEmailAndPassword(auth, email, senha);
            alert("Conta criada com sucesso!");
            window.location.href = "index.html";
        } catch (error) {
            alert("Erro ao criar conta: " + error.message);
        }
    });
}

// CRIAR RECLAMAÇÃO
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
