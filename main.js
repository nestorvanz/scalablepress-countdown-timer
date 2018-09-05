class Countdown {
  constructor(limitDate) {
    this.limit = limitDate;
    this.interval = 1000; // milliseconds
    this.ticker = null;
    this.remainingSeconds = null;
    this.remainingMinutes = null;
    this.remainingHours = null;
    this.remainingDays = null;
  }

  refesh(next) {
    let currentDate = new Date();
    let remainingTime = this.limit.getTime() - currentDate.getTime();
    this.remainingSeconds = Math.floor(remainingTime / 1000) % 60;
    this.remainingMinutes = Math.floor(remainingTime / 1000 / 60) % 60;
    this.remainingHours = Math.floor(remainingTime / 1000 / 60 / 60) % 24;
    this.remainingDays = Math.floor(remainingTime / 1000 / 60 / 60 / 24);
    if (next) {
      next(this);
    }
  }

  start(next) {
    this.refesh(next);
    this.ticker = setInterval(() => this.refesh(next), this.interval);
  }

  stop() {
    clearInterval(this.ticker);
  }
}

(() => {
  var setDateButton = document.getElementById('set-date');
  var dateInput = document.getElementById('date');
  var daysDiv = document.getElementById('days');
  var hoursDiv = document.getElementById('hours');
  var minutesDiv = document.getElementById('minutes');
  var secondsDiv = document.getElementById('seconds');
  var countdown = null;
  

  setDateButton.onclick = function() {
    if (dateInput.value) {
      let values = dateInput.value.split('-');
      if (countdown) countdown.stop();
      countdown = new Countdown(new Date(values[0], values[1] -1, values[2]))
      countdown.start(updateInputs);
    }
  }

  function updateInputs(countdown) {
    daysDiv.innerText = countdown.remainingDays;
    hoursDiv.innerText = countdown.remainingHours;
    minutesDiv.innerText = countdown.remainingMinutes;
    secondsDiv.innerText = countdown.remainingSeconds;
  }
})();