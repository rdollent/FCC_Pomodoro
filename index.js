window.onload = runThis;

function runThis() {
  //get time values from page
  const pom = document.getElementById("pomodoro");
  const brk = document.getElementById("break");
  let pomBase = pom.innerText * 60;
  let breakBase = brk.innerText * 60;

  //status
  let status = "pomodoro";  //or "break" when breaktime
    
  //get elements from page
  const spanMin = document.getElementsByClassName("min");
  const spanSec = document.getElementsByClassName("sec");
  const btnStart = document.getElementsByClassName("start");
  const btnStop = document.getElementsByClassName("stop");
  const btnReset = document.getElementsByClassName("reset");

  //add events
  btnStart[0].addEventListener("click", startTime);
  btnStop[0].addEventListener("click", stopTime);
  btnReset[0].addEventListener("click", resetTime);

  //pomodoro time
  let pomNow = pomBase + 1;  //+1 to display beginning time
  let pomSec = 0;
  let pomMin = 0;

  //break time
  let breakNow = breakBase + 1;
  let breakSec = 0;
  let breakMin = 0;

  
  let flag = null;
  let counter = 0;  //detect whether setInterval is running;
  function startTime() {
    if(counter === 0) {
      switch(status) {
        case "pomodoro": 
          flag = setInterval(pomDown, 1000);
          break;
        case "break":
          flag = setInterval(breakDown, 1000);
          break;
      }
      counter = 1;
    }
  }
  
  function pomDown() {
    pomNow = pomNow - 1;
    pomSec = pomNow % 60; //remainder as seconds
    pomMin = Math.round((pomNow/60) - (pomSec/60)); //minutes
    spanMin[0].innerText =
      (pomMin > 0 ? 
        (pomMin >= 10 ? pomMin : `0${pomMin}`)
      : "00:");

    spanSec[0].innerText =
      (pomSec > 0 ? 
        (pomSec >= 10 ? pomSec : `0${pomSec}`)
      : "00");
    
    if(pomNow === 0) {
      stopTime();
      status = "break";
      breakNow = breakBase + 1;
      startTime();
    }
  }
     
  function stopTime() {
    clearInterval(flag);
    counter = 0;
  }

  function resetTime() {
    if(counter === 0) {
      switch (status) {
        case "pomodoro":      
          pomNow = pomBase;
          pomSec = pomNow % 60;
          pomMin = Math.round((pomNow/60) - (pomSec/60));
          spanMin[0].innerText = pomMin;
          spanSec[0].innerText = `0${pomSec}`;
          break;
        case "break":
          breakNow = breakBase;
          breakSec = breakNow % 60;
          breakMin = Math.round((breakNow/60) - (breakSec/60));
          spanMin[0].innerText = breakMin;
          spanSec[0].innerText = `0${breakSec}`;  
          break;
      }
    }
  }

  function breakDown() {
    breakNow = breakNow - 1;
    breakSec = breakNow % 60; //remainder as seconds
    breakMin = Math.round((breakNow/60) - (breakSec/60)); //minutes

    spanMin[0].innerText =
      (breakMin > 0 ? 
        (breakMin >= 10 ? breakMin : `0${breakMin}`)
      : "00:");

    spanSec[0].innerText =
      (breakSec > 0 ? 
        (breakSec >= 10 ? breakSec : `0${breakSec}`)
      : "00");
      
    if(breakNow === 0) {
      stopTime();
      status = "pomodoro";
      pomNow = pomBase + 1;
      startTime();
    }
  }
}




