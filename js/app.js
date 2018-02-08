const buttonId = document.getElementById("requestResourceButton");
const inputId = document.getElementById("resourceId");
const contentId = document.getElementById("contentContainer");
const typeId = document.getElementById("resourceType");
let input;
let type;
let data;
let species;
let deepData;
let filmList = [];
let needFilms = false;
let builder;

const takeInput = () => {
  input = inputId.value;
  type = typeId.value;
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
  builder();
};

buttonId.addEventListener("click", takeInput);

const getData = tURL => {
  function reqListener() {
    data = JSON.parse(this.responseText).results;
    console.log("reqL data: ", data);
    console.log("input: ", input);
    checkData();
  }

  const oReq = new XMLHttpRequest();
  oReq.addEventListener("load", reqListener);
  oReq.open("GET", tURL);
  oReq.send();
};

const peopleBuilder = () => {
  console.log("people");
  contentId.innerHTML = "";

  eleMaker(contentId, "h2", null, null, myData.name);
  eleMaker(contentId, "p", null, null, myData.gender);

  myData = null;
};

const planetBuilder = () => {
  console.log("planet");
  contentId.innerHTML = "";

  eleMaker(contentId, "h2", null, null, myData.name);
  eleMaker(contentId, "p", null, null, myData.terrain);
  eleMaker(contentId, "p", null, null, myData.population);
  addFilms();
  myData = null;
  needFilms = false;
};

const starshipBuilder = () => {
  console.log("starship");
  contentId.innerHTML = "";

  eleMaker(contentId, "h2", null, null, myData.name);
  eleMaker(contentId, "p", null, null, myData.manufacturer);
  eleMaker(contentId, "p", null, null, myData.starship_class);
  addFilms();
  myData = null;
  needFilms = false;
};

const checkData = () => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].name === input) {
      myData = data[i];
      console.log("myData: ", myData);
      if (needFilms) {
        getFilms();
      } else {
        species = requester(myData.species[0]).name;
      }
      builder();
    }
  }
  throw new Error('"' + input + '" not found');
};

const requester = tURL => {
  function deepListener() {
    deepData = JSON.parse(this.responseText);
    console.log(needFilms);
    if (needFilms === true) {
      eleMaker(uList, "li", null, null, deepData.title);
    } else {
      eleMaker(contentId, "p", null, null, deepData.name);
    }
    console.log(deepData);
    console.log("film title: ", deepData.title);
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
  console.log("films got: ", filmList);
};

const addFilms = () => {
  console.log("adding");
  let uList = eleMaker(contentId, "ul", "listId");
  for (let f = 0; f < filmList.length; f++) {
    eleMaker(uList, "li", null, null, filmList[f]);
    console.log("fl: ", filmList[f]);
  }
  filmList = [];
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
