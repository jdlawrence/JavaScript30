// Get elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const allVideos = player.querySelectorAll('.viewer');
const video2 = player.getElementsByClassName('viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreenButton = document.getElementById('full');

console.log(video, video2[0], allVideos);
// Build out functions
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  console.log(icon);
  toggle.textContent = icon;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRange() {
  video[this.name] = this.value;
}

function handleProgress() {
  let percent = video.currentTime / video.duration * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const percent = e.offsetX / progress.offsetWidth * video.duration;
  video.currentTime = percent;
}

function toggleFullScreen() {
  video.webkitRequestFullscreen();
}

// Hook up listeners
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

skipButtons.forEach(element => {
  element.addEventListener('click', skip);
});

ranges.forEach(range => range.addEventListener('click', handleRange));
ranges.forEach(range => range.addEventListener('mousemove', handleRange));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

// Note that the API is still vendor-prefixed in browsers implementing it
document.addEventListener("fullscreenchange", function (event) {

  // The event object doesn't carry information about the fullscreen state of the browser,
  // but it is possible to retrieve it through the fullscreen API
  if (document.fullscreen) {

    // The target of the event is always the document,
    // but it is possible to retrieve the fullscreen element through the API
    document.fullscreenElement;
    console.log('hhhhhhhhhhhhhhhhhhh');
  }

});

// Note that the API is still vendor-prefixed in browsers implementing it
document.addEventListener("fullscreenerror", function (event) {

  // The event object doesn't carry information about the fullscreen state of the browser,
  // but it is possible to retrieve it through the fullscreen API
  console.log('even', event);
});


fullScreenButton.addEventListener('click', toggleFullScreen);