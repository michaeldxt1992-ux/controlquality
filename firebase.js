import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB2TRTp8vwXdvP4eMzrxmjmWKQcxPNhgRs",
  authDomain: "controlquality-28980.firebaseapp.com",
  projectId: "controlquality-28980",
  storageBucket: "controlquality-28980.firebasestorage.app",
  messagingSenderId: "414926471614",
  appId: "1:414926471614:web:9cd7527cd8e725f1c4f9ef"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
