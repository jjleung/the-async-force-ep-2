const buttonId = document.getElementById("requestResourceButton");
const inputId = document.getElementById("resourceId");
const contentId = document.getElementById("contentContainer");
const typeId = document.getElementById("resourceType");
let data;

const takeInput = () => {
  let input = inputId.value;
  let type = typeId.value;
  let typeURL;
  contentId.innerHTML = input;

  if (type === "people") {
    typeURL = "https://swapi.co/api/people";
  } else if (type === "planets") {
    typeURL = "https://swapi.co/api/planets";
  } else if (type === "starships") {
    typeURL = "https://swapi.co/api/starships";
  }
  console.log(typeURL);
  getData(typeURL);
  console.log("tI data: ", data);
};

buttonId.addEventListener("click", takeInput);

const getData = tURL => {
  console.log("tUrl: ", tURL);
  const reqListener = () => {
    data = JSON.parse(this.responseText);
    console.log("reqL data: ", data);
  };

  const oReq = new XMLHttpRequest();
  oReq.addEventListener("load", reqListener);
  oReq.open("GET", tURL);
  oReq.send();
};
