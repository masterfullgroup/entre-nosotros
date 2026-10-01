import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyCxAGDbmJ8UZQyekP-S-R8OqyUQBIVPwjE',
  authDomain: 'entre-nosotros-1540a.firebaseapp.com',
  projectId: 'entre-nosotros-1540a',
  storageBucket: 'entre-nosotros-1540a.firebasestorage.app',
  messagingSenderId: '964856793958',
  appId: '1:964856793958:web:4a33d123b9369c4d88d6a7'
};

// Reemplaza estos valores por los correos exactos de cada cuenta de Firebase Authentication.
export const usernameEmails = {
  gerson: 'gerson@entrenosotros.app',
  maribel: 'maribel@entrenosotros.app',
  josue: 'josue@entrenosotros.app',
  benjamin: 'benjamin@entrenosotros.app'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
