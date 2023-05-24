let date = new Date();
const month = date.toLocaleString("de-DE", { month: "long" });
const dayofMonth = date.getDate();
const year = date.getFullYear();

let hour = date.getHours().toString();
let minute = date.getMinutes().toString();
let second = date.getSeconds().toString();
let hourFactor = 30;
let minuteFactor = 6;
let secondFactor = 6;

let hourDegree = hour * hourFactor + 0.5 * minute;
let minuteDegree = minute * minuteFactor;
let secondDegree = second * secondFactor;

let hourCounter = +hour; //max 23
let minuteCounter = +minute; // max 59
let secondCounter = +second; // max 59

let hourHand = document.querySelector(".hour-hand");
let minuteHand = document.querySelector(".minute-hand");
let secondHand = document.querySelector(".second-hand");
let fullDate = document.querySelector(".full-date");

let digitalHour = document.querySelector(".digital-hours");
digitalHour.textContent = hour.padStart(2, "0");

let digitalMinute = document.querySelector(".digital-minutes");
digitalMinute.textContent = minute.padStart(2, "0");

hourHand.style.transform = `rotate(${hourDegree}deg`;
minuteHand.style.transform = `rotate(${minuteDegree}deg`;
secondHand.style.transform = `rotate(${secondDegree}deg`;

fullDate.textContent = `${dayofMonth}. ${month} ${year}`;

setInterval(() => {
    secondDegree += 6;
    secondHand.style.transform = `rotate(${secondDegree}deg)`;
    secondCounter++;

    digitalMinute.textContent = minuteCounter.toString().padStart(2, "0");
    digitalHour.textContent = hourCounter.toString().padStart(2, "0");

    if (secondCounter == 60) {
        secondCounter = 0;
        minuteCounter += 1;

        secondDegree = 0;
        minuteDegree += 6;
        hourDegree += 0.5;

        minuteHand.style.transform = `rotate(${minuteDegree}deg)`;
        hourHand.style.transform = `rotate(${hourDegree}deg)`;

        if (minuteCounter == 60) {
            minuteCounter = 0;
            minuteDegree = 0;
            hourCounter += 1;

            if (hourCounter == 12) {
                hourDegree = 0;
            }

            if (hourCounter == 24) {
                hourDegree = 0;
                hourCounter = 0;
            }
        }
    }
}, 1000);
