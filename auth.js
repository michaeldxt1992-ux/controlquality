// ================================
// LOGIN DO USUÁRIO
// ================================
function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("Preencha todos os campos.");
        return;
    }

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            window.location.href = "home.html";
        })
        .catch((error) => {
            console.error("Erro ao fazer login:", error);
            alert("Erro ao fazer login: " + error.message);
        });
}


// ================================
// CRIAR CONTA (para signup.html)
// ================================
function signup() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("Preencha todos os campos.");
        return;
    }

    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            alert("Conta criada com sucesso!");
            window.location.href = "index.html";
        })
        .catch((error) => {
            console.error("Erro ao criar conta:", error);
            alert("Erro ao criar conta: " + error.message);
        });
}
