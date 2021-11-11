/*********************    GLOBAL VARIABLES    ************************/
let btnExist = false;
let dataSet = {
  nameSet: "",
  descSet: ""
}

/**************************   FUNCTIONS   *****************************/
/* Create edit and create set buttons */
function showButtons() {
  let createSet = document.createElement("button");
  let editSet = document.createElement("button");
  createSet.innerHTML = "Create Set";
  editSet.innerHTML = "Edit Set";
  createSet.id = "createSet";
  editSet.id = "editSet";
  createSet.onclick = saveInputs;
  editSet.onclick = editLogo;
  document.getElementById("btnGen").appendChild(editSet);
  document.getElementById("btnGen").appendChild(createSet);
  btnExist = true;
};

/* Delete both buttons, check only existing createSet */
function delBtn() {
  let createBtn = document.getElementById(createSet);
  let editBtn = document.getElementById(editSet);
  return createSet.parentNode.removeChild(createSet), editSet.parentNode.removeChild(editSet);
};

/* if button doesn't exists, create them, otherwise delete them */
function checkExist() {
  if (btnExist === false) {
    showButtons();
  } else {
    delBtn();
    btnExist = false;
  }
};

function editLogo() {
  let setList = document.getElementsByClassName("editable");
  console.log(setList.length);
  Array.from(setList).forEach(function (element) {
    console.log(element)
    let createEdit = document.createElement("a");
    createEdit.className = "far fa-edit";
    element.appendChild(createEdit);
  });
}
/********************************************************************/
/************************** NEW SET INPUTS *************************/
/*******************************************************************/

function saveInputs() {
  let setNameInput = document.createElement("input");
  let setDescInput = document.createElement("textarea");
  let sendButton = document.createElement("button");
  let setNameTitle = document.createElement("h3");
  let setDescTitle = document.createElement("h3");
  setNameInput.id = "setNameInput";
  setDescInput.id = "setDescInput";
  sendButton.id = "sendButton";
  setNameTitle.innerHTML = "Set Name :";
  setDescTitle.innerHTML = "Streamers List :";
  sendButton.innerHTML = "Create";
  sendButton.type = "submit";
  sendButton.onclick = postData;
  document.getElementById("menu-inputs").appendChild(setNameTitle);
  document.getElementById("menu-inputs").appendChild(setNameInput);
  document.getElementById("menu-inputs").appendChild(setDescTitle);
  document.getElementById("menu-inputs").appendChild(setDescInput);
  document.getElementById("menu-inputs").appendChild(sendButton);
};

function postData() {

  let name = document.getElementById("setNameInput").value;
  let desc = document.getElementById("setDescInput").value;

  dataSet["nameSet"] = name;
  dataSet["descSet"] = desc;
  console.log(dataSet);

  const response = new XMLHttpRequest();

  response.open("POST", 'http://localhost:8080/dataSet')
  response.setRequestHeader('Content-Type', 'application/json');

  response.send(JSON.stringify(dataSet));

  response.onload = (e) => {
    alert("Vous venez de créer le set : " + response.response);
    let setEdit = document.getElementById("set-list-wrap");
    let set = document.createElement("li");
    set.className = "editable";
    set.innerHTML = response.response;
    setEdit.appendChild(set);
  }

};

function main() {

  Array.from(setArray).forEach(function (element) {
    console.log(element)
    let setEdit = document.getElementById("set-list-wrap");
    let set = document.createElement("li");
    set.className = "editable";
    set.innerHTML = element;
    setEdit.appendChild(set);
  });



}
