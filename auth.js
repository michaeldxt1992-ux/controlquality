// ===============================================
// LÓGICA DE LOGIN E CRIAÇÃO DE CONTA (AUTENTICAÇÃO)
// ===============================================

// Login
function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("Preencha e-mail e senha!");
        return;
    }

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            window.location.href = "home.html";
        })
        .catch(error => {
            alert("Erro ao entrar: " + error.message);
        });
}

// Criar conta
function signup() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("Preencha e-mail e senha!");
        return;
    }

    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            alert("Conta criada com sucesso!");
            window.location.href = "index.html";
        })
        .catch(error => {
            alert("Erro ao criar conta: " + error.message);
        });
}
