import React from "react";
import './App.css';

import 'weather-icons/css/weather-icons.css'
import "bootstrap/dist/css/bootstrap.min.css";
import Weather from "./components/weather";
import Form from "./components/form"

const APIkey = "1c7545fb22b1f2a2bcb5903c0ae4510d"



class App extends React.Component {
  constructor(){
    super()
      this.state = {
        city : undefined,
        country : undefined,
        icon : undefined,
        main : undefined,
        current_temp : undefined,
        max_temp : undefined,
        min_temp : undefined,
        description : "",
        forecastDay1 : undefined,
        forecastDay2 : undefined,
        forecastDay3 : undefined,
        forecastDay4 : undefined,
        forecastDay1Temp : undefined,
        forecastDay2Temp: undefined,
        forecastDay3Temp : undefined,
        forecastDay4Temp: undefined,
        error : false

      };   
  

      this.weatherIcon = {
        Thunderstorm: "wi-thunderstorm",
        Drizzle: "wi-sleet",
        Rain: "wi-storm-showers",
        Snow: "wi-snow",
        Atmosphere: "wi-fog",
        Clear: "wi-day-sunny",
        Clouds: "wi-day-fog"
      };

  }

  getFarenheit(temp){
    let farenheit = Math.floor((temp - 273.15) * (9/5) +32)
    return farenheit;
  }

  getWeatherIcon(icons,rangeId){
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        this.setState({ icon: icons.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: icons.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({ icon: icons.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: icons.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: icons.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: icons.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: icons.Clouds });
        break;
      default:
        this.setState({ icon: icons.Clouds });
    }
  }


  getWeather =async(e) =>{

    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if(city && country){
      const [api_call,api_call2] = await Promise.all([
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${APIkey}`),
        fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIkey}`)
      ])
    const [response,response2] = await Promise.all([
      api_call.json(),
      api_call2.json()

    ]);
     
    console.log(response);
    console.log(response2);

    this.setState({
      city : response.name,
      country : response.sys.country,
      current_temp : this.getFarenheit(response.main.temp),
      max_temp : this.getFarenheit(response.main.temp_max),
      min_temp : this.getFarenheit(response.main.temp_min),
      description: response.weather[0].description,
      forecastDay1: response2.list[5].dt_txt,
      forecastDay1Temp : this.getFarenheit(response2.list[5].main.temp),
      forecastDay2: response2.list[8].dt_txt,
      forecastDay2Temp : this.getFarenheit(response2.list[8].main.temp),
      forecastDay3: response2.list[23].dt_txt,
      forecastDay3Temp : this.getFarenheit(response2.list[23].main.temp),
      forecastDay4: response2.list[31].dt_txt,
      forecastDay4Temp : this.getFarenheit(response2.list[31].main.temp),
    });

    this.getWeatherIcon(this.weatherIcon,response.weather[0].id)

    }else{
      this.setState({error : true})
    }

  };

  
  render(){
    return(
    <div className="App">
      <Form updateweather={this.getWeather} error={this.state.error}/>
      <Weather 
      city={this.state.city} 
      country={this.state.country}
      temp_farenheit={this.state.current_temp}
      temp_max={this.state.max_temp}
      temp_min={this.state.min_temp}
      description={this.state.description}
      weatherIcon={this.state.icon}
      forecastDay1={this.state.forecastDay1}
      forecastDay1Temp={this.state.forecastDay1Temp}
      forecastDay2={this.state.forecastDay2}
      forecastDay2Temp={this.state.forecastDay2Temp}
      forecastDay3={this.state.forecastDay3}
      forecastDay3Temp={this.state.forecastDay3Temp}
      forecastDay4={this.state.forecastDay4}
      forecastDay4Temp={this.state.forecastDay4Temp}
      />
    </div>
    )
  }
}


export default App;
