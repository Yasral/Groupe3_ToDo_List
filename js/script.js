// import { initializeApp } from "./firebase/app";
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';


import { getFirestore, collection, onSnapshot, addDoc, deleteDoc, getDocs, doc, query, where, orderBy, Timestamp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';
window.onload = (e) => {


   // const firebaseConfig = {

   //    apiKey: "AIzaSyCPmKwQqsltQlZ22Ok03_Swt6nKEAyuuoU",
   //    authDomain: "storekeeper-85c99.firebaseapp.com",
   //    projectId: "storekeeper-85c99",
   //    storageBucket: "storekeeper-85c99.appspot.com",
   //    messagingSenderId: "195903507633",
   //    appId: "1:195903507633:web:83961fe8ac827f6e44e690",
   //    // measurementId: "${config.measurementId}"
   // };
   const firebaseConfig = {
      apiKey: "AIzaSyCRMEWy6cu1ez4Sv9Ja0eKHhxzJui6AUYQ",
      authDomain: "todoappsimplonbrief.firebaseapp.com",
      projectId: "todoappsimplonbrief",
      storageBucket: "todoappsimplonbrief.appspot.com",
      messagingSenderId: "118571443893",
      appId: "1:118571443893:web:b900e54c6d83b4947900fc",
      measurementId: "${config.measurementId}"
   };

   // Initialize Firebase
   const app = initializeApp(firebaseConfig);
   const db = getFirestore(app);

   // Get a list of tasks from the database
   const getTasksList = async (db) => {
      // const docRef = await addDoc(collection(db, "tasks"), { ...newTask });
      // get all occurence/items in the tasks table
      const tasksCollection = collection(db, 'tasks');
      const taskSnapshot = await getDocs(tasksCollection);
      let taskList = taskSnapshot.docs.map(doc => doc.data());
      return taskList

   }
   getTasksList(db).then(data => {
      displayAllElements(data);
      let taskCards = document.querySelectorAll('.card')

      /********************************/
      /*Mark  Task As finished */
      /********************************/
      let finishTaskButtons = document.querySelectorAll('.finish_task')
      console.log(finishTaskButtons);
      finishTaskButtons.forEach((element, i) => {
         element.addEventListener('click', function (e) {
            const currentCard = taskCards[i];
            let stateElement = currentCard.querySelector('.state');
            stateElement.innerText = stateElement.innerText === "Terminé" ? "En cours" : "Terminé";
            stateElement.classList.toggle("btn-primary")
            stateElement.classList.toggle("btn-secondary")
         })
      });


      /********************************/
      /*Removing Task And Task Card */
      /********************************/
      let removeTaskButtons = document.querySelectorAll('.remove_task')
      console.log(removeTaskButtons);

      removeTaskButtons.forEach((element, i) => {
         element.addEventListener('click', function () {
            removeTask(removeTaskButtons, element, i);
         })
      })
      function removeTask(collection, elt, index) {
         collection.splice(index, 1);
         elt.parentElement.parentElement.parentElement.remove();

      }
      /********************************/
      /*Edit  Task details And Task Card */
      /********************************/
      let editTaskButtons = document.querySelectorAll('.edit_task')
      editTaskButtons.forEach((element, i) => {
         element.addEventListener('click', function () {
            const currentCard = taskCards[i];
            editTaskDetails(currentCard, i)
            document.querySelector('h5#modal_title').innerHTML = "Modifier tâche"
            document.querySelector('#add_modal_trigger').click()
         })
      })

   });



   /********************************/
   /*Insert a task in databases */
   /********************************/
   async function InsertInDatabase(newTask) {
      const docRef = await addDoc(collection(db, "tasks"), { ...newTask });
   }


   // ===================================================

















   /********************************/
   /*Create Card Element */
   /********************************/
   // const tasksCollection = getTasksList(db);
   const task1 = {
      titre: "Titre 1",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi, corrupti.",
      priorite: "moyen",
      dateLimite: "Sun, 12 Dec 2021 09:20:57 GMT",
      etat: "En cours"
   };
   const task2 = {
      titre: "Titre 2",
      description: "Amet consectetur adipisicing elit. Eligendi, corrupti.  amet consectetur adipisicing elit. Eligendi, corrupti.",
      priorite: "elevee",
      dateLimite: "Sun, 14 Dec 2021 09:20:57 GMT",
      etat: "En cours"
   };


   function createCardElement(task) {

      const htmlStateElement = document.createElement("span");
      htmlStateElement.innerText = task.etat;//✅
      // htmlStateElement.setAttribute("id", "");
      htmlStateElement.setAttribute("class", "btn btn-small btn-primary fs-x-small py-0 state");
      // ⭐⭐
      let htmlStarElement = document.createElement("i");
      htmlStarElement.setAttribute("class", "fa fa-star");

      let htmlPriorityElement = document.createElement("button");
      // htmlPriorityElement.setAttribute("id", "");
      htmlPriorityElement.setAttribute("class", "border-0 btn-transition btn btn-outline-secondary priority");
      const starNumber = { faible: 1, moyen: 2, elevee: 3 }
      for (let index = 1; index <= starNumber[task.priorite]; index++) {
         //✅
         htmlPriorityElement.innerHTML += htmlStarElement.outerHTML
      }
      htmlPriorityElement.innerHTML += task.priorite;//✅

      const parentHTMLPriorityElement = document.createElement('div');
      parentHTMLPriorityElement.setAttribute('class', "d-inline");
      parentHTMLPriorityElement.appendChild(htmlPriorityElement);

      const cardHeaderElement = document.createElement('div');
      cardHeaderElement.setAttribute('class', "card-header d-flex justify-content-between align-items-center")
      cardHeaderElement.appendChild(parentHTMLPriorityElement)
      cardHeaderElement.appendChild(htmlStateElement)


      let textDescriptionElement = document.createElement('p')
      textDescriptionElement.setAttribute('class', "card-text font-weight-normal description")
      // textDescriptionElement.setAttribute('id', "description")
      textDescriptionElement.innerText = task.description;//✅

      let cardTitleElement = document.createElement('h6')
      cardTitleElement.setAttribute('class', "card-title title")
      // cardTitleElement.setAttribute('id', "title")
      cardTitleElement.innerHTML = task.titre;//✅

      const cardBodyElement = document.createElement('h6')
      cardBodyElement.setAttribute('class', "card-body title")
      // cardBodyElement.setAttribute('id', "title")
      cardBodyElement.appendChild(cardTitleElement)
      cardBodyElement.appendChild(textDescriptionElement)

      let trashElement = document.createElement("i");
      trashElement.setAttribute("class", "fa fa-trash");
      let parentTrashElement = document.createElement("a");
      // parentTrashElement.setAttribute("id", "");
      parentTrashElement.setAttribute("class", "border-0 btn-transition btn btn-outline-danger remove_task");
      parentTrashElement.setAttribute("title", "supprimer tache");
      parentTrashElement.appendChild(trashElement)

      let finishElement = document.createElement("i");
      finishElement.setAttribute("class", "fa fa-check");
      let parentFinishElement = document.createElement("a");
      // parentFinishElement.setAttribute("id", "");
      parentFinishElement.setAttribute("class", "border-0 btn-transition btn btn-outline-success finish_task");
      parentFinishElement.setAttribute("title", "marquer comme terminée la tâche");
      parentFinishElement.appendChild(finishElement)

      let editElement = document.createElement("i");
      editElement.setAttribute("class", "fa fa-edit");
      let parentEditElement = document.createElement("a");
      // parentEditElement.setAttribute("id", "");
      parentEditElement.setAttribute("class", "border-0 btn-transition btn btn-outline-warning edit_task");
      parentEditElement.setAttribute("title", "modifier tache");
      parentEditElement.appendChild(editElement)

      const actionsParentElement = document.createElement("div")
      actionsParentElement.setAttribute("class", "d-inline");
      actionsParentElement.appendChild(parentFinishElement);
      actionsParentElement.appendChild(parentEditElement);
      actionsParentElement.appendChild(parentTrashElement);


      const deadLineElement = document.createElement("strong")
      deadLineElement.innerHTML = '<i class="fas fa-calendar-day"></i> <b>Date Limite:</b>';
      deadLineElement.setAttribute("class", "fs-x-small deadline");
      deadLineElement.innerHTML = task.dateLimite;//✅

      const cardFooterElement = document.createElement("div");
      cardFooterElement.setAttribute("class", "card-footer py-0 d-flex justify-content-between align-items-center");
      cardFooterElement.appendChild(deadLineElement)
      cardFooterElement.appendChild(actionsParentElement)


      const cardElement = document.createElement("div")
      cardElement.setAttribute("class", "card px-0");
      cardElement.appendChild(cardHeaderElement);
      cardElement.appendChild(cardBodyElement);
      cardElement.appendChild(cardFooterElement);

      return cardElement;

   }
   /********************************/
   /*Display all Cards */
   /********************************/
   function displayAllElements(tasks) {
      let task_container = document.getElementById("task_container")
      tasks.forEach(task => {
         task_container.appendChild(createCardElement(task));
      })
   }
   /********************************/
   /* */
   /********************************/
   let formModal = document.querySelector(".form-modal")
   let detailsModal = document.querySelector(".showDetailsModal")
   let taskTitleInput = document.getElementById("task_title")
   let taskDescrptionInput = document.getElementById("task_description")
   let taskDeadlineInput = document.getElementById("task_deadline")
   let taskPriorityInput;

   let addButton = document.querySelector('#btn_add')

   /********************************/
   /*Handling inputs */
   /********************************/

   function handlingInputs(e, task) {
      if (taskTitleInput.value == "" || taskDescrptionInput.value == "" || taskDeadlineInput.value == "") {
         taskTitleInput.style.borderColor = taskTitleInput.value != "" ? "initial" : "red";
         taskDescrptionInput.style.borderColor = taskDescrptionInput.value != "" ? "initial" : "red";
         taskDeadlineInput.style.borderColor = taskDeadlineInput.value != "" ? "initial" : "red";
         let error = document.querySelector('#error')
         error.classList.toggle('d-none')

         e.preventDefault()
      } else {
         taskPriorityInput = document.querySelector('[name="task_priority"]:checked')
         task.titre = taskTitleInput.value
         task.description = taskDescrptionInput.value
         task.priorite = taskPriorityInput.value
         task.dateLimite = new Date(taskDeadlineInput.value).toUTCString()
         console.table(JSON.stringify(task))
         document.querySelector('#close_add_task_modal').click()
      }
   }

   addButton.addEventListener("click", function (e) {
      const newTask = {}
      handlingInputs(e, newTask)
   })

   let taskCards = document.querySelectorAll('.card')


   /********************************/
   /*Show  Task details And Task Card */
   /********************************/
   let showDetailsTextTrigger = document.querySelectorAll('.card-body')

   showDetailsTextTrigger.forEach((event, i) => {
      event.addEventListener('click', function () {
         const currentCard = taskCards[i];

         handlingDetailsModalContentTask(currentCard)
         document.querySelector('#details_modal_trigger').click()
      })
   })
   function handlingDetailsModalContentTask(currentCard) {
      let taskTitle = currentCard.querySelector('.priority')
      document.querySelector('#details_task_title').innerText = taskTitle.textContent
      let taskDescrption = currentCard.querySelector('.description')
      document.querySelector('#details_task_description').innerText = taskDescrption.innerText
      let taskState = currentCard.querySelector('.state');
      document.querySelector('#details_task_state').innerText = taskState.innerText
      let taskDeadline = currentCard.querySelector('.deadline')
      document.querySelector('#details_task_deadline').innerText = taskDeadline.innerText
   }

   /********************************/
   /*Edit  Task details And Task Card */
   /********************************/
   document.querySelector('#add_modal_button').addEventListener('click', function () {
      formModal.reset()
      document.querySelector('h5#modal_title').innerHTML = "Ajouter tâche";
      document.querySelector('#add_modal_trigger').click();
   })



   function editTaskDetails(currentCard) {
      formModal.reset()
      let taskTitle = currentCard.querySelector('.card-title.title')
      taskTitleInput.value = taskTitle.innerText
      let taskDescrption = currentCard.querySelector('.description')
      // taskDescrptionInput.value = taskDescrption.innerText.split("\n").join('')
      taskDescrptionInput.value = taskDescrption.innerText
      let taskState = currentCard.querySelector('.state');
      document.querySelector('#details_task_state').innerHTML = taskState.innerText
      // new Date().toUTCString('fr-FR')
      // new Date().toLocaleDateString('fr-FR')
      // new Date().toLocaleTimeteString('fr-FR')
      // new Date().toLocaleString('fr-FR')
      let taskDeadline = currentCard.querySelector('.deadline')
      let date = new Date()
      taskDeadlineInput.value =
         date.getUTCFullYear() + "-" + date.getUTCDate() + "-" + date.getUTCMonth()
         + "T"
         + date.getUTCHours() + ":" + date.getUTCMinutes();


      taskPriorityInput = document.querySelector('[name="task_priority"]:checked')
      document.querySelector(`input[name="task_priority"][value="${taskPriorityInput.value}"]`).checked = true
   }




}

