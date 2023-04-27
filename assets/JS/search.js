let URL = 'https://striveschool-api.herokuapp.com/api/deezer/search?q=';
let resultSection = document.getElementById('results')

displayResults = function (results) {
  let titoloRisultati = document.getElementById('titoloRicerca')
  titoloRisultati.classList.remove('d-none')
  let sfogliaSection = document.getElementById('sfoglia')
  sfogliaSection.classList.add('d-none')
  resultSection.innerHTML =''
  results.forEach(result => {
      let colResult = document.createElement('div');
      colResult.classList.add('col-12','col-md-4','col-lg-2');
      colResult.innerHTML = `
      <div class="cardsHome my-2">
                              <div class="item">
                              <img src=${result.album.cover_medium} class="width:100px"/>
                                  <div class="play">
                                      <i class="bi bi-play-fill"></i>
                                  </div>
                                  <a href="./artist_page.html?id=${result.artist.id}" class="text-decoration-none text-light"><h4>${result.artist.name}</h4></a>
                                  <a href="./album_page.html?id=${result.album.id}" class="text-decoration-none text-light d-block text-truncate" style="max-width:200px;" ><p>${result.album.title}</p></a>
                                  <p class="d-block text-truncate" style="max-width:200px; color:white;">${result.title}</p>
                              </div>
                          </div>
      `;
    resultSection.appendChild(colResult);
  });
};

const loadResults = query => {
  fetch(URL + query)
  .then((response)=> {
      if(response.ok){
          return response.json()
      }else {
          return new Error('Errore nella gestione della chiamata')
      }
  })
  .then((data)=>{
      displayResults(data.data)
  })
  .catch((err) => {
      console.log(err)
  })
}

let searchQuery;

const handleSearchQuery = e => {
searchQuery = e.target.value.toLowerCase();
};

const searchResults = () => {
loadResults(searchQuery);
};

window.onload = () => {

  const searchInput = document.querySelector(".form-control")
  searchInput.oninput = (event) => handleSearchQuery(event)

  const searchInputMobile = document.querySelector(".inputMobile")
  searchInputMobile.oninput = (event) => handleSearchQuery(event)

  const searchBtn = document.getElementById('search')
  searchBtn.onclick = () => searchResults()

  const searchMobileBtn = document.getElementById('searchMobile')
  searchMobileBtn.onclick = () => searchResults()

  resultSection.innerHTML=''
}


//codice icona volume

const volumeBar = document.querySelector('.volume-bar');
const volumeInput = volumeBar.querySelector('input');
const volumeIcon = volumeBar.querySelector('i');


volumeInput.addEventListener('input', (event) => {
    const volume = parseInt(event.target.value, 10);
    volumeIcon.classList.remove('bi-volume-up', 'bi-volume-down', 'bi-volume-mute');
    if (volume === 0) {
        volumeIcon.classList.add('bi-volume-mute');
    } else if (volume < 50) {
        volumeIcon.classList.add('bi-volume-down');
    } else {
        volumeIcon.classList.add('bi-volume-up');
    }
});