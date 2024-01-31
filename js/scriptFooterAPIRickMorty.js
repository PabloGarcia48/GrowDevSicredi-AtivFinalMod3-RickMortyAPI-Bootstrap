async function footerInformationCharacter() {
    try {
      const response = (await api.get('/character')).data //preparação da API
      const characters = response.info.count // Armazenando a resposta da API
      const footerCharacters = document.getElementById("footerCharacters") // Pegando o elemento do HTML através do id
      footerCharacters.innerHTML = `PERSONAGENS: ${characters}` //colocando o texto no html

    } catch (error) {
      console.log('Erro ao carregar a API', error)
    }
  }

async function footerInformationLocations() {
  try {
    const response = (await api.get('/location')).data    
    const locations = response.info.count
    const footerLocations = document.getElementById("footerLocations")
    footerLocations.innerHTML = `LOCALIZAÇÕES: ${locations}`

    // console.log(`Localizações ${locations}`);

  } catch (error) {
    console.log('Erro ao carregar a API', error)
  }
}

async function footerInformationEpisodes() {
  try {
    const response = (await api.get('/episode')).data
    const episodes = response.info.count
    const footerEpisodes = document.getElementById("footerEpisodes")
    footerEpisodes.innerHTML = `EPISÓDIOS: ${episodes}`

    // console.log(`Episódios ${episodes}`);

  } catch (error) {
    console.log('Erro ao carregar a API', error)
  }
}

  footerInformationCharacter()
  footerInformationLocations()
  footerInformationEpisodes()