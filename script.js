const wrapper = document.querySelector(".wrapper"),
inputPart = document.querySelector(".entry"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button"),
hIcon = document.querySelector(".humid-part img"),
lvl = document.querySelector(".humid"),
Goback = wrapper.querySelector("header i");

let api;

inputField.addEventListener("keyup", e =>{
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value);
    }
});

locationBtn.addEventListener("click", ()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        ("Tu navegador no soporta la geolocaliazación");
    }
});

function onSuccess(position){
    const {latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=es&appid=8a8c9fc66d9ba5dd4824fdd1e3296b44`;
    fetchData();
}

function onError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}


function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=es&appid=8a8c9fc66d9ba5dd4824fdd1e3296b44`;
    fetchData();
}   

function fetchData(){
    infoTxt.innerText = "Obteniendo la humedad...";
    infoTxt.classList.add("load");

    fetch(api).then(response => response.json()).then(result => weatherDetails(result));

}

function weatherDetails(info){
    infoTxt.classList.replace("load", "error");
    if(info.cod == "404"){
        infoTxt.innerText = `${inputField.value} No es un nombre válido`;
    }else{
        const city = info.name;
        const country = info.sys.country;
        const humidity = info.main.humidity;

        wrapper.querySelector(".moist .num").innerText = humidity;
        wrapper.querySelector(".location span").innerText = `${city}, ${country}`

        if(humidity == 0){
            hIcon.src = "iconos/0.svg";
        }else if(humidity <= 10){
            hIcon.src = "iconos/10.svg";
        }else if(humidity <= 20){
            hIcon.src = "iconos/20.svg";
        }else if(humidity <= 30){
            hIcon.src ="iconos/30.svg";
        }else if(humidity <= 40){
            hIcon.src ="iconos/40.svg";
        }else if(humidity <= 50){
            hIcon.src ="iconos/50.svg";
        }else if(humidity <= 60){
            hIcon.src ="iconos/60.svg";
        }else if(humidity <= 70){
            hIcon.src ="iconos/70.svg";
        }else if(humidity <= 80){
            hIcon.src ="iconos/80.svg";
        }else if(humidity <= 90){
            hIcon.src ="iconos/90.svg";
        }else if(humidity <= 100){
            hIcon.src ="iconos/100.svg";
        };

        if(humidity < 20){
            lvl.innerText = "Humedad muy baja";
        }else if(humidity <40){
            lvl.innerText = "Humedad baja";
        }else if(humidity < 60){
            lvl.innerText = "Humedad moderada";
        }else if(humidity < 80){
            lvl.innerText = "Humedad alta";
        }else if(humidity >= 90){
            lvl.innerText = "Humedad muy alta";
        }

        infoTxt.classList.remove("load", "error");
        wrapper.classList.add("active");
        console.log(info);
    }

}

Goback.addEventListener("click", ()=>{
    wrapper.classList.remove("active");
});
