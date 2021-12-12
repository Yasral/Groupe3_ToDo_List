window.onload = (e) => {
   /********************************/
   /*Create Card Element */
   /********************************/

   const tasksCollection = [];
   const task1 = {
      titre: "Titre 1",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi, corrupti.",
      priorite: "faible",
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
   tasksCollection.push(task1)
   tasksCollection.push(task2)

   function createCardElement(task) {

      const htmlStateElement = document.createElement("span");
      htmlStateElement.innerText = task.etat;//✅
      htmlStateElement.setAttribute("id", "state");
      htmlStateElement.setAttribute("class", "btn btn-small btn-primary fs-x-small py-0");
      // ⭐⭐
      let htmlStarElement = document.createElement("i");
      htmlStarElement.setAttribute("class", "fa fa-star");

      let htmlPriorityElement = document.createElement("button");
      htmlPriorityElement.setAttribute("id", "priority");
      htmlPriorityElement.setAttribute("class", "border-0 btn-transition btn btn-outline-secondary");
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
      textDescriptionElement.setAttribute('class', "card-text")
      textDescriptionElement.setAttribute('id', "description")
      textDescriptionElement.innerText = task.description;//✅

      let cardTitleElement = document.createElement('h6')
      cardTitleElement.setAttribute('class', "card-title")
      cardTitleElement.setAttribute('id', "title")
      cardTitleElement.innerHTML = task.titre;//✅

      const cardBodyElement = document.createElement('h6')
      cardBodyElement.setAttribute('class', "card-body")
      cardBodyElement.setAttribute('id', "title")
      cardBodyElement.appendChild(cardTitleElement)
      cardBodyElement.appendChild(textDescriptionElement)

      let trashElement = document.createElement("i");
      trashElement.setAttribute("class", "fa fa-trash");
      let parentTrashElement = document.createElement("a");
      parentTrashElement.setAttribute("id", "remove_task");
      parentTrashElement.setAttribute("id", "remove_task");
      parentTrashElement.setAttribute("class", "border-0 btn-transition btn btn-outline-danger");
      parentTrashElement.setAttribute("title", "supprimer tache");
      parentTrashElement.appendChild(trashElement)

      let finishElement = document.createElement("i");
      finishElement.setAttribute("class", "fa fa-check");
      let parentFinishElement = document.createElement("a");
      parentFinishElement.setAttribute("id", "finish_task");
      parentFinishElement.setAttribute("class", "border-0 btn-transition btn btn-outline-success");
      parentFinishElement.setAttribute("title", "marquer comme terminée la tâche");
      parentFinishElement.appendChild(finishElement)

      let editElement = document.createElement("i");
      editElement.setAttribute("class", "fa fa-edit");
      let parentEditElement = document.createElement("a");
      parentEditElement.setAttribute("id", "edit_task");
      parentEditElement.setAttribute("class", "border-0 btn-transition btn btn-outline-warning");
      parentEditElement.setAttribute("title", "modifier tache");
      parentEditElement.appendChild(editElement)

      const actionsParentElement = document.createElement("div")
      actionsParentElement.setAttribute("class", "d-inline");
      actionsParentElement.appendChild(parentFinishElement);
      actionsParentElement.appendChild(parentEditElement);
      actionsParentElement.appendChild(parentTrashElement);


      const deadLineElement = document.createElement("strong")
      deadLineElement.innerHTML = '<i class="fas fa-calendar-day"></i> <b>Date Limite:</b>';
      deadLineElement.setAttribute("id", "deadline");
      deadLineElement.setAttribute("class", "fs-x-small");
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
   /*Display all CArds */
   /********************************/
   function displayAllElements(tasks) {
      tasks.forEach(task => {
         task_container.appendChild(createCardElement(task));
      })
   }
   displayAllElements(tasksCollection)

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

   function HandlingInputs(e) {
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
      HandlingInputs(e)
   })

   let taskCards = document.querySelectorAll('.card')
   /********************************/
   /*Mark  Task As finished */
   /********************************/
   let finishTaskButtons = document.querySelectorAll('#finish_task')
   finishTaskButtons.forEach((event, i) => {
      event.addEventListener('click', function () {
         const currentCard = taskCards[i];
         let STATE = currentCard.querySelector('#state');
         STATE.innerText = STATE.innerText === "Terminé" ? "En cours" : "Terminé";
         STATE.classList.toggle("btn-primary")
         STATE.classList.toggle("btn-secondary")
      })
   })

   /********************************/
   /*Removing Task And Task Card */
   /********************************/
   let removeTaskButtons = document.querySelectorAll('#remove_task')
   removeTaskButtons = Array.from(removeTaskButtons)

   removeTaskButtons.forEach((event, i) => {
      event.addEventListener('click', function () {
         removeTask(removeTaskButtons, event, i);
      })
   })
   function removeTask(collection, elt, index) {
      collection.splice(index, 1);
      elt.parentElement.parentElement.parentElement.remove();

   }

   /********************************/
   /*Show  Task details And Task Card */
   /********************************/
   let showDetailsTextTrigger = document.querySelectorAll('.card-body')

   showDetailsTextTrigger.forEach((event, i) => {
      event.addEventListener('click', function () {
         handlingDetailsModalContentTask(i)
         document.querySelector('#details_modal_trigger').click()
      })
   })
   function handlingDetailsModalContentTask(index) {
      const currentCard = taskCards[index];
      let taskTitle = currentCard.querySelector('#priority')
      document.querySelector('#details_task_title').innerHTML = taskTitle.textContent
      let taskDescrption = currentCard.querySelector('#description')
      document.querySelector('#details_task_description').innerHTML = taskDescrption.textContent
      let taskState = currentCard.querySelector('#state');
      document.querySelector('#details_task_state').innerHTML = taskState.textContent
      let taskDeadline = currentCard.querySelector('#deadline')
      document.querySelector('#details_task_deadline').innerHTML = taskDeadline.textContent
   }

   /********************************/
   /*Edit  Task details And Task Card */
   /********************************/
   let editTaskButtons = document.querySelectorAll('#edit_task')
   editTaskButtons.forEach((event, i) => {
      event.addEventListener('click', function () {
         editTaskDetails(i)
         document.querySelector('#add_modal_trigger').click()
      })
   })

   function editTaskDetails(index) {
      formModal.reset()
      const currentCard = taskCards[index];
      let taskTitle = currentCard.querySelector('#priority')
      taskTitleInput.value = taskTitle.innerText
      let taskDescrption = currentCard.querySelector('#description')
      taskDescrptionInput.value = taskDescrption.innerText.split("\n").join('')
      let taskState = currentCard.querySelector('#state');
      document.querySelector('#details_task_state').innerHTML = taskState.innerText
      // new Date().toUTCString('fr-FR')
      // new Date().toLocaleDateString('fr-FR')
      // new Date().toLocaleTimeteString('fr-FR')
      // new Date().toLocaleString('fr-FR')
      let taskDeadline = currentCard.querySelector('#deadline')
      let date = new Date()
      taskDeadlineInput.value =
         date.getUTCFullYear() + "-" + date.getUTCDate() + "-" + date.getUTCMonth()
         + "T"
         + date.getUTCHours() + ":" + date.getUTCMinutes();


      taskPriorityInput = document.querySelector('[name="task_priority"]:checked')
      document.querySelector(`input[name="task_priority"][value="${taskPriorityInput.value}"]`).checked = true
   }




}

