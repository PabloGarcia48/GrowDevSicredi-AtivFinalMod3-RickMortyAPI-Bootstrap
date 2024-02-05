let currentPage = 1
let page = 1
let totalPages = 42
let characterID = 0


const prevPage = document.getElementById('prevPage')
const nextPage = document.getElementById('nextPage')
const pagination = document.getElementById('pagination')
const trafficLightCard1 = document.getElementById('trafficLightCard')

function makePaginationInvisible() {
  const search = document.getElementById("search").value
  if (search === '') {
    pagination.classList.add('pagination')
    pagination.classList.remove('invisible')
  } else {
    pagination.classList.remove('pagination')
    pagination.classList.add('invisible')
  }
}

function previousPageFunc() {
  page = currentPage - 1
  fetchCharacters(page)
  currentPage = page
  window.scrollTo({top: 0, behavior: 'smooth'})
  nextPage.classList.remove('invisible')
  if (currentPage <= 1) {
    prevPage.classList.add('invisible')
  }
}

function nextPageFunc() {
  page = currentPage + 1
  fetchCharacters(page)
  currentPage = page
  window.scrollTo({top: 0, behavior: 'smooth'})
  prevPage.classList.remove('invisible')
  if (currentPage >= totalPages) {
    nextPage.classList.add('invisible')
  }
}

async function countPages() {
  try {
     totalPages = (await api.get(`/character`)).data.info.pages
    }
  catch (error) {
    console.log('Erro ao carregar a API', error)
  }
}

async function fetchCharacters(page) {
  const search = document.getElementById("search").value
    try {
       const characters = (await api.get(`/character/?name=${search}&page=${page}`)).data.results //resultado da busca
       cardBuilder(characters)
       const pageNumbers = document.getElementById('pageNumbers')
       pageNumbers.innerHTML = `${currentPage} de ${totalPages}`
      }
    catch (error) {
      console.log('Erro ao carregar a API', error)
    }
  }

async function cardBuilder(characters) {
  const allCharacters = document.getElementById('divCards')
  
  allCharacters.innerHTML = "" // limpa tudo na tela
  characters.forEach(async function _(character) { //preenche a tela de novo
        const lastEpisode = character.episode[character.episode.length - 1]
        let lastEpisodeName = (await api.get(`${lastEpisode}`)).data.name //resultado da busca
        characterID = character.id

        const characterStatus = character.status
        switch (characterStatus) {
          case "Dead":
            trafficLight = "🔴";
            break;
          case "Alive":
            trafficLight = "🟢";
            break;
          case "unknown":
            trafficLight = "🟤";
            break;
        }

          allCharacters.innerHTML += `
          <div class="col-xl-3 col-lg-4 col-md-6 col-12 mb-4">
            <div class="card h-100 cardGlow bg-transparent" id="trafficLightCard">
              <img src="${character.image}" class="card-img-top" alt="ImageNotFound">
              <div class="card-body cardBody">
                <h4 class="cardTitle">${character.name}</h4>
                <p class="cardText cardInfo">${trafficLight} ${character.status} - ${character.species}</p>
                <p class="cardText" >Última localização conhecida</p>
                <p class="cardText cardInfo" >${character.location.name}</p>
                <p class="cardText" >Visto última vez em:</p>
                <p class="cardText cardInfo" >${lastEpisodeName}</p>
                <a href="./detailIndex.html" class="btn btn-outline-success">Veja Detalhes</a>
              </div>
            </div>
          </div>
          `
})}

fetchCharacters(page)
countPages()
makePaginationInvisible()
