// auth-guard.js - permite só empresas nas páginas protegidas
auth.onAuthStateChanged(async (user) => {
  if (!user) return window.location.href = 'index.html';
  const profile = await db.collection('usuarios').doc(user.uid).get();
  if (!profile.exists || profile.data().tipo !== 'empresa') {
    alert('Acesso negado. Apenas empresas.');
    window.location.href = 'home.html';
  }
});
