// complaint-list.js - lista todas reclamações (painel empresa)
const listEl = document.getElementById('complaintsList');
auth.onAuthStateChanged(async (user) => {
  if (!user) return window.location.href = 'index.html';
  const profile = await db.collection('usuarios').doc(user.uid).get();
  if (!profile.exists || profile.data().tipo !== 'empresa') return;
  const snapshot = await db.collection('reclamacoes').orderBy('createdAt', 'desc').get();
  listEl.innerHTML = '';
  snapshot.forEach(doc => {
    const data = doc.data();
    const li = document.createElement('li');
    li.innerHTML = `<strong>${data.title}</strong> — ${data.status} — <a href="complaint-detail.html?id=${doc.id}">Ver / Responder</a>`;
    listEl.appendChild(li);
  });
});
