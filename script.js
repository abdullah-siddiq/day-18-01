function search() {
    const city = document.getElementById('city').value;
    const country = document.getElementById('country').value;

    const request = new XMLHttpRequest();
    const apiKey = "a9cfdb29a716e26d71aebb273da499d6";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${apiKey}`;

    request.open('GET', url, true);
    request.send();

    request.onload = function() {
        if (request.readyState === 4) {
            if (request.status === 200) {
                const data = JSON.parse(this.response);
                const temp = (data.main.temp - 273.15).toFixed(1);
                document.querySelector('#weather').innerHTML = `${data.name},${data.sys.country} Temperature ${temp}&deg;, wind ${data.wind.speed} m/s, pressure ${data.main.pressure} hpa`;
                console.log(city, country);
            } else {
                handleError(request.status, request.statusText);
            }
        }
    };

    request.onerror = function() {
        handleError("connection failed", "Check your internet connection.");
    };

    function handleError(status, message) {
        alert(`Status: ${status} Message: ${message}`);
        console.log(`Status: ${status} Message: ${message}`);
    }
}
