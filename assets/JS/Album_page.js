const ALBUM_URL = ' https://striveschool-api.herokuapp.com/api/deezer/album/'
let albumId = new URLSearchParams(window.location.search).get('id')
console.log('Id', albumId)
let music = new Audio;



function formatDuration(durationInSeconds) {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    const secondsString = seconds.toFixed(0).padStart(2, '0');
    return `${minutes}:${secondsString}`;
}


const showAlbum = function (album) {
    let albumBody = document.getElementsByClassName('album__body')[0]
    let randomColor = Math.floor(Math.random() * 16777215).toString(16);
    let aBody = document.getElementsByClassName('middleAlbumPage')[0]
    aBody.style.backgroundColor = "#" + randomColor
    console.log(albumBody)
    albumBody.innerHTML = `<div><img class="album__img shadow img-fluid ms-1 my-2 border" src="${album.cover_medium}" alt="${album.title}">
</div>
    <div class="ms-2 mt-sm-5 mt-md-0 mt-lg-0 mt-xl-0 album__info">
    <div class="mt-5">
    <p class="album__album fw-bolder mb-0 ms-1 mt-4">Album</p>
    <h2 class=" album__name fw-bolder ms-1">${album.title}</h2>
    </div>
    <div class="artist__info d-flex ms-2">
        <div class="d-flex mt-4 fs-6 art__inf">
            <img class="rounded-circle mx-1" src="${album.artist.picture_small}" alt="${album.artist.name}">
            <a class="text-decoration-none text-light" href="./artist_page.html?id=${album.artist.id}"><p class="fw-bold">${album.artist.name}</p></a>
            <p class="anno__ril">&nbsp&#183&nbsp${album.release_date}&nbsp&#183&nbsp</p>
            <p class="nr__canzoni">${album.nb_tracks} songs, <span class="opacity-50 small">${formatDuration(album.duration)}&nbspminutes</span>
            </p>
        </div>
        <p class="album__annoR d-sm-none opacity-50">Album&nbsp&#183&nbsp<span>${album.release_date}</span></p>
    </div>
</div>`


}

const showSongs = function (songs) {
    let playList = document.getElementById('allSongs')
    songs.forEach(song => {
        let newSong = document.createElement('li');
        let button = document.createElement('button')
        button.innerHTML = `<div class="row align-items-center my-2 title__songName">
        <div class="col-2 d-flex justify-content-center">
            <img src="${song.album.cover_small}"
                alt="" height="40px" />
        </div>
        <div
            class="col-8 text-start d-flex justify-content-between align-items-center">
            <p class="m-0">${song.title}</p>
            <p class="m-0 song__ripro">${song.rank}</p>
        </div>
        <div class="col-2 text-end song__time">${formatDuration(song.duration)}</div>
    </div>`
        button.classList.add('w-100', 'bg-transparent', 'text-white', 'border-0')
        button.addEventListener('click', () => playMusic(song))
        newSong.appendChild(button)
        playList.appendChild(newSong)
    })
}

function playMusic(x) {
    music.pause()
    music.src = x.preview
    music.play()
    let titolo1 = document.getElementById('titoloFooter1')
    titolo1.innerHTML = `             
    <img src="${x.album.cover_small}" alt="${x.album.title}" class="me-3">
    <div>
        <h6 class="mb-0">${x.title}</h6>
        <p class="mb-0 small"${x.artist.name}</p>
    </div>
    <div>
        <i class="bi bi-heart fs-5 ps-4"></i>
    </div>`
    let titolo2 = document.getElementById('footerMobile')
    titolo2.innerHTML = `<img src="${x.album.cover_small}" class="px-3" height="40px" alt="">${x.title}`
    let prendiBtnPlayer = document.getElementsByClassName('bi-play-circle')[0]
    let prendiBtnPlayer2 = document.getElementsByClassName('bi-play-fill')[0]
    music.addEventListener("play", function () {
        prendiBtnPlayer.classList.remove("bi-play-circle")
        prendiBtnPlayer.classList.add("bi-pause-circle")
        prendiBtnPlayer2.classList.remove("bi-play-fill")
        prendiBtnPlayer2.classList.add("bi-pause-fill")
    })
    music.addEventListener("pause", function () {
        prendiBtnPlayer.classList.remove("bi-pause-circle")
        prendiBtnPlayer.classList.add("bi-play-circle")
        prendiBtnPlayer2.classList.remove("bi-pause-fill")
        prendiBtnPlayer2.classList.add("bi-play-fill")
    })
}


if (albumId) {
    fetch(ALBUM_URL + albumId)
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                return new Error('Error!')
            }
        })
        .then((album) => {
            console.log(album)
            showAlbum(album)
            let songs = album.tracks.data
            showSongs(songs)
        })
        .catch((err) => {
            console.log(err)
        })
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

