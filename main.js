/*hämtade alla html klass */
let now_playing = document.querySelector(".now-playing");
let track_img = document.querySelector(".track-img");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let slide_bar = document.querySelector(".slide-bar");
let current_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// audio element
let curr_track = document.createElement('audio');

// spellistan härrr
/*https://freemusicarchive.org/home länken där musiken är tagen ifrån */
let track_list = [
  {
    name: "Everything Floats Down Here",
    artist: "Vincent Augustus",
    image: "https://freemusicarchive.org/image?file=track_image%2FKBuqQjMcMY40LSvvaPX1wrTOzRzpI4kAkBAcjNcY.png&width=290&height=290&type=track",
    path: "https://freemusicarchive.org/track/everything-floats-down-here/download"
  },
  {
    name: "Worship",
    artist: "Young Kartz",
    image: "https://freemusicarchive.org/image?file=images%2Fartists%2FYung_Kartz_-_20190222234717235.jpg&width=290&height=290&type=image",
    path: "https://freemusicarchive.org/track/worship/download"
  },
  {
    name: "Shaolin Dub",
    artist: "Bad-Terrain",
    image: "https://freemusicarchive.org/image?file=image%2FdCngnRd4tUsiid9fdteQRsebVomU5y51LB5pk8ZG.jpeg&width=290&height=290&type=image",
    path: "https://freemusicarchive.org/track/bad-terrain/download",
  },
  {
    name: "This  guy is Falling",
    artist: "Sebon",
    image: "https://freemusicarchive.org/image?file=images%2Fartists%2FSebon_-_2017041494204874.jpg&width=290&height=290&type=image",
    path: "https://freemusicarchive.org/track/Sebon_-_Featuring_The_Advocates_-_05_This_Guy_Is_Falling/download",
  },
  {
    name: "Mass Effects",
    artist: "Vincent Augustus",
    image: "https://freemusicarchive.org/image?file=track_image%2FOgmICvHW5E2ObWToJOsigAoelwujCchSS1T3VoIb.png&width=290&height=290&type=track",
    path: "https://freemusicarchive.org/track/mass-effects/download",
  },
  {
    name: "What i say",
    artist: "Vincent Augustus",
    image: "https://freemusicarchive.org/image?file=image%2FoluVUC73j20OxlHs5D1LxgYKq4FzJFp37ijViTut.png&width=290&height=290&type=image",
    path: "https://freemusicarchive.org/track/what-i-say/download",
  },
];




function loadTrack(track_index) {
  /* rensa senaste spel tiden */
  clearInterval(updateTimer);
  resetValues();
/* ladda ny musik */
  curr_track.src = track_list[track_index].path;
  curr_track.load();
/*updatera info på musiken såsom namn, bild och artist */
  track_img.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = "Spela " + (track_index + 1) + " av " + track_list.length;
/*uppdatera tiden på spel baren ja den som man kan spola fram musiken med */
  updateTimer = setInterval(barUpdate, 1000);
  /*byta till nästa musiken när den senaste har spelat färdigt */
  curr_track.addEventListener("ended", nextTrack);

}
/*reseta deras värde till default */
function resetValues() {
  current_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  slide_bar.value = 0;
}

// första musiken här
loadTrack(track_index);

function playpauseTrack() {
/* byta från spela och pausa beroende på situationer */
  if (!isPlaying) playTrack();
  else pauseTrack();
}


function playTrack() {
  /*spela musiken */
  curr_track.play();
  isPlaying = true;
  /* byta icon till pause*/
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  /*pausa musiken */
  curr_track.pause();
  isPlaying = false;
  /*byta icon till play*/
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

/*går till nästa musik i listan */
function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

/* det ska kunna går tillbaka till den sista musiken i spellistan */
function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}
/*får slide baren att matcha med musik som spelas upp.  */
function barTo() {
  barto = curr_track.duration * (slide_bar.value / 100);
  curr_track.currentTime = barto;
}


function barUpdate() {
  let barPosition = 0;

  if (!isNaN(curr_track.duration)) {
    barPosition = curr_track.currentTime * (100 / curr_track.duration);
    slide_bar.value = barPosition;

    /* räkna tiden som är kvar i baren*/
    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
/* ger dem nollor i tiden*/
    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
/* visa dem uppdaterade tiden */
    current_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}


