/**
 * countdown.js
 *
 * Handles updating the DOM with the count down. Written in plain ol' JS.
 */

(function () {
  var IRON_RING_CEREMONY_UNIX_TIME = 1423328400;
  var NUM_SECONDS_IN_MINUTE = 60;
  var NUM_MINUTES_IN_HOUR = 60;
  var NUM_HOURS_IN_DAY = 24;
  var NUM_SECONDS_IN_HOUR = NUM_SECONDS_IN_MINUTE * NUM_MINUTES_IN_HOUR;
  var NUM_SECONDS_IN_DAY =
    NUM_SECONDS_IN_MINUTE * NUM_MINUTES_IN_HOUR * NUM_HOURS_IN_DAY;

  /**
   * NOTE: I realize that overall this is a really shitty way of handling time.
   * I just did it because I wanted to play around with it a little bit and
   * the IRC is about a month away so we shouldn't run into DST issues or
   * anything.
   */
  function humanizeDuration(/*int*/duration) /*string*/ {
    var numDays = Math.floor(duration / NUM_SECONDS_IN_DAY);
    duration -= numDays * NUM_SECONDS_IN_DAY;

    var numHours =
      Math.floor(duration / NUM_SECONDS_IN_HOUR) % NUM_HOURS_IN_DAY;
    duration -= numHours * NUM_SECONDS_IN_HOUR;

    var numMinutes =
      Math.floor(duration / NUM_SECONDS_IN_MINUTE) % NUM_MINUTES_IN_HOUR;
    duration -= numMinutes * NUM_SECONDS_IN_MINUTE;

    var numSeconds = duration % NUM_SECONDS_IN_MINUTE;

    return numDays + ' days, ' +
      numHours + ' hours, ' +
      numMinutes + ' minutes, ' +
      numSeconds + ' seconds';
  }

  function setCountdownString(/*string*/str) {
    var countdownDiv = document.getElementById('countdown');
    countdownDiv.innerHTML = str;
  }

  function updateCountdown() {
    var currentTimestamp = Math.round((new Date()).getTime() / 1000);

    // In case some loser is viewing this after IRC
    if (IRON_RING_CEREMONY_UNIX_TIME < currentTimestamp) {
      setCountdownString('The Iron Ring Ceremony has passed');
      return;
    }

    var differenceInSeconds = IRON_RING_CEREMONY_UNIX_TIME - currentTimestamp;
    var humanizedString = humanizeDuration(differenceInSeconds);
    setCountdownString(humanizedString);

    setTimeout(
      updateCountdown,
      1000
    );
  }

  document.addEventListener('DOMContentLoaded', function() {
    updateCountdown();
  });
})();
