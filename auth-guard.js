// auth-guard.js
// Protege páginas que precisam de login
// Ativa automaticamente quando <body data-guard="true">

(function(){
  // Verifica se a página pediu proteção
  const guard = document.body.dataset.guard === "true";
  if (!guard) return;

  // Se guard está ativado, verifica usuário
  auth.onAuthStateChanged(user => {
    if (!user) {
      // Redireciona para login
      window.location.href = "index.html";
    } else {
      // Preenche email (opcional)
      const items = document.querySelectorAll(".user-email");
      items.forEach(el => el.textContent = user.email);
    }
  });
})();
