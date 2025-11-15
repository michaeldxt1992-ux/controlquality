// =========================
// AUTENTICAÇÃO (LOGIN/CAD)
// =========================

// LOGIN
function login() {
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    if (email === "" || password === "") {
        alert("Preencha todos os campos");
        return;
    }

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            window.location.href = "home.html";
        })
        .catch(err => {
            alert("Erro ao fazer login: " + err.message);
        });
}

// CADASTRO
function signup() {
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    if (email === "" || password === "") {
        alert("Preencha todos os campos");
        return;
    }

    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            alert("Conta criada com sucesso!");
            window.location.href = "index.html";
        })
        .catch(err => {
            alert("Erro ao criar conta: " + err.message);
        });
}

// LOGOUT
function logout() {
    auth.signOut().then(() => {
        window.location.href = "index.html";
    });
}
