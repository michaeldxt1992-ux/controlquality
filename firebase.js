<!-- Firebase SDKs -->
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js"></script>

<script>
// ================================
// CONFIGURAÇÃO FIREBASE (SDK 8)
// ================================
var firebaseConfig = {
    apiKey: "AIzaSyB2TRTp8vwXdvP4eMzrxmjmWKQcxPNhgRs",
    authDomain: "controlquality-28980.firebaseapp.com",
    projectId: "controlquality-28980",
    storageBucket: "controlquality-28980.appspot.com",
    messagingSenderId: "414926471614",
    appId: "1:414926471614:web:9cd7527cd8e725f1c4f9ef"
};

// Inicializar
firebase.initializeApp(firebaseConfig);

// Exportar
window.auth = firebase.auth();
window.db = firebase.firestore();
</script>
