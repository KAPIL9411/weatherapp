const API_KEY = 'c4b469446da64a62a7455412241903';
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const locationIcon = document.getElementById('locationIcon');

// referencing output fields
const cityName = document.getElementById('city-name');
const countryName = document.getElementById('countryName');
const localTime = document.getElementById('loc-time');
const temp = document.getElementById('temp');
const sup = document.getElementById('sup');
const outputCard = document.getElementById('outputCard');

// Function to get weather data from API
async function getWeatherData(city) {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=yes`);
    const data = await response.json();
    return data;
}

// Display weather data
function displayWeather(data) {
    cityName.innerText = `${data.location.name}, ${data.location.region}`;
    countryName.innerText = `${data.location.country}`;
    temp.innerText = `${data.current.temp_c}`;
    sup.innerText = '°C';
    localTime.innerText = `${data.location.localtime}`;
    outputCard.style.visibility = 'visible';
}

// Search city weather on button click
searchBtn.addEventListener('click', async () => {
    const input = cityInput.value;
    const result = await getWeatherData(input);
    displayWeather(result);
});

// Get live location weather on location icon click
locationIcon.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const result = await getWeatherData(`${lat},${lon}`);
            displayWeather(result);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});
