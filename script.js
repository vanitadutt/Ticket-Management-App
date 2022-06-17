let addBtn = document.querySelector(".add-btn");
let modalCont = document.querySelector(".modal-cont");
let mainCont = document.querySelector(".main-cont");
let taskArea = document.querySelector(".textArea-cont");

let removeBtn = document.querySelector('.remove-btn')
let addFlag = false;
let removeFlag = false;

addBtn.addEventListener("click", function () {
  //display the modal
  addFlag = !addFlag;
  if (addFlag == true) {
    modalCont.style.display = "flex";
  } else {
    modalCont.style.display = "none";
  }
});

modalCont.addEventListener("keydown", function (e) {
  let key = e.key;

  if (key == "Shift") {
    createTicket(taskArea.value);
    modalCont.style.display = "none";
    addFlag = false;
    taskArea.value = "";
  }
});

function createTicket(ticketTask) {
  let id = shortid();
  let ticketCont = document.createElement("div");
  ticketCont.setAttribute("class", "ticket-cont");
  ticketCont.innerHTML = ` <div class="ticket-color"></div>
    <div class="ticket-id">#${id}</div>
    <div class="task-area">${ticketTask}</div>
    <div class="ticket-lock">
      <i class="fa-solid fa-lock"></i>
    </div>`;

  mainCont.append(ticketCont);
  handleRemoval(ticketCont);
}

removeBtn.addEventListener('click',function(){
  removeFlag = !removeFlag;

  if(removeFlag === true){
    removeBtn.style.color = 'red';

  }
  else{
    removeBtn.style.color = 'white'
  }
})

function handleRemoval(ticket){

    ticket.addEventListener('click',function(){
      if(!removeFlag) return; //if return
      ticket.remove(); // else remove from ui
    })
    
}