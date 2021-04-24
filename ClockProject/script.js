// VARIABLES

const section = document.getElementById("heading");
const time = document.getElementById("time");
const date = document.getElementById("date");
const greeting = document.querySelector(".greeting");
const greetingText = document.getElementById("greeting_text");
const moreBtn = document.getElementById("btn");
const detailsBtn = document.querySelector(".detailsBtn");
const details = document.querySelector(".details");
const day = document.getElementById("day");
const monthDate = document.getElementById("month_date");
const dayCount = document.getElementById("day_count");
const weekCount = document.getElementById("week_count");
const settings = document.querySelector(".settings");
const icon = document.querySelector(".icon");
const saveBtn = document.getElementById("save_btn");
const hour = document.getElementsByName("hour");
const seconds = document.getElementsByName("seconds");
const settingsDate = document.getElementsByName("date");
const color = document.getElementsByName("color");

// setting the default value in localStorage
let localStorageData = ["24Hour", "show", "hide", "white"];
if (localStorage.getItem("settings") == null) {
  localStorage.setItem("settings", JSON.stringify(localStorageData));
}

// Getting data from NASA API

const request = new Request(
  "https://api.nasa.gov/planetary/apod?api_key=cqcqIdlUedeNCESy07IHTtrabB1OdSUzSY4VuOfU"
);

async function getData() {
  try {
    const jsonData = await fetch(request);
    const jsdata = await jsonData.json();
    if (jsdata.hdurl != undefined) {
      section.style.backgroundImage = `url(${jsdata.hdurl})`;
    } else {
      section.style.backgroundImage = "url('galaxy1.jpg')";
    }
  } catch (error) {
    console.log(error);
  }
}

getData();

// setting the greeting
function setGreeting() {
  let hrs = new Date().getHours();
  if (hrs < 12) {
    greetingText.innerText = "GOOD MORNING";
  } else if (hrs >= 12 && hrs <= 17) {
    greetingText.innerText = "GOOD AFTERNOON";
  } else if (hrs >= 17 && hrs <= 24) {
    greetingText.innerText = "GOOD EVENING";
  }
}
setGreeting();

// setting the day of the year
const dayOfTheYear = () => {
  let now = new Date();
  let start = new Date(now.getFullYear(), 0, 0);
  let diff = now - start;
  let oneDay = 1000 * 60 * 60 * 24;
  let day = Math.floor(diff / oneDay);
  dayCount.innerText = day;
};
dayOfTheYear();

// setting the week of the year
const weekOfTheYear = () => {
  const todaydate = new Date();
  let oneJan = new Date(todaydate.getFullYear(), 0, 1);
  let numberOfDays = Math.floor((todaydate - oneJan) / (24 * 60 * 60 * 1000));

  // adding 1 since to current date and returns value starting from 0
  let weekNumber = Math.ceil((todaydate.getDay() + 1 + numberOfDays) / 7);
  weekCount.innerText = weekNumber;
};
weekOfTheYear();

// setting the day of the week

const setExtraDetails = () => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  day.innerText = days[new Date().getDay()];
};
setExtraDetails();

// setting the day of the month
monthDate.innerText = new Date().getDate();

// setting the time for the inital clock

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

// function for 12 Hour format CLOCK

function formatAMPM(val, hours, minutes, seconds) {
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  let strTime;
  if (val === "show") {
    strTime = hours + ":" + minutes + ":" + seconds + " " + ampm;
  } else {
    strTime = hours + ":" + minutes + " " + ampm;
  }

  return strTime;
}

const arr = JSON.parse(localStorage.getItem("settings"));
const timeVal = arr[0];
const secondsVal = arr[1];
const dateVal = arr[2];
const ColorVal = arr[3];

function markChecked(radios, val) {
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].value == val) {
      radios[i].checked = true; // marking the required radio as checked
    }
  }
}
markChecked(hour, timeVal);
markChecked(seconds, secondsVal);
markChecked(settingsDate, dateVal);
markChecked(color, ColorVal);

// function for getting the time every second
function getTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return {
    hours,
    minutes,
    seconds,
  };
}

let intervalId;
let intervalId3;

const setTime = () => {
  clearInterval(intervalId);
  if (timeVal === "12Hour") {
    intervalId3 = setInterval(() => {
      let { hours, minutes, seconds } = getTime();
      if (secondsVal === "show") {
        time.innerText = formatAMPM(secondsVal, hours, minutes, seconds);
      } else {
        time.innerText = formatAMPM(secondsVal, hours, minutes, seconds);
      }
    }, 1000);
  } else {
    clearInterval(intervalId3);

    intervalId = setInterval(() => {
      let { hours, minutes, seconds } = getTime();
      const d = new Date();
      let hour = addZero(d.getHours());
      let min = addZero(d.getMinutes());
      let sec = addZero(d.getSeconds());
      if (secondsVal === "show") {
        time.innerText = hour + ":" + min + ":" + sec;
      } else {
        time.innerText = hour + ":" + min;
      }
    }, 1000);
  }
};
setTime();

