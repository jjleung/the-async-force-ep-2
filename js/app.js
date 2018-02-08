const buttonId = document.getElementById("requestResourceButton");
const inputId = document.getElementById("resourceId");
const contentId = document.getElementById("contentContainer");
const typeId = document.getElementById("resourceType");
let input;
let type;
let data;
let deepData;
let needFilms;
let builder;
let uList;

const takeInput = () => {
  contentId.innerHTML = "";
  input = inputId.value;
  type = typeId.value;
  needFilms = false;

  let typeURL;
  let myData = null;

  if (type === "people") {
    typeURL = "https://swapi.co/api/people";
    builder = peopleBuilder;
  } else if (type === "planets") {
    typeURL = "https://swapi.co/api/planets";
    needFilms = true;
    builder = planetBuilder;
  } else if (type === "starships") {
    typeURL = "https://swapi.co/api/starships";
    needFilms = true;
    builder = starshipBuilder;
  }
  getData(typeURL);
};

buttonId.addEventListener("click", takeInput);

const getData = tURL => {
  function reqListener() {
    data = JSON.parse(this.responseText).results;
    console.log("data: ", data);
    checkData();
  }

  const oReq = new XMLHttpRequest();
  oReq.addEventListener("load", reqListener);
  oReq.open("GET", tURL);
  oReq.send();
};

const peopleBuilder = () => {
  console.log("people");
  eleMaker(contentId, "h2", null, null, myData.name);
  eleMaker(contentId, "p", null, null, myData.gender);
};

const planetBuilder = () => {
  console.log("planet");
  eleMaker(contentId, "h2", null, null, myData.name);
  eleMaker(contentId, "p", null, null, myData.terrain);
  eleMaker(contentId, "p", null, null, myData.population);
  uList = eleMaker(contentId, "ul", "listId");
};

const starshipBuilder = () => {
  console.log("starship");
  eleMaker(contentId, "h2", null, null, myData.name);
  eleMaker(contentId, "p", null, null, myData.manufacturer);
  eleMaker(contentId, "p", null, null, myData.starship_class);
  uList = eleMaker(contentId, "ul", "listId");
};

const checkData = () => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].name === input) {
      myData = data[i];
      console.log("myData: ", myData);
      builder();
      if (needFilms) {
        getFilms();
      } else {
        requester(myData.species[0]);
      }

      myData = null;
      return true;
    }
  }
  throw new Error('"' + input + '" not found');
};

const requester = tURL => {
  function deepListener() {
    deepData = JSON.parse(this.responseText);
    console.log("needFilms: ", needFilms);
    if (needFilms) {
      eleMaker(uList, "li", null, null, deepData.title);
    } else {
      eleMaker(contentId, "p", null, null, deepData.name);
    }
  }
  const deepReq = new XMLHttpRequest();
  deepReq.addEventListener("load", deepListener);
  deepReq.open("GET", tURL);
  deepReq.send();
  return deepData;
};

const getFilms = () => {
  for (let g = 0; g < myData.films.length; g++) {
    requester(myData.films[g]);
  }
};

const eleMaker = (parent, ele, id, cls, inner) => {
  let myEle = document.createElement(ele);
  if (id) {
    myEle.id = id;
  }
  if (cls) {
    myEle.class = cls;
  }
  if (inner) {
    myEle.innerHTML = inner;
  }

  parent.appendChild(myEle);
  return document.getElementById(id);
};
