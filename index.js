const wTemp = document.getElementById("currentTemp");
const wIcon = document.getElementById("icon");
const wMinTemp = document.getElementById("min");
const wMaxTemp = document.getElementById("max");
const nameCity = document.getElementById("nameCity")
const searchForm = document.getElementById("searchCity")

const inputCity = document.getElementById("searchInput")

const APIKey = "bd14a934f2fffe99e95a9a446e7b7419";


// window.addEventListener("load", () => {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition( position => {
//             let lon = position.coords.longitude
//             let lat = position.coords.latitude
//             const APIKey = "bd14a934f2fffe99e95a9a446e7b7419";


//             const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=sp&appid=${APIKey}`

//             console.log(url);
//         })
//     }
// })

    searchForm.addEventListener("submit", (e) => {
    //evito la recarga del form,
    //tomo el valor del input y lo asigno a "city"
    e.preventDefault()
    const city = inputCity.value

    //consumo la API
    const getCityWeather = async (city) => {
        const APIKey = "bd14a934f2fffe99e95a9a446e7b7419";
    
        const API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=sp&appid=${APIKey}`;
    
        const response = await fetch(API);
        const data = await response.json();
    
        console.log(response);
        console.log(data);
        
        //extraigo los datos que necesito
        const temp = data.main.temp.toFixed(1);
        const icon = data.weather[0].main;
        const minTemp = data.main.temp_min.toFixed(1);
        const maxTemp = data.main.temp_max.toFixed(1);
        const name = data.name;
        const country = data.sys.country;

        console.log(name); //ciudad
        nameCity.innerHTML = `${name}, ${country}`;
        
        console.log(temp); //temperatura
        wTemp.innerHTML = temp;
    
        console.log(icon); // agrego el icono segun la condicion main
        switch (icon) {
            case "Thunderstorm":
                wIcon.src = "animated/thunder.svg";
                break;
            case "Drizzle":
                wIcon.src = "animated/rainy-2.svg";
                break;
            case "Rain":
                wIcon.src = "animated/rainy-7.svg";
                break;
            case "Snow":
                wIcon.src = "animated/snowy-6.svg";
                break;
            case "Clear":
                wIcon.src = "animated/day.svg";
                break;
            case "Atmosphere":
                wIcon.src = "animated/weather.svg";
                break;
            case "Clouds":
                wIcon.src = "animated/cloudy-day-1.svg";
                break;
            default:
                wIcon.src = "animated/cloudy-day-1.svg";
                console.log("por defecto");
        }
    
        console.log(minTemp);// temperatura minima
        wMinTemp.innerHTML = minTemp;
    
        console.log(maxTemp); // temperatura maxima
        wMaxTemp.innerHTML = maxTemp;
    };
    
    getCityWeather(city);
    searchForm.reset();
})
