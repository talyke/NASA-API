const weatherDisplay = document.querySelector('.weather')
const weatherForm = document.querySelector('#weather-form')
const marsData = document.querySelector('#mars-data')

// Fetch weather data from API
const fetchWeather = async (mars) => {
    const url = `/api?q=${mars}`

    const res = await fetch(url)
    const data = await res.json()


    if (data.cod === 401) {
        alert('Invalid API Key')
        return
    }

    const displayData = {
        mars: data.name,
        temp: kelvinToFahrenheit(data.main.temp),
    }

    addWeatherToDOM(displayData)
}

// Add display data to DOM
const addWeatherToDOM = (data) => {
    weatherDisplay.innerHTML = `
    <h1>Weather in ${data.city}</h1>
    <h2>${data.temp} &deg;F</h2>
    `
    marsData.value = ''
}

// Convert Kelvin to Fahrenheit
const kelvinToFahrenheit = (temp) => {
    return Math.ceil(((temp - 273.15) * 9) / 5 + 32)
}

// Event listener for form submission
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    if (marsData.value === '') {
        alert('Please enter valid datapoint')
    } else {
        fetchWeather(marsData.value)
    }
})

// Initial fetch
fetchWeather('Somewhere On Mars')