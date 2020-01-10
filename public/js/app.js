console.log('Client side javascript file is loaded!');

const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');

const message1 = document.querySelector('#location');
const message2 = document.querySelector('#forecast');


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    message1.textContent = "loading...";
    message2.textContent = "";
    fetch(`http://localhost:3000/weather?address=${searchElement.value}`).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                message1.textContent = "";
                message2.textContent = data.error;
            } else {
                message1.textContent = data.location;
                message2.textContent = `It is currently ${data.forecast.summary} The current temparature is ${data.forecast.currentTemperature} and there is a ${data.forecast.currentPrecipProbability}% chance of rain.`;
            }
        });
    }).catch((err) => {

    });

});