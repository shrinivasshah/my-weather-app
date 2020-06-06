import axios from "axios";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "weather-icons/css/weather-icons.css";
import CardView from "./CardView";
import Searchbar from "./Searchbar";
import './App.css'


const API = "b0b6a9895b910046e1bced3fcf822df6";
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: "",
      temp: null,
      tempMin: null,
      tempMax: null,
      description: "",
      icon: "",
      error:false,
      date: '',      
    };
    
    
    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atomsphere: "wi-fog",
      clear: "wi-day-sunny",
      Clouds: "wi-day-fog",
    };
  }
  getWeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId <= 232:
        this.setState({ icon: this.weatherIcon.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: this.weatherIcon.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 531:
        this.setState({ icon: this.weatherIcon.Rain });
        break;
      case rangeId >= 600 && rangeId < 622:
        this.setState({ icon: this.weatherIcon.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: this.weatherIcon.Atomsphere });
        break;
      case rangeId === 800:
        this.setState({ icon: this.weatherIcon.clear });
        break;
      case rangeId >= 801 && rangeId < 804:
        this.setState({ icon: this.weatherIcon.Clouds });
        break;
      default:
        this.setState({ icon: this.weatherIcon.Clouds });
    }
  }
  getWeather = async (e) => {

    e.preventDefault();

    let defVal = e.target.elements.city.value

    const city= defVal.slice(0,defVal.indexOf(',')).trim()
    const country= defVal.slice(defVal.indexOf(',')+1).trim()
    e.target.elements.city.value = ''
    if (country && city){
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${API}`
      );
      console.log(response);
      this.setState({
        city: `${response.data.name}, ${response.data.sys.country} `,
        temp: response.data.main.temp,
        tempMin: response.data.main.temp_min,
        tempMax: response.data.main.temp_max,
        description: response.data.weather[0].description,
        date:date,
        celcius:`&deg;`
      });
      this.getWeatherIcon(this.weatherIcon, response.data.weather[0].id);
    }
    else{
      this.setState({error:true});
    }
    
  };

  render() {
    const bgColor =(icon) =>{
      

      if (icon.includes('thunderstorm')){
        return '.thunderstorm';
      }else if(icon.includes('sleet')){
        return '.sleet'
      }else if(icon.includes('storm')){
        return '.storm'
      }else if(icon.includes('fog')){
        return '.fog'
      }else if(icon.includes('sunny')){
        return '.sunny'
      }else{
        return '.default'
      }
    }

    
    return (
      <div className="main default">
        <Searchbar loadWeather={this.getWeather} error={this.state.error}/>
        <CardView
          city={this.state.city}
          country={this.state.country}
          temp={this.state.temp}
          tempMin={this.state.tempMin}
          tempMax={this.state.tempMax}
          description={this.state.description}
          icon={this.state.icon}
          date={this.state.date}
        />
      </div>
    );
  }
}

export default App;
