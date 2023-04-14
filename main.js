const wrapper = document.querySelector(".wrapper"),
infoTxt = document.querySelector(".info"),
inputFied = document.querySelector("input"),
btn = document.querySelector(".btn");

let tempTag =document.querySelector(".num"),
discriptionTag = document.querySelector(".disc"),
cityTag = document.querySelector(".location p"),
feelTag = document.querySelector(".feel .num"),
humidityTag = document.querySelector(".humidity .num"),
wIcon = document.querySelector(".weather-part img"),
arrow = document.querySelector("header i")

let api,
apikey = "e18126ea0b2d5b39c04d67118534bd9c";

//fetch the data if the user press enter and the input field not empty
inputFied.addEventListener("keyup", e => {
  if (e.key == "Enter" && inputFied.value != "") {
    fetchApi(inputFied.value);
  }
})

//get the device location if the user brower supprt it
btn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError)
  } else {
    alert("Your Browser Not Support Geolocation Api");
  }
})

//if the browser support gealocation get the longitude and latitude and fetch the data
function onSuccess(position) {
  let {latitude, longitude} = position.coords;
  api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apikey}`
  getData(api)
}

//on error popup an error message
function onError(error) {
  infoTxt.textContent = error.message;
  infoTxt.classList.add("error");
}

function fetchApi(city) {
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`

  getData(api)
}
//fetch the data for a specific city
function getData(api) {
  infoTxt.textContent = "Getting Weather Details...";
  infoTxt.classList.add("pending");
  fetch(api).then(res => res.json()).then(result => weatherDetails(result))
}

function weatherDetails(info) {
  //popup an error if the user enter invalid city
  if (info.cod == "400") {
    infoTxt.classList.replace("pending", "error")
    infoTxt.textContent = `${inputFied.value} isn't a valid city`
  } else {
    let city = info.name,
    country = info.sys.country,
    {description, id}= info.weather[0],
    {temp, feels_like, humidity} = info.main;

    //insert the data to the html elements
    cityTag.textContent = `${city}, ${country}`
    discriptionTag.textContent = description
    tempTag.textContent = Math.floor(temp)
    feelTag.textContent = Math.floor(feels_like)
    humidityTag.textContent = `${humidity}%`

    //change the weather icon according to the weather id
    if(id == 800) {
      wIcon.src = "imgs/cloud-sun-solid.svg"
    } else if (id >= 200 && id <= 232) {
      wIcon.src = "imgs/cloud-bolt-solid.svg"
    } else if (id >= 600 && id <= 622) {
      wIcon.src = "imgs/cloud-bolt-solid.svg"
    }else if (id >= 701 && id <= 781) {
      wIcon.src = "imgs/smog-solid.svg"
    }else if (id >= 801 && id <= 804) {
      wIcon.src = "imgs/cloud-sun-solid.svg"
    }else if (id >= 300 && id <= 321 || (id >= 500 && id <= 531)) {
      wIcon.src = "imgs/cloud-sun-rain-solid.svg"
    }
    
    infoTxt.classList.remove("pending", "error");
    wrapper.classList.add("active")
  }
}

//delete active class from the wrapper when the arrow clicked
arrow.addEventListener("click", () => {
  wrapper.classList.remove("active")
})