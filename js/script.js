window.onload = (e) => {
   let formModal = document.querySelector(".form-modal")
   let taskTitle = document.getElementById("task_title")
   let taskDescrption = document.getElementById("task_description")
   let taskDeadline = document.getElementById("task_deadline")
   let taskPriority ;

   let addButton = document.querySelector('#btn_add')

   /********************************/
   /*Handling inputs */
   /********************************/
   const tasksCollection = [];
   const task = { titre: "", description: "", priorite:"", dateLimite: ""};

   function HandlingInputs(e) {
      if (taskTitle.value == "" || taskDescrption.value == "" || taskDeadline.value == "") {
         taskTitle.style.borderColor = taskTitle.value != "" ? "initial" : "red";
         taskDescrption.style.borderColor =  taskDescrption.value != "" ? "initial" : "red";
         taskDeadline.style.borderColor = taskDeadline.value != "" ? "initial" : "red";
         let error = document.querySelector('#error')
         error.classList.toggle('d-none')
         e.preventDefault()
         // if (taskTitle.value === "") {
         //    email.style.borderColor = "red"
         // }
         // if (taskDescrption.value == "") {
         //    password.style.borderColor = "red"
         // }
         // if (taskPriority.value == "") {
         //    taskPriority.style.borderColor = "red"
         // }
      } else {
         taskPriority = document.querySelector('[name="task_priority"]:checked')
         task.titre = taskTitle.value
         task.description = taskDescrption.value
         task.priorite = taskPriority.value
         task.dateLimite = new Date (taskDeadline.value).toUTCString()
         console.table(JSON.stringify(task))
         document.querySelector('#close_add_task_modal').click()
         // let modal = document.querySelector('button.close')
         // document.querySelector('#finish_task').addEventListener('click', function() {
         //    $("#addTaskModal").modal("show");
         // })
         // window.localStorage
         // sessionStorage.setItem("user", JSON.stringify(user))
         
         
      }
   }
   

   addButton.addEventListener("click", function (e) {
      HandlingInputs(e)
   })


}
