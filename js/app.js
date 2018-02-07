const buttonId = document.getElementById("requestResourceButton");
const inputId = document.getElementById("resourceId");
const contentId = document.getElementById("contentContainer");
const typeId = document.getElementById("resourceType");
let input;
let type;
let data;
let deepData;
let filmList = [];
let needFilms = false;
let builder;

const takeInput = () => {
  input = inputId.value;
  type = typeId.value;
  let typeURL;

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
    data = JSON.parse(this.responseText).results;
    console.log("reqL data: ", data);
    console.log("input: ", input);
    let myData = null;
    builder();
  }

  const oReq = new XMLHttpRequest();
  oReq.addEventListener("load", reqListener);
  oReq.open("GET", tURL);
  oReq.send();
};

const peopleBuilder = () => {
  console.log("people");
  contentId.innerHTML = "";
  if (checkData()) {
    eleMaker(contentId, "h2", null, null, myData.name);
    eleMaker(contentId, "p", null, null, myData.gender);
    eleMaker(contentId, "p", null, null, getDeeperData(myData.species[0]).name);
    myData = null;
  } else {
    throw new Error('"' + input + '" not found');
  }
};

const planetBuilder = () => {
  console.log("planet");
  contentId.innerHTML = "";
  needFilms = true;
  if (checkData()) {
    eleMaker(contentId, "h2", null, null, myData.name);
    eleMaker(contentId, "p", null, null, myData.terrain);
    eleMaker(contentId, "p", null, null, myData.population);
    addFilms();
    myData = null;
  } else {
    throw new Error('"' + input + '" not found');
  }
};

const starshipBuilder = () => {
  console.log("starship");
  contentId.innerHTML = "";
  needFilms = true;
  if (checkData()) {
    eleMaker(contentId, "h2", null, null, myData.name);
    eleMaker(contentId, "p", null, null, myData.manufacturer);
    eleMaker(contentId, "p", null, null, myData.starship_class);
    addFilms();
    myData = null;
  } else {
    throw new Error('"' + input + '" not found');
  }
};

const checkData = () => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].name === input) {
      myData = data[i];
      console.log("myData: ", myData);
      getFilms();
      return true;
    }
  }
};

const getDeeperData = tURL => {
  function deepListener() {
    deepData = JSON.parse(this.responseText);
    console.log(needFilms);
    if (needFilms === true) {
      filmList.push(deepData.title);
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
    getDeeperData(myData.films[g]);
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
