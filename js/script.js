window.onload = (e) => {
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
   const tasksCollection = [];
   const task = { titre: "", description: "", priorite: "", dateLimite: "", etat: "" };

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
         STATE.textContent = STATE.textContent === "Terminé" ? "En cours" : "Terminé"
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
   
}
