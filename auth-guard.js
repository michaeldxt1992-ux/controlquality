// ===============================================
// BLOQUEIA ACESSO SE NÃO ESTIVER LOGADO
// ===============================================

if (!firebase.apps.length) {
    alert("Firebase não carregou corretamente.");
}

const authGuard = firebase.auth();

authGuard.onAuthStateChanged(user => {
    if (!user) {
        window.location.href = "index.html"; // voltar pro login
    }
});
