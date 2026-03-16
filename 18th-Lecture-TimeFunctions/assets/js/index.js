let songs = [
    {
        id: 1,
        title: "Lollipop Lagelu",
        artist: "Pawan Singh",
        cover: "./assets/images/item-1.jpg",
        src: "./assets/audio/song1.mp3"
    },
    {
        id: 2,
        title: "Raate Diya Butake",
        artist: "Pawan Singh",
        cover: "./assets/images/item-2.jpg",
        src: "./assets/audio/song2.mp3"
    },
    {
        id: 3,
        title: "Chalkata Jawaniya",
        artist: "Pawan Singh & Priyanka Singh",
        cover: "./assets/images/item-3.jpg",
        src: "./assets/audio/song3.mp3"
    },
    {
        id: 4,
        title: "Kamar Lap Lap",
        artist: "Samar Singh",
        cover: "./assets/images/item-4.jpg",
        src: "./assets/audio/song4.mp3"
    },
    {
        id: 5,
        title: "Aara Hile Chapara",
        artist: "Samar Singh",
        cover: "./assets/images/item-5.jpg",
        src: "./assets/audio/song5.mp3"
    },
    {
        id: 6,
        title: "Saiya Dharesar",
        artist: "Samar Singh",
        cover: "./assets/images/item-6.jpg",
        src: "./assets/audio/song6.mp3"
    },
    {
        id: 7,
        title: "Kular Kurti Me",
        artist: "Khesari Lal & Priyanka Singh",
        cover: "./assets/images/item-7.jpg",
        src: "./assets/audio/song7.mp3"
    },
    {
        id: 8,
        title: "Milte Marad",
        artist: "Khesari Lal & Priyanka Singh",
        cover: "./assets/images/item-8.jpg",
        src: "./assets/audio/song8.mp3"
    },
    {
        id: 9,
        title: "Palag Banaibe",
        artist: "Khesari Lal & Priyanka Singh",
        cover: "./assets/images/item-9.jpg",
        src: "./assets/audio/song9.mp3"
    },
    {
        id: 10,
        title: "Choli Bheej Jata",
        artist: "Khesari Lal & Priyanka Singh",
        cover: "./assets/images/item-10.jpg",
        src: "./assets/audio/song10.mp3"
    },
    {
        id: 11,
        title: "Raja Ji",
        artist: "Pawan Singh & Shivani Singh",
        cover: "./assets/images/item-11.jpg",
        src: "./assets/audio/song11.mp3"
    },
    {
        id: 12,
        title: "Lahanga Lakhanauwa",
        artist: "Khesari Lal & Antra Singh",
        cover: "./assets/images/item-12.jpg",
        src: "./assets/audio/song12.mp3"
    },
    {
        id: 13,
        title: "Bas Kar Pagali",
        artist: "Khesari Lal & Antra Singh",
        cover: "./assets/images/item-13.jpg",
        src: "./assets/audio/song13.mp3"
    },
    {
        id: 14,
        title: "Nach Re Patarki",
        artist: "Arvind Akela & Shilpi Raj",
        cover: "./assets/images/item-14.jpg",
        src: "./assets/audio/song14.mp3"
    },
    {
        id: 15,
        title: "Nadi Ke Biche",
        artist: "Shilpi Raj",
        cover: "./assets/images/item-15.jpg",
        src: "./assets/audio/song15.mp3"
    },
    {
        id: 16,
        title: "Balamji Love You",
        artist: "Honey Bee",
        cover: "./assets/images/item-16.jpg",
        src: "./assets/audio/song16.mp3"
    },
    {
        id: 17,
        title: "Galiya Ke Dimple",
        artist: "Pawan Singh & Priyanka Singh",
        cover: "./assets/images/item-17.jpg",
        src: "./assets/audio/song17.mp3"
    },
    {
        id: 18,
        title: "Jabale Jagal Bani",
        artist: "Khesari Lal & Priyanka Singh",
        cover: "./assets/images/item-18.jpg",
        src: "./assets/audio/song18.mp3"
    },
    {
        id: 19,
        title: "Dilwa Le Gaile",
        artist: "Shilpi Raj",
        cover: "./assets/images/item-19.jpg",
        src: "./assets/audio/song19.mp3"
    },
    {
        id: 20,
        title: "Heroin",
        artist: "Neelkamal Singh",
        cover: "./assets/images/item-20.jpg",
        src: "./assets/audio/song20.mp3"
    }
];

let audio = document.getElementById("audio");

function loadSongs() {
    let mainContainer = document.getElementById("item");

    mainContainer.innerHTML = `
        <aside class="col-lg-2 sidebar text-center">
            <ul class="listMenu">
                <li><i class="fa-solid fa-house"></i> Home</li>
                <li><i class="fa-solid fa-fire"></i> Trending</li>
                <li><i class="fa-solid fa-music"></i> Library</li>
                <li><i class="fa-solid fa-heart"></i> Favorites</li>
                <li><i class="fa-solid fa-list"></i> Playlists</li>
                <li><i class="fa-solid fa-plus"></i> Create</li>
            </ul>
        </aside>
        
        <div class="col-lg-10">
            <div class="row pt-3" id="songsGrid">
                </div>
        </div>
    `;

    let songsGrid = document.getElementById("songsGrid");

    songs.forEach((song, i) => {
        songsGrid.innerHTML += `
            <div class="col-xl-2 col-lg-3 col-md-6 col-sm-12 mb-4">
                <div class="songInfo" onclick="playSong(${i})" style="cursor: pointer;">
                    <div class="songImage">
                        <img src="${song.cover}" alt="${song.title}" class="img-fluid">
                    </div>
                    <h5>${song.title}</h5>
                    <p>${song.artist}</p>
                </div>
            </div>`;
    });
}

function playSong(i) {
    audio.src = songs[i].src;
    audio.play();
}

window.onload = loadSongs;

let songAudio = document.getElementById("audio");
let playBtn = document.getElementById("play");
let progress = document.getElementById("progress");
let volume = document.getElementById("volume");

playBtn.onclick = () => {
    if (songAudio.paused) {
        songAudio.play();
        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }
    else {
        songAudio.pause();
        playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
}

songAudio.ontimeupdate = () => {
    progress.value = (songAudio.currentTime / songAudio.duration) * 100;
}

progress.oninput = () => {
    songAudio.currentTime = (progress.value * songAudio.duration) / 100;
}

volume.oninput = () => {
    songAudio.volume = volume.value;
}