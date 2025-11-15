// ================================
// PROTEÇÃO DE ROTAS
// ================================
auth.onAuthStateChanged((user) => {
    // Se o usuário NÃO estiver logado
    if (!user) {
        if (!window.location.pathname.includes("index.html") &&
            !window.location.pathname.includes("signup.html")) {

            window.location.href = "index.html"; // redireciona
        }
    }
});
