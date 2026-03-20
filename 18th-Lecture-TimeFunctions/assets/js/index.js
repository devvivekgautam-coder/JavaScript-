/* ─── DATA ───────────────────────────────────────────────────────────────── */
let songs = [
    { id: 1, title: "Lollipop Lagelu", artist: "Pawan Singh", cover: "./assets/images/item-1.jpg", src: "./assets/audio/song1.mp3" },
    { id: 2, title: "Raate Diya Butake", artist: "Pawan Singh", cover: "./assets/images/item-2.jpg", src: "./assets/audio/song2.mp3" },
    { id: 3, title: "Chalkata Jawaniya", artist: "Pawan Singh & Priyanka Singh", cover: "./assets/images/item-3.jpg", src: "./assets/audio/song3.mp3" },
    { id: 4, title: "Kamar Lap Lap", artist: "Samar Singh", cover: "./assets/images/item-4.jpg", src: "./assets/audio/song4.mp3" },
    { id: 5, title: "Aara Hile Chapara", artist: "Samar Singh", cover: "./assets/images/item-5.jpg", src: "./assets/audio/song5.mp3" },
    { id: 6, title: "Saiya Dharesar", artist: "Samar Singh", cover: "./assets/images/item-6.jpg", src: "./assets/audio/song6.mp3" },
    { id: 7, title: "Kular Kurti Me", artist: "Khesari Lal & Priyanka Singh", cover: "./assets/images/item-7.jpg", src: "./assets/audio/song7.mp3" },
    { id: 8, title: "Milte Marad", artist: "Khesari Lal & Priyanka Singh", cover: "./assets/images/item-8.jpg", src: "./assets/audio/song8.mp3" },
    { id: 9, title: "Palag Banaibe", artist: "Khesari Lal & Priyanka Singh", cover: "./assets/images/item-9.jpg", src: "./assets/audio/song9.mp3" },
    { id: 10, title: "Choli Bheej Jata", artist: "Khesari Lal & Priyanka Singh", cover: "./assets/images/item-10.jpg", src: "./assets/audio/song10.mp3" },
    { id: 11, title: "Raja Ji", artist: "Pawan Singh & Shivani Singh", cover: "./assets/images/item-11.jpg", src: "./assets/audio/song11.mp3" },
    { id: 12, title: "Lahanga Lakhanauwa", artist: "Khesari Lal & Antra Singh", cover: "./assets/images/item-12.jpg", src: "./assets/audio/song12.mp3" },
    { id: 13, title: "Bas Kar Pagali", artist: "Khesari Lal & Antra Singh", cover: "./assets/images/item-13.jpg", src: "./assets/audio/song13.mp3" },
    { id: 14, title: "Nach Re Patarki", artist: "Arvind Akela & Shilpi Raj", cover: "./assets/images/item-14.jpg", src: "./assets/audio/song14.mp3" },
    { id: 15, title: "Nadi Ke Biche", artist: "Shilpi Raj", cover: "./assets/images/item-15.jpg", src: "./assets/audio/song15.mp3" },
    { id: 16, title: "Balamji Love You", artist: "Honey Bee", cover: "./assets/images/item-16.jpg", src: "./assets/audio/song16.mp3" },
    { id: 17, title: "Galiya Ke Dimple", artist: "Pawan Singh & Priyanka Singh", cover: "./assets/images/item-17.jpg", src: "./assets/audio/song17.mp3" },
    { id: 18, title: "Jabale Jagal Bani", artist: "Khesari Lal & Priyanka Singh", cover: "./assets/images/item-18.jpg", src: "./assets/audio/song18.mp3" },
    { id: 19, title: "Dilwa Le Gaile", artist: "Shilpi Raj", cover: "./assets/images/item-19.jpg", src: "./assets/audio/song19.mp3" },
    { id: 20, title: "Heroin", artist: "Neelkamal Singh", cover: "./assets/images/item-20.jpg", src: "./assets/audio/song20.mp3" },
];

