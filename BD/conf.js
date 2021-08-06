import firebase from 'firebase/app';
import "firebase";

var secondaryAppConfig = {
  apiKey: "AIzaSyA7g5JnqlVujBjCt3P_pW_fSXrfSAKkXa4",
  authDomain: "sgi-empleados.firebaseapp.com",
  projectId: "sgi-empleados",
  storageBucket: "sgi-empleados.appspot.com",
  messagingSenderId: "664685788577",
  appId: "1:664685788577:web:f1bc8fe5814a90b36ddfe0"
};

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
  firebase.initializeApp(secondaryAppConfig, "secondary") ;    

}
export const authSecondary = firebase.apps[1].auth();
export const dbSecondary = firebase.apps[1].firestore() ;
export const db = firebase.apps[0].firestore();
export const auth = firebase.apps[0].auth();