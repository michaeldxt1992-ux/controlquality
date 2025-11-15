// ===============================================================
//  AUTH GUARD - Firebase v8 (compatível com seu projeto)
//  Protege páginas que exigem usuário logado
// ===============================================================

// Garante que firebase foi carregado
if (!firebase.apps.length) {
    console.error("Firebase não inicializado antes do auth-guard!");
}

// Obtém a instância de autenticação
const auth = firebase.auth();

// Protege a página
auth.onAuthStateChanged(user => {
    if (!user) {
        // Se o usuário NÃO estiver logado, volta para o login
        window.location.href = "index.html";
    }
});
