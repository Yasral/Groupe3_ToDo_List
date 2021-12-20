import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';


import {
   getFirestore, collection, onSnapshot, addDoc, deleteDoc, getDocs, doc,
   query, where, orderBy
} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

window.addEventListener("load", (e) => {
   const firebaseConfig = {

      apiKey: "AIzaSyDQg3ALrJN28q3B--xTzY6M_I941xC54fA",

      authDomain: "todo-list-2f690.firebaseapp.com",

      projectId: "todo-list-2f690",

      storageBucket: "todo-list-2f690.appspot.com",

      messagingSenderId: "612806470513",

      appId: "1:612806470513:web:3feb31fd6d37b1bc1c24d0"

   };

   // Initialize Firebase
   const app = initializeApp(firebaseConfig);
   // const db = getFirestore(app);
   const db = getFirestore();

   // collection ref
   const collRef = collection(db, "Taches");

   // Getting the add btn 

   let addBtn = document.querySelector("#btn_add");

   // Getting the datas

   // Beginning by the date
   let getDate = () => {
      let userDate = document.querySelector("#task_deadline").value;
      return userDate;
   }