let currentPage = 1
let page = 1
let totalPages = 42


const prevPage = document.getElementById('prevPage')
const nextPage = document.getElementById('nextPage')
const pagination = document.getElementById('pagination')

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
  const separator1 = document.getElementById('separator')
  let cardIndex = 0
  
  allCharacters.innerHTML = "" // limpa tudo na tela
  characters.forEach(async function _(character) { //preenche a tela de novo
        const lastEpisode = character.episode[character.episode.length - 1]
        let lastEpisodeName = (await api.get(`${lastEpisode}`)).data.name //resultado da busca

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

        cardIndex += 1
        
        allCharacters.classList.add('divCard')

          allCharacters.innerHTML += `
          <div class="col-6 mb-4">
            <div class="card" style="width: 18rem;">
              <img src="${character.image}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${character.name}</h5>
                <p class="cardText infoCard">${trafficLight} ${character.status} - ${character.species}</p>
                <p class="cardText" >Última localização conhecida</p>
                <p class="cardText infoCard" >${character.location.name}</p>
                <p class="cardText" >Visto última vez em:</p>
                <p class="cardText infoCard" >${lastEpisodeName}</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          </div>
          `
})}

fetchCharacters(page)
countPages()
makePaginationInvisible()
