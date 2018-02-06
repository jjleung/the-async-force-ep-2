const buttonId = document.getElementById("requestResourceButton");
const inputId = document.getElementById("resourceId");
const contentId = document.getElementById("contentContainer");
const typeId = document.getElementById("resourceType");
let data;
let builder;

const takeInput = () => {
  let input = inputId.value;
  let type = typeId.value;
  let typeURL;
  contentId.innerHTML = input;

  if (type === "people") {
    typeURL = "https://swapi.co/api/people";
    builder = peopleBuilder;
  } else if (type === "planets") {
    typeURL = "https://swapi.co/api/planets";
    builder = planetBuilder;
  } else if (type === "starships") {
    typeURL = "https://swapi.co/api/starships";
    builder = starshipBuilder;
  }
  getData(typeURL);
};

buttonId.addEventListener("click", takeInput);

const getData = tURL => {
  function reqListener() {
    data = JSON.parse(this.responseText);
    console.log("reqL data: ", data);
    builder();
  }

  const oReq = new XMLHttpRequest();
  oReq.addEventListener("load", reqListener);
  oReq.open("GET", tURL);
  oReq.send();
  return data;
};

const peopleBuilder = () => {
  console.log("people");
};

const planetBuilder = () => {
  console.log("planet");
};

const starshipBuilder = () => {
  console.log("starship");
};
