// home.js - mostra reclamações do usuário logado
auth.onAuthStateChanged(async (user) => {
  if (!user) return window.location.href = 'index.html';
  const uid = user.uid;
  const userDoc = await db.collection('usuarios').doc(uid).get();
  document.getElementById('userInfo').innerText = 'Olá, ' + (userDoc.exists ? userDoc.data().nome : user.email);
  const list = document.getElementById('myComplaints');
  list.innerHTML = '';
  const snapshot = await db.collection('reclamacoes').where('uid', '==', uid).orderBy('createdAt', 'desc').get();
  snapshot.forEach(doc => {
    const li = document.createElement('li');
    li.innerText = doc.data().title + ' - ' + doc.data().status;
    list.appendChild(li);
  });
});
