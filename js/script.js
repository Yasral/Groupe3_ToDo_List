import {
   initializeApp
} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';


import {
   getFirestore,
   collection,
   updateDoc,
   addDoc,
   deleteDoc,
   getDocs,
   getDoc,
   doc,
   query,
   where,
   orderBy,
   Timestamp
} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';
window.onload = (e) => {

   //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
   //The Config of the  group
   //  const firebaseConfig = {

   //    apiKey: "AIzaSyCPmKwQqsltQlZ22Ok03_Swt6nKEAyuuoU",
   //    authDomain: "storekeeper-85c99.firebaseapp.com",
   //    projectId: "storekeeper-85c99",
   //    storageBucket: "storekeeper-85c99.appspot.com",
   //    messagingSenderId: "195903507633",
   //    appId: "1:195903507633:web:83961fe8ac827f6e44e690",
   //    // measurementId: "${config.measurementId}"
   // };

   //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
   //The Own Config 
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

   /********************************/
   /*Get th e whole task order by dateCreation in the databases */
   /********************************/
   const getTasksList = async (db) => {
      const tasksCollection = collection(db, 'tasks');
      const q = await query(tasksCollection, orderBy("dateCreation", "desc"));
      const querySnapshot = await getDocs(q);
      let taskList = []
      querySnapshot.forEach((doc) => {
         taskList.push({
            id: doc.id,
            data: doc.data()
         })
      });
      return taskList;
   }

   /********************************/
   /*Get the whole task by default from the databases */
   /********************************/
   const getTasksListFunction = async (db) => {
      const tasksCollection = collection(db, 'tasks');
      const taskSnapshot = await getDocs(tasksCollection);
      let taskList = taskSnapshot.docs.map(doc => {

         return {
            "data": doc.data(),
            "id": doc.id
         }
      });

      return taskList


   }
   getTasksList(db).then(taskList => {
      displayAllElements(taskList);
      // let taskCards = document.querySelectorAll('.card')
   });

   /********************************/
   /*Update a task in databases */
   /********************************/
   async function updateTask(id, taskUpdated) {
      try {
         const task = await getDoc(doc(db, "tasks", id))
         taskUpdated.etat = task.data().etat
         await updateDoc(doc(db, "tasks", id), {
            ...taskUpdated
         });

         const oldCard = document.querySelector(`.card[data-id="${id}"]`)
         const newCard = createCardElement(taskUpdated, id, document.querySelectorAll('.card').length)
         oldCard.parentElement.replaceChild(newCard, oldCard)
      } catch (e) {
         console.error("Error Updating Task: ", e);
         alert("Error Updating Task ");
      }

   }

   /********************************/
   /*Update a state task in databases */
   /********************************/
   async function updateStateTask(id, nextStateValue) {
      try {
         await updateDoc(doc(db, "tasks", id), {
            "etat": nextStateValue
         });
      } catch (e) {
         console.error("Error Updating Task State: ", e);
         alert("Error Updating Task State ");
      }
   }

   /********************************/
   /*Remove a state task in databases */
   /********************************/
   async function removeTask(id) {
      try {
         await deleteDoc(doc(db, "tasks", id));
      } catch (e) {
         console.error("Error Deleting Task: ", e);
         alert("Error Deleting Task: ");
      }
   }

   /********************************/
   /*Insert a task in databases */
   /********************************/
   async function addTask(newTask) {
      try {
         const taskRef = await addDoc(collection(db, "tasks"), {
            ...newTask
         });
         const taskObj = await getDoc(doc(db, "tasks", taskRef.id))
         const newCard = createCardElement(taskObj.data(), taskRef.id, document.querySelectorAll('.card').length)
         document.querySelector('.row#card_container').insertAdjacentElement('afterbegin', newCard);
      } catch (e) {
         console.error("Error adding TAsk: ", e);
      }
   }

   function createCardElement(task, refIid, index) {

      const htmlStateElement = document.createElement("span");
      htmlStateElement.innerText = task.etat; //✅
      if (task.etat == "Terminé") {
         htmlStateElement.setAttribute("class", "btn btn-small btn-secondary fs-x-small py-0 state");
      } else {
         htmlStateElement.setAttribute("class", "btn btn-small btn-primary fs-x-small py-0 state");
      }
      // htmlStateElement.setAttribute("id", "");
      // ⭐⭐
      let htmlStarElement = document.createElement("i");
      htmlStarElement.setAttribute("class", "fa fa-star");

      let htmlPriorityElement = document.createElement("button");
      // htmlPriorityElement.setAttribute("id", "");
      htmlPriorityElement.setAttribute("class", "border-0 btn-transition btn btn-outline-secondary priority");
      const starNumber = {
         faible: 1,
         moyen: 2,
         elevee: 3
      }
      for (let index = 1; index <= starNumber[task.priorite]; index++) {
         //✅
         htmlPriorityElement.innerHTML += htmlStarElement.outerHTML
      }
      htmlPriorityElement.innerHTML += `<span class="text">${task.priorite}</span>`; //✅

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
      textDescriptionElement.innerText = task.description; //✅

      let cardTitleElement = document.createElement('h6')
      cardTitleElement.setAttribute('class', "card-title title")
      // cardTitleElement.setAttribute('id', "title")
      cardTitleElement.innerHTML = task.titre; //✅

      const cardBodyElement = document.createElement('div')
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
      deadLineElement.innerHTML = task.dateLimite; //✅

      const cardFooterElement = document.createElement("div");
      cardFooterElement.setAttribute("class", "card-footer py-0 d-flex justify-content-between align-items-center");
      cardFooterElement.appendChild(deadLineElement)
      cardFooterElement.appendChild(actionsParentElement)


      const cardElement = document.createElement("div")
      cardElement.setAttribute("class", "card px-0 shadow-sm");
      cardElement.dataset.id = refIid;
      cardElement.appendChild(cardHeaderElement);
      cardElement.appendChild(cardBodyElement);
      cardElement.appendChild(cardFooterElement);

      /********************************/
      /*Edit Task Details */
      /********************************/
      cardElement.querySelector('.card-body').addEventListener('click', () => {
         handlingDetailsModalContentTask(cardElement)
         document.querySelector('#details_modal_trigger').click()
      })


      /********************************/
      /*Edit Task */
      /********************************/
      cardElement.querySelector('.edit_task').addEventListener('click', () => {
         updateModal(cardElement)
         addButton.addEventListener("click", (e) => {
            submitForm(e, cardElement.dataset.id);
         })
      })

      /********************************/
      /*Remove Task  */
      /********************************/
      cardElement.querySelector('.remove_task').addEventListener('click', () => {
         removeTask(cardElement.dataset.id);
         cardElement.remove()
         // removeTaskButtons.splice(i, 1);
      })

      /********************************/
      /*Mark task as ended */
      /********************************/
      cardElement.querySelector('.finish_task').addEventListener('click', (e) => {
         let stateElement = cardElement.querySelector('.state');
         stateElement.innerText = stateElement.innerText === "Terminé" ? "En cours" : "Terminé";
         //Backend
         updateStateTask(cardElement.dataset.id, stateElement.innerText);
         //Frontend
         stateElement.classList.toggle("btn-primary")
         stateElement.classList.toggle("btn-secondary")
      })

      return cardElement;

   }
   /********************************/
   /*Display all Cards */
   /********************************/
   function displayAllElements(taskList) {
      let card_container = document.getElementById("card_container")
      taskList.forEach((task, i) => {
         card_container.appendChild(createCardElement(task.data, task.id, i));
      })
   }

   /********************************/
   /* */
   /********************************/
   let formModal = document.querySelector(".form-modal")
   let detailsModal = document.querySelector(".showDetailsModal")
   let taskTitleInput = document.getElementById("task_title")
   let taskDescriptionInput = document.getElementById("task_description")
   let taskDeadlineInput = document.getElementById("task_deadline")
   let taskPriorityInput;

   let addButton = document.querySelector('#submit')

   /********************************/
   /*Handling inputs */
   /********************************/

   const submitForm = (e, refId) => {
      const task = {}
      if (taskTitleInput.value == "" || taskDescriptionInput.value == "" || taskDeadlineInput.value == "") {
         taskTitleInput.style.borderColor = taskTitleInput.value != "" ? "initial" : "red";
         taskDescriptionInput.style.borderColor = taskDescriptionInput.value != "" ? "initial" : "red";
         taskDeadlineInput.style.borderColor = taskDeadlineInput.value != "" ? "initial" : "red";
         let error = document.querySelector('#error')
         error.classList.toggle('d-none')
         e.preventDefault()
      } else {
         taskPriorityInput = document.querySelector('[name="task_priority"]:checked')
         task.titre = taskTitleInput.value
         task.description = taskDescriptionInput.value
         task.priorite = taskPriorityInput.value
         task.dateLimite = new Date(taskDeadlineInput.value).toUTCString()
         task.dateCreation = new Date().toUTCString()
         if (refId && refId != undefined) {
            updateTask(refId, task);
         } else {
            task.etat = "En cours"
            addTask(task)
         }
         document.querySelector('#close_add_task_modal').click()
      }
   }

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

   const handlingDetailsModalContentTask = (currentCard) => {
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
   /*Add new  Task details And Task Card */
   /********************************/
   document.querySelector('#add_modal_button').addEventListener('click', function () {
      formModal.reset()
      taskTitleInput.style.borderColor = "initial";
      taskDescriptionInput.style.borderColor = "initial";
      taskDeadlineInput.style.borderColor = "initial";
      let error = document.querySelector('#error')
      error.classList.add('d-none')
      document.querySelector('h5#modal_title').innerHTML = "Ajouter tâche";
      document.querySelector('#submit').innerText = "Valider"
      document.querySelector('#submit').classList.remove('btn-warning')
      document.querySelector('#submit').classList.add('btn-danger')
      addButton.addEventListener("click", (e) => {
         submitForm(e);
      })
      document.querySelector('#add_modal_trigger').click();
   })


   /********************************/
   /*Update Modal when click on edit button */
   /********************************/
   const updateModal = (currentCard) => {
      formModal.reset()
      taskTitleInput.style.borderColor = "initial";
      taskDescriptionInput.style.borderColor = "initial";
      taskDeadlineInput.style.borderColor = "initial";
      let error = document.querySelector('#error')
      error.classList.add('d-none')
      document.querySelector('h5#modal_title').innerHTML = "Modifier tâche"
      document.querySelector('#submit').innerText = "Mettre à jour"
      document.querySelector('#submit').classList.remove('btn-danger')
      document.querySelector('#submit').classList.add('btn-warning')
      // currentCard = document.querySelector('.card')[cardId]
      let taskTitle = currentCard.querySelector('.card-title.title')
      let taskDescription = currentCard.querySelector('.description')
      let taskState = currentCard.querySelector('.state');
      let taskPriority = currentCard.querySelector('.priority span')
      let taskDeadline = currentCard.querySelector('.deadline')

      taskTitleInput.value = taskTitle.innerText
      taskDescriptionInput.value = taskDescription.innerText
      document.querySelector('#details_task_state').innerHTML = taskState.innerText
      taskDeadlineInput.value = new Date(taskDeadline.innerText).toISOString().substring(0, 16)
      document.querySelector(`input[name="task_priority"][value="${taskPriority.innerText}"]`).checked = true

      document.querySelector('#add_modal_trigger').click();
   }




}