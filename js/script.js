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

   // Getting the Title
   let titleValue = () => {
      let title = document.querySelector("#task_title").value;
      return title;
   }

   // Getting the description value

   let descriptionValue = () => {
      let description = document.querySelector("#task_description").value;
      return description;
   }

   // Fetching the priority value
   let checkInput = () => {
      let inputs = document.querySelectorAll(".form-check-input");
      for (let i = 0; i < inputs.length; i++) {
         if (inputs[i].checked) {
            var inputValue = inputs[i].value;
         }
      }
      return inputValue;
   }