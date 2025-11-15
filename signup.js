// signup.js - criar conta e salvar perfil
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const tipo = document.getElementById('accountType').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
      const cred = await auth.createUserWithEmailAndPassword(email, password);
      const uid = cred.user.uid;
      await db.collection('usuarios').doc(uid).set({
        nome: name,
        email,
        tipo,
        criadoEm: new Date()
      });
      window.location.href = "home.html";
    } catch (err) {
      alert("Erro ao criar: " + err.message);
    }
  });
}
