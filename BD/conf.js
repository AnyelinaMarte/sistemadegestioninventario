import firebase from 'firebase/app';
import "firebase";

  const firebaseConfig = {
    apiKey: "AIzaSyBqyVVUQt5EU8MTCMA_F1v6IsO5uqrO5D8",
    authDomain: "gestor-de-inventario-7cf22.firebaseapp.com",
    projectId: "gestor-de-inventario-7cf22",
    storageBucket: "gestor-de-inventario-7cf22.appspot.com",
    messagingSenderId: "1093979299140",
    appId: "1:1093979299140:web:b5c90bf72dc86fd7998b11"
  }

  if (!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
  }

  export const db = firebase.firestore();
  export const auth = firebase.auth();