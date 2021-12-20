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

   // Getting the form
   let formValue = (e) => {
      // e.preventDefault();
      let formulaire = document.querySelector(".add-form");
      let closeBtn = document.querySelector("#close_add_task_modal");
      if (titleValue() == "" || descriptionValue() == "" || getDate() == "") {
         e.preventDefault();
         alert("Veuillez renseigner les champs vides");
      } else {
         addDoc(collRef, {
            Titre: titleValue(),
            DateLimite: getDate(),
            Description: descriptionValue(),
            Priorite: checkInput(),
            Etat: "En cours"
         })
            .then(() => {
               formulaire.reset();
               closeBtn.click();
               console.log("Alright");
            })
      }
   }

   addBtn.addEventListener("click", formValue);

   // Rendering tasks

   let taskContainer = document.querySelector("#task_container");

   let generateTasks = (taskList) => {
      let contentText = "";
      let deadlineDate;
      taskList.forEach((tasks) => {
         deadlineDate = new Date(tasks.DateLimite);
         contentText += `
        <div class="card px-0" data-id="${tasks.id}" id="card-0" >
                <div class="card-header d-flex justify-content-between align-items-center">
                    <div class="d-inline">
                        <button class="border-0 btn-transition btn btn-outline-secondary" id="priority"><i class="fa fa-star"></i> ${tasks.Priorite}
                        </button>
                    </div>
                    <span class="btn btn-small btn-primary fs-x-small py-0" id="state"> ${tasks.Etat}</button>
                </div>
                <div class="card-body">
                    <h6 class="card-title" id="title">${tasks.Titre}</h6>
                        <p class="card-text" id="description">${tasks.Description}</p>
                </div>
                <div class="card-footer py-0 d-flex justify-content-between align-items-center">
                    <strong class="fs-x-small" id="deadline"><i class="fas fa-calendar-day"></i> <b>Date Limite:</b>${deadlineDate}</strong>

                    <div class="d-inline">
                        <a class="border-0 btn-transition btn btn-outline-success" id="finish_task"
                            title="terminer tache">
                            <i class="fa fa-check"></i>
                        </a>
                        <a href="#" class="border-0 btn-transition btn btn-outline-warning" id="edit_task"
                            title="editer tache">
                            <i class="fas fa-edit"> </i>
                        </a>
                        <a class="border-0 btn-transition btn btn-outline-danger" title="supprimer tache"
                            id="remove_task"> <i class="fa fa-trash"></i>
                        </a>
                    </div>
                </div>
            </div>
    `;
      })

      taskContainer.innerHTML = contentText;

      // Deleting a given task
      let taskToDelete = document.querySelectorAll("#remove_task");
      deleteTask(taskToDelete);
   }