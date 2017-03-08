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
  const plus = document.getElementsByClassName("plus");
  const minus = document.getElementsByClassName("minus");

  //add events
  btnStart[0].addEventListener("click", startTime);
  btnStop[0].addEventListener("click", stopTime);
  btnReset[0].addEventListener("click", resetTime);
  plus[0].addEventListener("mousedown", addTime);
  minus[0].addEventListener("mousedown", subtractTime);
  plus[1].addEventListener("mousedown", addTime);
  minus[1].addEventListener("mousedown", subtractTime);
  
  const buttons = [plus[0], minus[0], plus[1], minus[1]];
  const events = ["mouseup", "mousedown"];
  buttons.forEach(function(b) {
    events.forEach(function(e) {
      b.addEventListener(e, holdThis);
    });
  });

  function addTime(elem) {
    let x = (this.innerText === "+" ? this : elem);
    switch(x.previousElementSibling.id) {
      case "pomodoro":
        pom.innerText++;
        pomBase = pom.innerText * 60;
        break;
      case "break":
        brk.innerText++;
        breakBase = brk.innerText * 60;
        break;
    }
  }
    
  function subtractTime(elem) {
    let x = (this.innerText === "-" ? this : elem);
    switch(x.nextElementSibling.id) {
      case "pomodoro":
        if(pom.innerText > 1) {
          pom.innerText--;
          pomBase = pom.innerText * 60;
        }
        break;
      case "break":
        if(brk.innerText > 1) {
          brk.innerText--;
          breakBase = brk.innerText * 60;
        }
        break;
    }
  }

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
      : "00");

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
          if(pom.innerText.length === 1) {
            spanMin[0].innerText = `0${pomMin}`;
          }
          else {  
            spanMin[0].innerText = pomMin;
          }
          spanSec[0].innerText = `0${pomSec}`;
          break;
        case "break":
          breakNow = breakBase;
          breakSec = breakNow % 60;
          breakMin = Math.round((breakNow/60) - (breakSec/60));
          if(brk.innerText.length === 1) {
            spanMin[0].innerText = `0${breakMin}`;
          }
          else {
            spanMin[0].innerText = breakMin;
          }
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
      : "00");

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
  
  let intervalID = null;
  function holdThis(e) {
    if(e.type === "mousedown") {
      (this.innerText ==="+" ? holdAdd(this) : holdSubtract(this));
    }
    if(e.type === "mouseup") {
      letGo();
    }
    
    function holdAdd(elem) {
      intervalID = setInterval(function() {
        return addTime(elem);
        }, 300);
    }
    
    function holdSubtract(elem) {
      intervalID = setInterval(function() {
        return subtractTime(elem);
        }, 300);
    }

    function letGo() {
      clearInterval(intervalID);
      intervalID = null;
    }
  }
  
}
