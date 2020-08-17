const song = document.querySelector(".song");
const play = document.querySelector(".play");
const replay = document.querySelector(".replay");
const video = document.querySelector(".vid-container video");
const sounds = document.querySelectorAll(".sound-picker button");
const timeDisplay = document.querySelector(".time-display");
const timeSelect = document.querySelectorAll(".time-select button");

let fakeDuration = 600;

timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}0`;

sounds.forEach(sound => {
  sound.addEventListener("click", function() {
    song.src = this.getAttribute("data-sound");
    video.src = this.getAttribute("data-video");
    checkPlaying(song);
  });
});

play.addEventListener("click", function() {
  checkPlaying(song);
});

replay.addEventListener("click", function() {restartSong(song);});

const restartSong = song =>{
    let currentTime = song.currentTime;
    song.currentTime = 0;
    console.log("ciao");
}

timeSelect.forEach(option => {
  option.addEventListener("click", function() {
    fakeDuration = this.getAttribute("data-time");
    timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}0`;
  });
});

const checkPlaying = song => {
  if (song.paused) {
    song.play();
    video.play();
    document.querySelector('.play').innerHTML = "pause &#10074&#10074";
  } 
  else {
    song.pause();
    video.pause();
    document.querySelector('.play').innerHTML = "play &#9654";
  }
};

song.ontimeupdate = function() {
  let currentTime = song.currentTime;
  let elapsed = fakeDuration - currentTime;
  let seconds = Math.floor(elapsed % 60);
  let minutes = Math.floor(elapsed / 60);
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  timeDisplay.textContent = `${minutes}:${seconds}`;
  

  if (currentTime >= fakeDuration) {
    song.pause();
    song.currentTime = 0;;
    video.pause();
  }
};