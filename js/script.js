window.onload = (e) => {
   let formModal = document.querySelector(".form-modal")
   let taskTitle = document.getElementById("task_title")
   let taskDescrption = document.getElementById("task_description")
   let taskDeadline = document.getElementById("task_deadline")
   let taskPriority;

   let addButton = document.querySelector('#btn_add')

   /********************************/
   /*Handling inputs */
   /********************************/
   const tasksCollection = [];
   const task = { titre: "", description: "", priorite: "", dateLimite: "", etat: "" };

   function HandlingInputs(e) {
      if (taskTitle.value == "" || taskDescrption.value == "" || taskDeadline.value == "") {
         taskTitle.style.borderColor = taskTitle.value != "" ? "initial" : "red";
         taskDescrption.style.borderColor = taskDescrption.value != "" ? "initial" : "red";
         taskDeadline.style.borderColor = taskDeadline.value != "" ? "initial" : "red";
         let error = document.querySelector('#error')
         error.classList.toggle('d-none')

         e.preventDefault()
      } else {
         taskPriority = document.querySelector('[name="task_priority"]:checked')
         task.titre = taskTitle.value
         task.description = taskDescrption.value
         task.priorite = taskPriority.value
         task.dateLimite = new Date(taskDeadline.value).toUTCString()
         console.table(JSON.stringify(task))
         document.querySelector('#close_add_task_modal').click()
      }
   }

   addButton.addEventListener("click", function (e) {
      HandlingInputs(e)
   })

   let finishTaskButtons = document.querySelectorAll('#remove_task')
   finishTaskButtons = Array.from(finishTaskButtons)
   let taskCards = document.querySelectorAll('.card')

   finishTaskButtons.forEach((event, i)=>{
      event.addEventListener('click', function () {
         removeTask(finishTaskButtons, event, i);
      })
   })
   /********************************/
   /*Removing Task And Task Card */
   /********************************/
   function removeTask(collection, elt, index) {
      collection.splice(index, 1);
      elt.parentElement.parentElement.parentElement.remove();
   }



}