/* ─── STAR CANVAS ────────────────────────────────────────────────────────── */
(function initStars() {
    const canvas = document.getElementById('starCanvas');
    const ctx = canvas.getContext('2d');
    let stars = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    for (let i = 0; i < 180; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.4 + 0.2,
            a: Math.random(),
            speed: Math.random() * 0.004 + 0.002,
            dir: Math.random() > 0.5 ? 1 : -1,
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(s => {
            s.a += s.speed * s.dir;
            if (s.a > 1 || s.a < 0.1) s.dir *= -1;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(200,210,255,${s.a})`;
            ctx.fill();
        });
        requestAnimationFrame(draw);
    }
    draw();
})();

/* ─── NAVBAR SCROLL ──────────────────────────────────────────────────────── */
window.addEventListener('scroll', () => {
    document.getElementById('mgNavbar').classList.toggle('scrolled', window.scrollY > 30);
});

function toggleMobileMenu() {
    document.getElementById('navMobileMenu').classList.toggle('open');
}

/* ─── PLAYLISTS (localStorage) ───────────────────────────────────────────── */
function getPlaylists() { return JSON.parse(localStorage.getItem("mg_playlists") || "[]"); }
function savePlaylists(pl) { localStorage.setItem("mg_playlists", JSON.stringify(pl)); }

function createPlaylist(name) {
    if (!name.trim()) return;
    const playlists = getPlaylists();
    playlists.push({ id: Date.now(), name: name.trim(), songs: [] });
    savePlaylists(playlists);
    renderSidebar();
    showToast(`🎵 "${name.trim()}" playlist banayi gayi!`);
}
function deletePlaylist(id) {
    savePlaylists(getPlaylists().filter(p => p.id !== id));
    renderSidebar();
}

/* ─── SIDEBAR ────────────────────────────────────────────────────────────── */
function renderSidebar() {
    const pl = getPlaylists();
    const lm = document.querySelector(".listMenu");
    lm.innerHTML = `
        <li onclick="showAllSongs()"><i class="fa-solid fa-house"></i> Home</li>
        <li><i class="fa-solid fa-fire"></i> Trending</li>
        <li><i class="fa-solid fa-music"></i> Library</li>
        <li><i class="fa-solid fa-heart"></i> Favourites</li>
        <li class="sidebar-hr" style="pointer-events:none"></li>
        <li class="sidebar-cat-label" style="pointer-events:none"><i class="fa-solid fa-list-music"></i> &nbsp;PLAYLISTS</li>
        ${pl.map(p => `
            <li class="playlist-item" onclick="showPlaylist(${p.id})">
                <i class="fa-solid fa-circle-play"></i>
                <span style="flex:1">${p.name}</span>
                <button class="pl-del-btn" onclick="event.stopPropagation();deletePlaylist(${p.id})" title="Delete">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </li>`).join("")}
        <li class="create-pl-btn" onclick="openCreatePlaylist()">
            <i class="fa-solid fa-plus"></i> Create Playlist
        </li>`;
}

/* ─── MODAL ──────────────────────────────────────────────────────────────── */
function openCreatePlaylist() { document.getElementById("plModal").classList.add("active"); document.getElementById("plInput").value = ""; document.getElementById("plInput").focus(); }
function closeCreatePlaylist() { document.getElementById("plModal").classList.remove("active"); }
function confirmCreatePlaylist() { createPlaylist(document.getElementById("plInput").value); closeCreatePlaylist(); }

/* ─── TOAST ──────────────────────────────────────────────────────────────── */
function showToast(msg) {
    const t = document.getElementById("mgToast");
    t.textContent = msg;
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 2800);
}

/* ─── RENDER SONGS ───────────────────────────────────────────────────────── */
function renderSongs(list) {
    const grid = document.getElementById("songsGrid");
    grid.innerHTML = "";
    if (!list.length) {
        grid.innerHTML = `<div class="empty-pl" style="grid-column:1/-1">Koi bhi song nahi mila 😢</div>`;
        return;
    }
    list.forEach((song, i) => {
        const globalIdx = songs.indexOf(song);
        const card = document.createElement("div");
        card.className = "song-card";
        card.setAttribute("data-index", globalIdx);
        card.style.animationDelay = `${i * 0.04}s`;
        card.innerHTML = `
            <div class="song-card-img">
                <img src="${song.cover}" alt="${song.title}" loading="lazy">
                <div class="song-card-overlay"><i class="fa-solid fa-play"></i></div>
            </div>
            <h5>${song.title}</h5>
            <p>${song.artist}</p>`;
        card.onclick = () => playSong(globalIdx);
        grid.appendChild(card);
    });
}

function showAllSongs() {
    document.querySelector(".section-title").textContent = "🔥 All Songs";
    renderSongs(songs);
    highlightSong(currentIndex);
}

function showPlaylist(id) {
    const pl = getPlaylists().find(p => p.id === id);
    if (!pl) return;
    document.querySelector(".section-title").textContent = `🎵 ${pl.name}`;
    const list = pl.songs.map(sid => songs.find(s => s.id === sid)).filter(Boolean);
    renderSongs(list);
}

/* ─── FILTER ─────────────────────────────────────────────────────────────── */
function filterSongs(query, btn) {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const filtered = query === "all" ? songs : songs.filter(s => s.artist.toLowerCase().includes(query.toLowerCase()));
    renderSongs(filtered);
    highlightSong(currentIndex);
}

/* ─── LIVE SEARCH ────────────────────────────────────────────────────────── */
function liveSearch(q) {
    if (!q.trim()) { showAllSongs(); return; }
    const res = songs.filter(s =>
        s.title.toLowerCase().includes(q.toLowerCase()) ||
        s.artist.toLowerCase().includes(q.toLowerCase())
    );
    renderSongs(res);
}

/* ─── PLAYER ─────────────────────────────────────────────────────────────── */
let currentIndex = 0;
let isShuffling = false;
let isRepeating = false;

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const progressEl = document.getElementById("progress");
const volumeEl = document.getElementById("volume");
const playerBar = document.getElementById("playerBar");

volumeEl.value = 0.8;
audio.volume = 0.8;

function playSong(i) {
    currentIndex = i;
    const song = songs[i];

    audio.src = song.src;
    audio.play();

    playerBar.classList.add("visible");

    document.getElementById("songCover").src = song.cover;
    document.getElementById("songTitle").textContent = song.title;
    document.getElementById("songArtist").textContent = song.artist;

    const cover = document.getElementById("songCover");
    cover.classList.remove("spinning");
    void cover.offsetWidth;
    cover.classList.add("spinning");

    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    highlightSong(i);
}

playBtn.onclick = () => {
    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        document.getElementById("songCover").classList.add("spinning");
    } else {
        audio.pause();
        playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        document.getElementById("songCover").classList.remove("spinning");
    }
};

audio.ontimeupdate = () => {
    if (!isNaN(audio.duration)) {
        progressEl.value = (audio.currentTime / audio.duration) * 100;
        document.getElementById("currentTime").textContent = fmt(audio.currentTime);
        document.getElementById("duration").textContent = fmt(audio.duration);
    }
};
progressEl.oninput = () => { audio.currentTime = (progressEl.value * audio.duration) / 100; };

volumeEl.oninput = () => {
    audio.volume = volumeEl.value;
    const icon = document.getElementById("volIcon");
    icon.className = audio.volume == 0 ? "fa-solid fa-volume-xmark"
        : audio.volume < 0.5 ? "fa-solid fa-volume-low"
            : "fa-solid fa-volume-high";
};

document.getElementById("prev").onclick = () => {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    playSong(currentIndex);
};
document.getElementById("next").onclick = () => nextSong();

document.getElementById("shuffle").onclick = function () {
    isShuffling = !isShuffling;
    this.classList.toggle("active", isShuffling);
    showToast(isShuffling ? "🔀 Shuffle ON" : "🔀 Shuffle OFF");
};
document.getElementById("repeat").onclick = function () {
    isRepeating = !isRepeating;
    this.classList.toggle("active", isRepeating);
    showToast(isRepeating ? "🔁 Repeat ON" : "🔁 Repeat OFF");
};

audio.onended = () => {
    if (isRepeating) { audio.play(); return; }
    nextSong();
};

function nextSong() {
    if (isShuffling) {
        let r = Math.floor(Math.random() * songs.length);
        while (r === currentIndex && songs.length > 1) r = Math.floor(Math.random() * songs.length);
        playSong(r);
    } else {
        playSong((currentIndex + 1) % songs.length);
    }
}

function shufflePlay() {
    isShuffling = true;
    const btn = document.getElementById("shuffle");
    if (btn) btn.classList.add("active");
    playSong(Math.floor(Math.random() * songs.length));
    document.getElementById('mainGrid').scrollIntoView({ behavior: 'smooth' });
}

function highlightSong(idx) {
    document.querySelectorAll(".song-card").forEach(el => {
        el.classList.toggle("activeSong", parseInt(el.dataset.index) === idx);
    });
}

function fmt(t) {
    const m = Math.floor(t / 60);
    const s = String(Math.floor(t % 60)).padStart(2, "0");
    return `${m}:${s}`;
}

/* Space key shortcut */
document.addEventListener("keydown", e => {
    if (e.code === "Space" && e.target.tagName !== "INPUT") {
        e.preventDefault();
        playBtn.click();
    }
});

/* ─── INIT ───────────────────────────────────────────────────────────────── */
window.onload = () => {
    renderSidebar();
    showAllSongs();
};