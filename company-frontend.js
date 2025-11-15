// company-frontend.js - mostra dados da empresa
auth.onAuthStateChanged(async (user) => {
  if (!user) return window.location.href = 'index.html';
  const uid = user.uid;
  const doc = await db.collection('empresas').doc(uid).get();
  const el = document.getElementById('companyInfo');
  if (!doc.exists) {
    el.innerText = 'Nenhuma empresa encontrada para esse usuário.';
    return;
  }
  el.innerText = 'Empresa: ' + doc.data().name;
});
