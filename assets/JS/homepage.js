let URL_rock = 'https://striveschool-api.herokuapp.com/api/deezer/search?q=rock'
let URL_pop = 'https://striveschool-api.herokuapp.com/api/deezer/search?q=pop'
let URL_indie = 'https://striveschool-api.herokuapp.com/api/deezer/search?q=indie'
const ALBUM_URL = ' https://striveschool-api.herokuapp.com/api/deezer/album/'
let albumId = new URLSearchParams(window.location.search).get('id')

let i = 0;
/* SALUTO AUTOMATICO*/
let contenitore = document.querySelector('#saluto');
const ora = new Date().getHours();
console.log(ora);

function generaSaluto(orario) {
    if (orario < 5) {
        contenitore.innerText = 'Buonanotte';
    } else if (orario < 12) {
        contenitore.innerText = 'Buongiorno, ben risvegliato';
    } else if (orario < 19) {
        contenitore.innerText = 'Buon Pomeriggio ';
    } else {
        contenitore.innerText = 'Buonasera';
    }
}
window.addEventListener(onload, generaSaluto(ora));

displayDataRock = function (data) {
    let rowReference = document.getElementById('row_rock')
    rowReference.innerHTML = ''
    for (i = 0; i < data.length && i < 6; i++) {
        let newCol = document.createElement('div');
        newCol.className += " col col-12 col-md-4 col-lg-3 col-xxl-2 d-flex justify-content-center"
        newCol.innerHTML = `
        <div class="cardsHome my-2">
                                <div class="item">
                                <a href="./album_page.html?id=${data[i].album.id}"><img src=${data[i].album.cover_medium} class=""/></a>
                                    <div class="play">
                                        <i class="bi bi-play-fill"></i>
                                    </div>
                                    <a href="./artist_page.html?id=${data[i].artist.id}" class="text-decoration-none text-light"><h4>${data[i].artist.name}</h4></a>
                                    <a href="./album_page.html?id=${data[i].album.id}" class="text-decoration-none text-light"><p>${data[i].album.title}</p></a>
                                </div>
                            </div>
        `;
        rowReference.appendChild(newCol);
    }
}

displayDataPop = function (data) {
    let rowReference = document.getElementById('row_pop')
    rowReference.innerHTML = ''
    for (i = 0; i < data.length && i < 6; i++) {
        let newCol = document.createElement('div');
        newCol.className += " col col-12 col-md-4 col-lg-3 col-xxl-2 d-flex justify-content-center"
        newCol.innerHTML = `
        <div class="cardsHome my-2">
                                <div class="item">
                                <a href="./album_page.html?id=${data[i].album.id}"><img src=${data[i].album.cover_medium} style=""/></a>
                                    <div class="play">
                                        <i class="bi bi-play-fill"></i>
                                    </div>
                                    <a href="./artist_page.html?id=${data[i].artist.id}" class="text-decoration-none text-light"><h4>${data[i].artist.name}</h4></a>
                                    <a href="./album_page.html?id=${data[i].album.id}" class="text-decoration-none text-light"><p>${data[i].album.title}</p></a>
                                </div>
                            </div>

        `;
        rowReference.appendChild(newCol);
    }
}

displayDataIndie = function (data) {
    let rowReference = document.getElementById('row_indie')
    rowReference.innerHTML = ''
    for (i = 0; i < data.length && i < 6; i++) {
        let newCol = document.createElement('div');
        newCol.className += " col col-12 col-md-4 col-lg-3 col-xxl-2 d-flex justify-content-center"
        newCol.innerHTML = `
        <div class="cardsHome my-2">
                                <div class="item">
                                <a href="./album_page.html?id=${data[i].album.id}"><img src=${data[i].album.cover_medium} style=""/></a>
                                    <div class="play">
                                        <i class="bi bi-play-fill"></i>
                                    </div>
                                    <a href="./artist_page.html?id=${data[i].artist.id}" class="text-decoration-none text-light"><h4>${data[i].artist.name}</h4></a>
                                    <a href="./album_page.html?id=${data[i].album.id}" class="text-decoration-none text-light"><p>${data[i].album.title}</p></a>
                                </div>
                            </div>

        `;
        rowReference.appendChild(newCol);
    }
}


const getDataRock = function () {
    fetch(URL_rock)
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                return new Error('Errore nella gestione della chiamata')
            }
        })
        .then((data) => {
            displayDataRock(data.data)
        })
        .catch((err) => {
            console.log(err)
        })
}

getDataRock()


const getDataPop = function () {
    fetch(URL_pop)
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                return new Error('Errore nella gestione della chiamata')
            }
        })
        .then((data) => {
            displayDataPop(data.data)
            displayInEvidenza(data.data)
            console.log(data.data)
        })
        .catch((err) => {
            console.log(err)
        })
}

getDataPop()


const getDataIndie = function () {
    fetch(URL_indie)
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                return new Error('Errore nella gestione della chiamata')
            }
        })
        .then((data) => {
            displayDataIndie(data.data)
        })
        .catch((err) => {
            console.log(err)
        })
}

getDataIndie()

// sezione in evidenza

displayInEvidenza = function (data) {
    let nuovoSingolo = document.getElementById('nuovoSingolo')
    nuovoSingolo.innerHTML = `
    <img class="img_singolo_in_evidenza m-2" src="${data[i].album.cover_medium}" alt="${data[i].album.title}" />

    <div class="testi">
        <p class="titolo_album_in_evidenza mt-2 mb-0 p-0">Album</p>
        <p class="titolo_singolo_in_evidenza fs-1 mb-1">${data[i].title}</p>
        <p class="autore_singolo_in_evidenza fs-5">${data[i].artist.name}</p>
        <p class="span_autore_singolo_in_evidenza">
            Ascolta il nuovo singolo di
            <span>${data[i].artist.name}</span>
        </p>

        <div class="pulsanti d-flex align-items-center">
            <button class="pulsante_play" href="">Play</button>
            <a class="pulsante_salva" href="">Salva</a>
            <span class="menu_pulsanti ">&middot;&middot;&middot;</span>
        </div>
    </div>
    `
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

