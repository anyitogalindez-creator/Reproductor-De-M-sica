// Arreglo indexado con la información exacta de tus archivos de sonido locales
const playlist = [
    {
        title: "Quédate",
        artist: "3AM ",
        cover: "https://picsum.photos/280?random=11", 
        src: "assets/canciones/3AM - Quédate mp3.mp3"
    },
    {
        title: "Ni Te Imaginas",
        artist: "Abraham Mateo",
        cover: "https://picsum.photos/280?random=22", 
        src: "assets/canciones/Abraham Mateo - Ni Te Imaginas mp3.mp3"
    },
    {
        title: "Quiero Decirte",
        artist: "Abraham Mateo & Ana Mena",
        cover: "https://picsum.photos/280?random=33", 
        src: "assets/canciones/Abraham Mateo_ Ana Mena - Quiero Decirte.mp3"
    }
];

let currentSongIndex = 0;
const audio = new Audio();

// Requisito Cumplido: Captura usando getElementById para los textos e imágenes
const songTitle = document.getElementById("song-title");
const songArtist = document.getElementById("song-artist");
const songCover = document.getElementById("song-cover");

// Requisito Cumplido: Captura usando querySelector para los botones multimedia
const btnPlayPause = document.querySelector("#btn-play-pause");
const iconPlayPause = btnPlayPause.querySelector(".material-symbols-outlined");
const btnNext = document.querySelector("#btn-next");
const btnPrev = document.querySelector("#btn-prev");

// Capturas de las barras de rango de interacción
const progressBar = document.querySelector(".progress-bar");
const currentTimeLabel = document.querySelector(".current-time");
const totalTimeLabel = document.querySelector(".total-time");
const volumeSlider = document.querySelector(".volume-slider");

// Requisito Cumplido: Captura grupal usando querySelectorAll para los paneles de vistas
const menuLinks = document.querySelectorAll(".menu-links a");
const views = document.querySelectorAll(".music-view");

// Función encargada de cargar los metadatos y fuentes lógicas de audio
function loadSong(song) {
    audio.src = song.src;
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    songCover.src = song.cover;
    progressBar.value = 0;
    currentTimeLabel.textContent = "0:00";
}

function playSong() {
    audio.play();
    iconPlayPause.textContent = "pause";
    btnPlayPause.setAttribute("title", "Pausar");
}

function pauseSong() {
    audio.pause();
    iconPlayPause.textContent = "play_arrow";
    btnPlayPause.setAttribute("title", "Reproducir");
}

function togglePlay() {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(playlist[currentSongIndex]);
    playSong();
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(playlist[currentSongIndex]);
    playSong();
}

// Convertidor matemático de segundos puros a formato legible mm:ss
function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Inicialización del entorno del reproductor
loadSong(playlist[currentSongIndex]);
audio.volume = volumeSlider.value / 100;

// Requisito Cumplido: Asignación estructural de EventListeners
btnPlayPause.addEventListener("click", togglePlay);
btnNext.addEventListener("click", nextSong);
btnPrev.addEventListener("click", prevSong);

// Actualiza de manera constante la línea temporal a medida que el audio corre
audio.addEventListener("timeupdate", () => {
    if (!audio.duration) return;
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progressPercent;
    currentTimeLabel.textContent = formatTime(audio.currentTime);
});

audio.addEventListener("loadedmetadata", () => {
    totalTimeLabel.textContent = formatTime(audio.duration);
});

progressBar.addEventListener("input", () => {
    const newTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = newTime;
});

volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value / 100;
});

// Avanza automáticamente si la canción concluye por completo
audio.addEventListener("ended", nextSong);

// Manejo dinámico e interactivo de las pestañas
menuLinks.forEach((link, index) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        menuLinks.forEach(item => item.classList.remove("active"));
        link.classList.add("active");
        views.forEach(view => view.classList.remove("active-view"));

        if (index === 0) {
            document.getElementById("view-home").classList.add("active-view");
        } else if (index === 1) {
            document.getElementById("view-search").classList.add("active-view");
        } else if (index === 2) {
            document.getElementById("view-library").classList.add("active-view");
        }
    });
});