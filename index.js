// index.js - login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      window.location.href = "home.html";
    } catch (err) {
      alert("Erro ao entrar: " + err.message);
    }
  });
}
