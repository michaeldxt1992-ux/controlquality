// complaint-detail.js - carregar e responder
function getQueryParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}
const id = getQueryParam('id');
const detailEl = document.getElementById('complaintDetail');
const replyForm = document.getElementById('replyForm');
auth.onAuthStateChanged(async (user) => {
  if (!user) return window.location.href = 'index.html';
  if (!id) return detailEl.innerText = 'ID não informado.';
  const doc = await db.collection('reclamacoes').doc(id).get();
  if (!doc.exists) return detailEl.innerText = 'Reclamação não encontrada.';
  detailEl.innerText = JSON.stringify(doc.data(), null, 2);
});
if (replyForm) {
  replyForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const msg = document.getElementById('replyMessage').value;
    if (!id) return alert('ID ausente');
    await db.collection('reclamacoes').doc(id).update({
      reply: msg,
      status: 'respondido',
      repliedAt: new Date()
    });
    alert('Resposta enviada');
    window.location.href = 'complaint-list.html';
  });
}
