const imageEl = getElement("album-cover")
const titleEl = getElement("title");
const artistEl = getElement("artist")
const audioEl = getElement("audio")
const currentTimeEl = getElement("current-time")
const totalTimeEl = getElement("total-time")
const progressBarEl = getElement("progress-bar")
const progressRangeEl = getElement("progress-range")
const prevBtnEl = getElement("prevBtn")
const playBtnEl = document.getElementById('playBtn');
const nextBtnEl = document.getElementById('nextBtn');

let isPlaying = false;
let songIndex = 0;


// Music
const playlist = [
  {
    name: 'song-1',
    displayName: 'Electric Chill Machine',
    artist: 'Unknown Artist 1',
  },
  {
    name: 'song-2',
    displayName: 'Seven Nation Army (Remix)',
    artist: 'Unknown Artist 2',
  },
  {
    name: 'song-3',
    displayName: 'Goodnight, Disco Queen',
    artist: 'Unknown Artist 3',
  },
  {
    name: 'song-4',
    displayName: 'Front Row (Remix)',
    artist: 'Unknown Artist 4',
  },
];

loadSong(playlist[songIndex]);


function getElement(string) {
  return document.getElementById(string)
}

function playSong() {
  isPlaying = true;
  playBtnEl.classList.replace("fa-play", "fa-pause");
  
  audioEl.play();

}

function pauseSong() {
  isPlaying = false;
  playBtnEl.classList.replace('fa-pause', 'fa-play');
  audioEl.pause();
}

function loadSong(song) {
  titleEl.textContent = song.displayName;
  artistEl.textContent = song.artist;
  audioEl.src = `assets/music/${song.name}.mp3`;
  imageEl.src = `assets/img/${song.name}.webp`;

}


// Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = playlist.length - 1;
  }
  loadSong(playlist[songIndex]);
  audioEl.load();

  playSong();
}

// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > playlist.length - 1) {
    songIndex = 0;
  }
  loadSong(playlist[songIndex]);
  audioEl.load();
  playSong();
}

// Update Progress Bar & Time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progressBarEl.style.width = `${progressPercent}%`;
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
      durationSeconds = `${durationSeconds.toString().padStart(2,0)}`;
    
    // Delay switching duration Element to avoid NaN
    if (!isNaN(durationMinutes)) {
      totalTimeEl.textContent = `${durationMinutes}:${durationSeconds}`;

    }

    // Calculate display for currentTime
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    currentSeconds = `${currentSeconds.toString().padStart(2,0)}`;
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = audioEl;
  audioEl.currentTime = (clickX / width) * duration;
}


playBtnEl.addEventListener("click", _ => {
  isPlaying? pauseSong() : playSong();
})
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audioEl.addEventListener('ended', nextSong);
audioEl.addEventListener('timeupdate', updateProgressBar);
progressRangeEl.addEventListener('click', setProgressBar);

