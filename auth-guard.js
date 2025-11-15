// =======================
// PROTEÇÃO DE ROTAS
// =======================

auth.onAuthStateChanged(user => {
    const pagina = window.location.pathname;

    // Se usuário NÃO está logado
    if (!user) {
        if (!pagina.includes("index.html") && !pagina.includes("signup.html")) {
            window.location.href = "index.html";
        }
        return;
    }
});
