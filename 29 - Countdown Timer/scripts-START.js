const buttons = document.querySelectorAll('.timer__button');
const customTime = document.querySelector('[name="customForm"]');

function buttonClick() {
  startCount(this.dataset.time);
}

function handleCustomTime(e) {
  e.preventDefault();
  const mins = document.querySelector('[name="minutes"]').value;
  startCount(mins * 60);
}

buttons.forEach(button => {
  button.addEventListener('click', buttonClick);
});
customTime.addEventListener('submit', handleCustomTime);

let timeLeft = document.querySelector('.display__time-left');
let timeEnd = document.querySelector('.display__end-time');


let countDown;
function startCount(timeInSeconds) {
  // Remove old timers
  clearInterval(countDown);
  timeLeft.textContent = formatTime(timeInSeconds);

  // Format the future time for the end of the timer
  let endTime = new Date(Date.now() + timeInSeconds * 1000);
  let endHours = padZeros(endTime.getHours());
  let endMinutes = padZeros(endTime.getMinutes()); 
  timeEnd.textContent = `Be back at ${endHours}:${endMinutes}`;

  countDown = setInterval(() => {
    timeInSeconds--;
    timeLeft.textContent = formatTime(timeInSeconds);
    if (timeInSeconds <= 0) {
      clearInterval(countDown);
    }
  }, 1000);
}

function formatTime(timeInSeconds) {
  let mins = padZeros(Math.floor(timeInSeconds / 60));
  let seconds = padZeros(timeInSeconds % 60);
  return `${mins}:${seconds}`;
}

function padZeros(num) {
  num = num.toString();
  while (num.length < 2) {
    num = '0' + num;
  }
  return num;
}