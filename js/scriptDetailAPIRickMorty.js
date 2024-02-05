
async function fetchCharacterDetail() {
    try {
       const characterDetail = (await api.get(`/character/5`)).data //resultado da busca
       cardBuilder(characterDetail)
       console.log(characterDetail);
      }
    catch (error) {
      console.log('Erro ao carregar a API', error)
    }
  }

async function cardBuilder(characterDetail) {
  const cardDetail = document.getElementById('divCardsDetails')
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

  cardDetail.innerHTML = `
  <div class="col-xl-3 col-lg-4 col-md-6 col-12 mb-4">
    <div class="card h-100 cardGlow bg-transparent" id="trafficLightCard">
      <img src="${characterDetail.image}" class="card-img-top" alt="ImageNotFound">
      <div class="card-body cardBody">
        <h4 class="cardTitle">${characterDetail.name}</h4>
        <p class="cardText cardInfo">${trafficLight} ${characterDetail.status} - ${characterDetail.species}</p>
        <p class="cardText" >Última localização conhecida</p>
        <p class="cardText cardInfo" >${characterDetail.location.name}</p>
        <p class="cardText" >Visto última vez em:</p>
        <p class="cardText cardInfo" >${lastEpisodeName}</p>
      </div>
    </div>
  </div>
  `

  
//   allCharacters.innerHTML = "" // limpa tudo na tela
//   characters.forEach(async function _(character) { //preenche a tela de novo
//         const lastEpisode = character.episode[character.episode.length - 1]
//         let lastEpisodeName = (await api.get(`${lastEpisode}`)).data.name //resultado da busca

//         const characterStatus = character.status
//         switch (characterStatus) {
//           case "Dead":
//             trafficLight = "🔴";
//             break;
//           case "Alive":
//             trafficLight = "🟢";
//             break;
//           case "unknown":
//             trafficLight = "🟤";
//             break;
//         }


        
//         allCharacters.classList.add('divCard')

//           allCharacters.innerHTML += `
//           <div class="col-xl-3 col-lg-4 col-md-6 col-12 mb-4">
//             <div class="card h-100 cardGlow bg-transparent" id="trafficLightCard">
//               <img src="${character.image}" class="card-img-top" alt="ImageNotFound">
//               <div class="card-body cardBody">
//                 <h4 class="cardTitle">${character.name}</h4>
//                 <p class="cardText cardInfo">${trafficLight} ${character.status} - ${character.species}</p>
//                 <p class="cardText" >Última localização conhecida</p>
//                 <p class="cardText cardInfo" >${character.location.name}</p>
//                 <p class="cardText" >Visto última vez em:</p>
//                 <p class="cardText cardInfo" >${lastEpisodeName}</p>
//                 <a href="./detailIndex.html" class="btn btn-outline-success">Veja Detalhes</a>
//               </div>
//             </div>
//           </div>
//           `
// })
}

fetchCharacterDetail()
// countPages()
// makePaginationInvisible()
