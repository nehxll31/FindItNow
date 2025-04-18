import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBUA06j73XYDLEXQcx0simmCJoon80YKWY",
  authDomain: "productsearchui.firebaseapp.com",
  projectId: "productsearchui",
  storageBucket: "productsearchui.firebasestorage.app",
  messagingSenderId: "315591917779",
  appId: "1:315591917779:web:764a999af1ef9b11189426",
  measurementId: "G-3JZQXERF2Z"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
