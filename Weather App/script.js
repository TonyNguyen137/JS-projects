class App {
    #API_KEY = "42d396eed00d82e90eeeae05044b23d5";
    constructor() {
        this.inputEl = document.querySelector("input");
        this.searchBtn = document.querySelector(".search-btn");
        this.cityEl = document.querySelector(".city");
        this.cityValue;
        this.countryCodeValue;
        this.weatherDescriptionEl = document.querySelector(".weather-description");
        this.iconImageEl = document.querySelector(".icon");
        this.loader = document.querySelector(".loader");
        this.errorCodeEl = document.querySelector(".error");
        this.latEl;
        this.lonEl;
        this.countryCodeEl = document.querySelector(".country");
        this.tempEl = document.querySelector(".temperature");

        this.searchBtn.addEventListener("click",this.#fetchAndRenderData.bind(this));
        this.inputEl.addEventListener("keydown", e => {
            if(e.key === "Enter") {
                e.preventDefault();
                this.#fetchAndRenderData();
            }
        })
    }

    #fetchAndRenderData() {
        this.#removecontent();
        this.loader.classList.add("active");
        let inputValue = this.inputEl.value;
        let URL = `https://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=5&appid=${this.#API_KEY}`;

        fetch(URL)
        .then(e => e.json())
        .then(([info]) => {
            if(!info.name) return;

            this.cityValue = info.name;
            this.countryCodeValue = info.country;
            this.latEl = info.lat;
            this.lonEl = info.lon;
        
            return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.latEl}&lon=${this.lonEl}&appid=${this.#API_KEY}&units=metric`)
        })
        .then(e => e.json())
        .then(({main:{temp},weather}) => {
            let {description, icon} = weather.at(0);
            this.cityEl.textContent = `${this.cityValue}, `;
            this.countryCodeEl.textContent = `${this.countryCodeValue}`;
            this.weatherDescriptionEl.textContent = description;
            this.loader.classList.remove("active");
            this.tempEl.textContent = `${temp}°C`;
            this.iconImageEl.style.opacity = "1";

            this.iconImageEl.src =`https://openweathermap.org/img/wn/${icon}@2x.png`;
            this.inputEl.value = "";

        })
        .catch(e => {
            this.errorCodeEl.classList.add("active");
            console.log(e)
        });

    }

    #removecontent() {
        this.errorCodeEl.classList.remove("active");
        this.tempEl.textContent = "";
        this.cityEl.textContent = "";
        this.weatherDescriptionEl.textContent = "";
        this.countryCodeEl.textContent = "";
        this.iconImageEl.src = "";
        this.iconImageEl.style.opacity = "0";
    }

    static start() {
        new this();
    }
}


/*
============
main {
============
*/
App.start();

/*
============
}
============
*/