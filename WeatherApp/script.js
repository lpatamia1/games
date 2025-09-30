// Get references to all the HTML elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherDisplay = document.querySelector('.weather-display');
const cityNameEl = document.getElementById('city-name');
const weatherIconEl = document.getElementById('weather-icon');
const temperatureEl = document.getElementById('temperature');
const descriptionEl = document.getElementById('weather-description');

// Your API key is now included
const apiKey = 'dd548f5c56905cbe56e92f932b4e5a44';

// Function to fetch and display weather data
async function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert(error.message);
    }
}

// Function to update the UI with weather data
function displayWeather(data) {
    // Extract the needed information from the API data
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp } = data.main;

    // Update the HTML elements with the new data
    cityNameEl.textContent = name;
    temperatureEl.textContent = `${Math.round(temp)}°C`;
    descriptionEl.textContent = description;
    weatherIconEl.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    // Make the weather display visible
    weatherDisplay.style.display = 'block';
}

// Event listener for the search button
searchBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        getWeather(city);
    }
});

// Event listener to allow searching by pressing "Enter"
cityInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value;
        if (city) {
            getWeather(city);
        }
    }
});