// setting the inital Color
function setInitalColor(colorValue) {
  if (colorValue === "yellow") {
    time.style.color = "#feda15";
    greeting.style.color = "#feda15";
    date.style.color = "#feda15";
  } else if (colorValue === "blue") {
    time.style.color = "#00bec5";
    greeting.style.color = "#00bec5";
    date.style.color = "#00bec5";
  } else {
    time.style.color = "#fff";
    greeting.style.color = "#fff";
    date.style.color = "#fff";
  }
}
setInitalColor(ColorVal);

// setting the initial date to be shown or not
function setInitalDate(dateValue) {
  if (dateValue === "show") {
    const d = new Date();
    const month = d.toLocaleString("default", { month: "long" });
    const year = d.getFullYear();
    const day = d.getDate();
    date.innerText = month + " " + day + ", " + year;
  } else {
    date.innerText = "";
  }
}
setInitalDate(dateVal);

// adding event listener to the more button to show the other details about the date

moreBtn.addEventListener("click", function () {
  if (!details.classList.contains("overlay")) {
    details.classList.add("overlay");
    detailsBtn.classList.add("shift_more_icon");
    moreBtn.innerText = "Less";
  } else {
    details.classList.remove("overlay");
    detailsBtn.classList.remove("shift_more_icon");

    moreBtn.innerText = "More";
  }
});

// adding event listener to the cog ICON

icon.addEventListener("click", function () {
  icon.classList.toggle("rotate");
  settings.classList.toggle("setting_overlay");
  icon.classList.toggle("shift_icon");
  details.classList.remove("overlay");
  moreBtn.innerText = "More";
});


function checkedRadioBoxValue(val) {
  for (let i = 0; i < val.length; i++) {
    if (val[i].checked) {
      return val[i].value;
    }
  }
}

// setting the Time Format of Clock

let intervalId1;
let intervalId2;
let arrValue = JSON.parse(localStorage.getItem("settings"));

const setTimeFormat = (checkedRadioBoxValue) => {
  const timeValue = checkedRadioBoxValue(hour);
  const secondsValue = checkedRadioBoxValue(seconds);
  arrValue[0] = timeValue;
  arrValue[1] = secondsValue;

  if (timeValue === "12Hour") {
    clearInterval(intervalId);
    clearInterval(intervalId2);
    clearInterval(intervalId1);
    clearInterval(intervalId3);
    intervalId1 = setInterval(() => {
      let { hours, minutes, seconds } = getTime();
      if (secondsValue === "show") {
        time.innerText = formatAMPM(secondsValue, hours, minutes, seconds);
      } else {
        time.innerText = formatAMPM(secondsValue, hours, minutes, seconds);
      }
    }, 1000);
  } else {
    clearInterval(intervalId1);
    clearInterval(intervalId);
    clearInterval(intervalId2);
    clearInterval(intervalId3);
    intervalId2 = setInterval(() => {
      const d = new Date();
      let hour = addZero(d.getHours());
      let min = addZero(d.getMinutes());
      let sec = addZero(d.getSeconds());
      if (secondsValue === "show") {
        time.innerText = hour + ":" + min + ":" + sec;
      } else {
        time.innerText = hour + ":" + min;
      }
    }, 1000);
  }
};

// setting the Date to show on the home screen or not

const setDate = (checkedRadioBoxValue) => {
  const dateValue = checkedRadioBoxValue(settingsDate);
  arrValue[2] = dateValue;
  if (dateValue === "show") {
    const d = new Date();
    const month = d.toLocaleString("default", { month: "long" });
    const year = d.getFullYear();
    const day = d.getDate();
    date.innerText = month + " " + day + ", " + year;
  } else {
    date.innerText = "";
  }
};

const setColor = (checkedRadioBoxValue) => {
  const colorValue = checkedRadioBoxValue(color);
  arrValue[3] = colorValue;
  if (colorValue === "yellow") {
    time.style.color = "#feda15";
    greeting.style.color = "#feda15";
    date.style.color = "#feda15";
  } else if (colorValue === "blue") {
    time.style.color = "#00bec5";
    greeting.style.color = "#00bec5";
    date.style.color = "#00bec5";
  } else {
    time.style.color = "#fff";
    greeting.style.color = "#fff";
    date.style.color = "#fff";
  }
};

// adding event listener to the Save button in the setting sidebar

saveBtn.addEventListener("click", function () {
  settings.classList.toggle("setting_overlay");
  icon.classList.toggle("shift_icon");
  if (detailsBtn.classList.contains("shift_more_icon")) {
    detailsBtn.classList.add("shif_more_icon");
  } else {
    detailsBtn.classList.remove("shif_more_icon");
  }
  setDate(checkedRadioBoxValue);
  setTimeFormat(checkedRadioBoxValue);
  setColor(checkedRadioBoxValue);
  localStorage.setItem("settings", JSON.stringify(arrValue));
});
