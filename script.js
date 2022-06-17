let addBtn = document.querySelector(".add-btn");
let modalCont = document.querySelector(".modal-cont");
let mainCont = document.querySelector(".main-cont");
let taskArea = document.querySelector(".textArea-cont");
let removeBtn = document.querySelector(".remove-btn");
let allPriorityColors = document.querySelectorAll(".priority-color");

let allToolboxPriorityColors = document.querySelectorAll('.color');

let colors = ["lightpink", "lightgreen", "lightblue", "black"];
let modalPriorityColor = colors[colors.length-1];
let addFlag = false;
let removeFlag = false;
let lockClass = 'fa-lock';
let unlockClass = 'fa-lock-open'

addBtn.addEventListener("click", function () {
  //display the modal
  addFlag = !addFlag;
  if (addFlag == true) {
    modalCont.style.display = "flex";
  } else {
    modalCont.style.display = "none";
  }
});

// Select the priority color of the task

allPriorityColors.forEach(function (colorElem) {
  colorElem.addEventListener('click', function (e) {
    allPriorityColors.forEach(function (priorityColorElem) {
      priorityColorElem.classList.remove('active');
    });
    colorElem.classList.add('active');
    modalPriorityColor = colorElem.classList[0];
  });
});

// Generating a ticket

modalCont.addEventListener("keydown", function (e) {
  let key = e.key;

  if (key == "Shift") {
    createTicket(taskArea.value,modalPriorityColor);
    modalCont.style.display = "none";
    addFlag = false;
    taskArea.value = "";
  }
});

function createTicket(ticketTask,ticketColor) {
  let id = shortid();
  let ticketCont = document.createElement("div");
  ticketCont.setAttribute("class", "ticket-cont");
  ticketCont.innerHTML = ` <div class="ticket-color ${ticketColor}"></div>
    <div class="ticket-id">#${id}</div>
    <div class="task-area">${ticketTask}</div>
    <div class="ticket-lock">
      <i class="fa-solid fa-lock"></i>
    </div>`;
  
  mainCont.append(ticketCont);
  handleRemoval(ticketCont);
  handleLock(ticketCont);
  handleColor(ticketCont);
}

removeBtn.addEventListener("click", function () {
  removeFlag = !removeFlag;

  if (removeFlag === true) {
    removeBtn.style.color = "red";
  } else {
    removeBtn.style.color = "white";
  }
});

function handleRemoval(ticket) {
  ticket.addEventListener("click", function () {
    if (!removeFlag) return; //if return
    ticket.remove(); // else remove from ui
  });
}

// Lock and unlock tickets

function handleLock(ticket){

  let ticketLockElem = ticket.querySelector('.ticket-lock');
  let ticketLockIcon = ticketLockElem.children[0];
  let ticketTaskArea = ticket.querySelector('.task-area');

  ticketLockIcon.addEventListener('click',function(){
      if(ticketLockIcon.classList.contains(lockClass)){
        ticketLockIcon.classList.remove(lockClass);
        ticketLockIcon.classList.add(unlockClass);
        ticketTaskArea.setAttribute('contenteditable','true');
      }
      else{
        ticketLockIcon.classList.remove(unlockClass);
        ticketLockIcon.classList.add(lockClass);
        ticketTaskArea.setAttribute('contenteditable','false');

      }
  })

}

//Change Color
function handleColor(ticket){
  let ticketColorBand = ticket.querySelector('.ticket-color')


  ticketColorBand.addEventListener('click',function(){
      let currentTicketColor = ticketColorBand.classList[1];
      let currentColorIdx = colors.findIndex(function(color){
        return currentTicketColor === color;
      })
      currentColorIdx++;

      let newTicketColorIdx = currentColorIdx % colors.length;
      let newTicketColor = colors[newTicketColorIdx];

      ticketColorBand.classList.remove(currentTicketColor);
      ticketColorBand.classList.add(newTicketColor);

  })
}
// allToolboxPriorityColors.forEach(function (colorElem) {
//     colorElem.addEventListener('click',function(e){
//       toolboxPriorityColor = colorElem.classList[0];
//       console.log(toolboxPriorityColor);
//     })
// })

