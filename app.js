/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////  DOM  //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Creamos variables y les asignamos los elementos del DOM que necesitamos
const btnGet = document.getElementById("btn-get");
const dataContainer = document.getElementById("data-container");
const paginatorContainer = document.getElementById("paginator");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const reset = document.querySelector(".reset-btn");

///////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////  URL  //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Esta es la url de donde vamos a agarrar los datos
let url = "https://rickandmortyapi.com/api/character";

///////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////  ARRAY  ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

//este arreglo recibirá los datos ya procesados y convertidos por el .then del fetch
let dataReady = [];

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////// Events /////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Este evento nos trae los datos al DOM
btnGet.addEventListener("click", getData);

// Estos eventos van intercambiando entre las paginas de la API con los personajes
prevBtn.addEventListener("click", prevPage);
nextBtn.addEventListener("click", nextPage);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*Esta función utiliza la API de JS fetch para traer datos en formato JSON de una API.
Fetch utiliza el modelo de promesas para trabajar con código asincrónico. En vez de devolver el resultado de inmediato,
con la cuasi certeza de que esos datos arrojarán undefined porque es un proceso que tiene cierta demora, nos dice: "Prometo
que te avisaré cuando tenga la data".
Los subsiguientes métodos .then convierten la data al modelo de objetos de JS y luego la procesan de acuerdo a lo que indiquemos
*/
function getData() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      dataReady = data; //asignamos los datos a la variable global para poder acceder luego desde el paginador
      renderData(dataReady);
    })
    .catch((err) => console.log(err));
  hidBtn();
}

// Esta funcion esconde el boton GetData y muestra el boton Reset
function hidBtn() {
  btnGet.style.display = "none"; // desaparece el btn Get Data al presionarlo, ya que no queremos llamar a los datos nuevamente
  reset.style.display = "flex";
  prevBtn.style.visibility = "visible";
  nextBtn.style.visibility = "visible";
}

// Esta funcion resetea el DOM de nuestra web, esconde el boton Reset y muestra el boton GetData
reset.addEventListener("click", function resetDom() {
  borrarCards();
  btnGet.style.display = "flex";
  prevBtn.style.visibility = "hidden";
  nextBtn.style.visibility = "hidden";
  reset.style.display = "none";
  url = "https://rickandmortyapi.com/api/character"; // pone la url en la primer pagina nuevamente
});

// Esta funcion renderea la data de la API y la muestra en el DOM
function renderData(data) {
  data.results.forEach((element) => {
    const cardBody = document.createElement("div");
    cardBody.classList.add("card");
    cardBody.innerHTML = `
      <div class="img-container">
      <img src="${element.image}" alt="${element.name}"
      <div>
      <h2>${element.name}</h2>
      <p>Species: ${element.species}</p>
      <p>Status: ${element.status}</p>
      `;
    dataContainer.appendChild(cardBody);
  });
  paginator(data.info.prev, data.info.next);
}

// Esta funcion inhabilita los botones prev/next cuando no es posible usarlos
function paginator(prev, next) {
  prev === null ? (prevBtn.style.display = "none") : (prevBtn.style.display = "inline-block");
  next === null ? (nextBtn.style.display = "none") : (nextBtn.style.display = "inline-block");
}

// Estas dos funciones iteran entre las paginas de la API
function nextPage() {
  borrarCards();
  url = dataReady.info.next;
  getData();
}

function prevPage() {
  borrarCards();
  url = dataReady.info.prev;
  getData();
}

// Esta funcion elimina los card element que esten en el contenedor de la data
function borrarCards() {
  dataContainer.innerHTML = "";
}
