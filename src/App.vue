<template>
  <div id="app" :class="typeof weather.main != 'undefined' && weather.main.temp > 16 ? 'warm' : ''">
    <main>
      <form @submit.prevent="searchWeather()" class="search-box">
        <input type="text" placeholder="Search ..." v-model="query">
        <input type="submit" placeholder="Search">
      </form>

      <div class="weather-container" v-if="typeof weather.main != 'undefined'">
        <div class="location-box">
          <div class="location">{{ weather.name }}, {{ weather.sys.country }}</div>
          <div class="date">{{ bulidDate() }}</div>
        </div>

        <div class="weather-box">
          <div class="temp">{{ Math.round(weather.main.temp) }}C</div>
          <div class="weather">{{ weather.weather[0].main }}</div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>


export default {
  name: 'App',
  data () {
    return {
      apiKey: "a02412dd095d616eafcf551514f396b1",
      url_base: "https://api.openweathermap.org/data/2.5/",
      query: "",
      weather: {}
    }
  },
  methods: {
    searchWeather () {
      if(this.query != "") {
        fetch(`${this.url_base}weather?q=${this.query}&units=metric&APPID=${this.apiKey}`)
          .then(res => res.json())
          .then(data => {
            this.weather = data;
            this.query = '';
          })
      }
    },
    bulidDate () {
      let d = new Date();
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let days = ["Saturday", "Sunday", "Moday", "Tuesday", "Wednesday", "thursday", "Friday"];

      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();

      return `${day} ${date} ${month} ${year}`
    }
  }
}
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: "Fira Sans", sans-serif;
  }

  #app {
    background-image: url("./assets/cold.jpg");
    background-position: center;
    background-size: cover;
    transition: 0.3s;
    @media (min-width: 992px) {
      padding: 0 100px;
    }
    &.warm {
      background-image: url("./assets/warm.jpg");
    }
    main {
      min-height: 100vh;
      padding: 25px;
      background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6));

      .search-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        
        input {
          appearance: none;
          border: none;
          outline: none;
          background: none;

          &[type="text"] {
            width: 100%;
            padding: 10px 16px;
            margin-bottom: 18px;
            background-color: rgba(255, 255, 255, 0.4);
            border-radius: 16px 0px 16px 0px;
            box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
            font-size: 18px;
            transition: 0.3s;
            &::placeholder {
              color: #fff;
            }
            &:focus {
              background-color: rgba(255, 255, 255, 0.7);
              border-radius: 0px 16px 0px 16px;
              box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
            }
          }

          &[type="submit"] {
            width: 100%;
            max-width: 150px;
            padding: 10px;
            margin-bottom: 22px;
            background-color: #2196f3;
            color: #fff;
            border-radius: 10px;
            box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
            font-size: 16px;
            text-transform: uppercase;
            cursor: pointer;
          }
        }
      }
      .weather-container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        .location-box {
          width: fit-content;
          text-align: center;
          padding: 22px 16px;
          
          .location {
            font-size: 30px;
            color: #fff;
            margin-bottom: 12px;
            text-shadow: 4px 2px 16px rgba(0, 0, 0, 0.3);
            letter-spacing: 1px;
          }
          .date {
            font-size: 16px;
            font-style: italic;
            color: rgba(255, 255, 255, 0.7);
            margin-bottom: 12px;
            text-shadow: 4px 2px 16px rgba(0, 0, 0, 0.3);
            letter-spacing: 1px;
          }
        }
        .weather-box {
          
          .temp {
            background-color: rgba(255, 255, 255, 0.4);
            text-align: center;
            padding: 30px;
            margin-bottom: 26px;
            font-size: 80px;
            font-weight: bold;
            color: #fff;
            text-shadow: 4px 2px 8px rgba(0, 0, 0, 0.5);
            border-radius: 16px;
            box-shadow: 6px 2px 10px rgba(0, 0, 0, 0.6);
          }

          .weather {
            text-align: center;
            color: #fff;
            font-size: 45px;
            text-shadow: 6px 3px 8px rgba(0, 0, 0, 0.8);
            letter-spacing: 2px;
          }
        }
      }
    }
  }
  
</style>
