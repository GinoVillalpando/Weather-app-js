window.addEventListener('load', () => {
    let longitude;
    let latitude;
    let tempratureDescription = document.querySelector(".temperature-description");
    let tempratureDegree = document.querySelector(".degree");
    let locationTimezone = document.querySelector(".location-timezone");

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/"
            const api = `${proxy}https://api.darksky.net/forecast/7c2deefb0f2174d4bc5fc7ed69f95e5e/${latitude},${longitude}`;

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data)
                const { temperature, summary } = data.currently;

                //Set DOM elements from the API
                tempratureDegree.textContent = temperature;
            });

        });

    } else {
        h1.textContent = "Your browser may not support this feature."
    }
});