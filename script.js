window.addEventListener('load', () => {

    //declare the variables that will be using geolocation
    let longitude;
    let latitude;

    //declare variables that will be manipulating the DOM by class querySelectors
    const tempratureDescription = document.querySelector(".temperature-description");
    const tempratureDegree = document.querySelector(".degree");
    const locationTimezone = document.querySelector(".location-timezone");

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
                const { temperature, summary, icon } = data.currently;
                const { timezone } = data;

                //Set DOM elements from the API
                tempratureDegree.textContent = temperature;
                tempratureDescription.textContent = summary;
                locationTimezone.textContent = timezone.replace("America/", "");

                //set Icon
                setIcons(icon, document.querySelector(".icon"));
            });

        });

        //function that takes care of replacing icon with currently data and replaces the - with _ and use toUpperCase method to match Skycons library naming conventions
        function setIcons(icon, iconId){
            const skycons = new Skycons({color: "white"});
            const currentIcon = icon.replace(/-/g, "_").toUpperCase();

            //starts playing the skycon and sets the current icon replaced by the currently data 
            skycons.play();
            return skycons.set(iconId, Skycons[currentIcon]);
        }

    } else {
        h1.textContent = "Your browser may not support this feature."
    }
});