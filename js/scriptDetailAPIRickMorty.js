var cardID = localStorage.getItem('cardID');

async function fetchCharacterDetail(cardID) {
    try {
       const characterDetail = (await api.get(`/character/${cardID}`)).data //resultado da busca
       cardBuilderDetail(characterDetail)
       console.log(characterDetail);
      }
    catch (error) {
      console.log('Erro ao carregar a API', error)
    }
  }

async function cardBuilderDetail(characterDetail) {
  const cardDetail = document.getElementById('divCardsDetails')
  const pageTitleName = document.getElementById('pageTitle')
    const lastEpisode = characterDetail.episode[characterDetail.episode.length - 1]
    let lastEpisodeName = (await api.get(`${lastEpisode}`)).data.name //resultado da busca

  const characterStatus = characterDetail.status
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

  pageTitleName.innerHTML = `<title>${characterDetail.name}</title>`

  cardDetail.innerHTML = `
  <div class="col-xl-4 col-lg-6 col-md-6 col-12 mb-4">
    <div class="card h-100 cardGlow bg-transparent" id="trafficLightCard">
      <img src="${characterDetail.image}" class="card-img-top" alt="ImageNotFound">
      <div class="card-body cardBody">
        <h4 class="cardTitle">${characterDetail.name}</h4>
        <p class="cardText cardInfo">${trafficLight} ${characterDetail.status} - ${characterDetail.species}</p>
        <p class="cardText" >Gênero:</p>
        <p class="cardText cardInfo" >${characterDetail.gender}</p>
        <p class="cardText" >Origem:</p>
        <p class="cardText cardInfo" >${characterDetail.origin.name}</p>
        <p class="cardText" >Última localização conhecida:</p>
        <p class="cardText cardInfo" >${characterDetail.location.name}</p>
        <p class="cardText" >Visto última vez em:</p>
        <p class="cardText cardInfo" >${lastEpisodeName}</p>
        <p class="cardText" >Episódios em que aparece:</p>
        <p class="cardText cardInfo" >${characterDetail.episode.length}</p>
        <p class="cardText" >API id:</p>
        <p class="cardText cardInfo" >${characterDetail.id}</p>
      </div>
    </div>
  </div>
  `
}

fetchCharacterDetail(cardID)
