// complaint-create.js - cria reclamação no Firestore
const form = document.getElementById('createComplaintForm');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return window.location.href = 'index.html';
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    await db.collection('reclamacoes').add({
      uid: user.uid,
      title,
      description,
      status: 'aberto',
      createdAt: new Date()
    });
    alert('Reclamação criada.');
    window.location.href = 'home.html';
  });
}
