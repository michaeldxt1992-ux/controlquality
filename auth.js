// auth.js - login / signup / logout

function showMsg(msg){
  alert(msg);
}

/* LOGIN */
async function login(){
  const email = (document.getElementById('email') || {}).value;
  const password = (document.getElementById('password') || {}).value;

  if(!email || !password){
    showMsg('Preencha email e senha');
    return;
  }

  try{
    await auth.signInWithEmailAndPassword(email, password);
    window.location.href = 'home.html';
  }catch(err){
    console.error(err);
    showMsg('Erro ao logar: ' + (err.message || err));
  }
}

/* SIGNUP */
async function signup(){
  const email = (document.getElementById('email') || {}).value;
  const password = (document.getElementById('password') || {}).value;

  if(!email || !password){
    showMsg('Preencha email e senha');
    return;
  }

  try{
    const res = await auth.createUserWithEmailAndPassword(email, password);
    
    // salva info do user no Firestore
    await db.collection('users').doc(res.user.uid).set({
      email: res.user.email,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    window.location.href = 'home.html';

  }catch(err){
    console.error(err);
    showMsg('Erro ao criar conta: ' + (err.message || err));
  }
}

/* LOGOUT */
function logout(){
  auth.signOut().then(()=>{
    window.location.href = 'index.html';
  });
}

/* Mostrar email do usuário automaticamente */
auth.onAuthStateChanged(user=>{
  const els = document.querySelectorAll('.user-email');
  els.forEach(e => e.textContent = user ? user.email : '');
});
