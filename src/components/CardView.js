import React from 'react';
import './cardView.css'
import "weather-icons/css/weather-icons.css";



function minMaxTemp(min, max) {
    if(min && max){return (
      <h3>
        <span className="px-4 location">{min}&deg;</span>
        <span className="px-4 location">{max}&deg;</span>
      </h3>
    );}
  }

function renderCelcius(temp){
  if(!temp){
    return 
  }
  return <h1 className="py-2 temp">{temp}&deg;C</h1>
}

const CardView = (props) =>{
  
    return (
    <div className="location-box container text-light">
        <div className="cards pt-4" style={{ textAlign: "center" }}>
          <h1 className="location">
            {props.city}
          </h1>
          <h2 className="location">{props.date}</h2>
          <h5 className="py-4">
            <i className={`wi ${props.icon} location display-1`} />
          </h5>
          <div className="weather-box">
          {renderCelcius(props.temp)}
          {/* show min max temp */}
          {minMaxTemp(props.tempMin, props.tempMax)}
          </div>
          <h3 className="py-3 temp location" >{props.description}</h3>
        </div>
      </div>)
}

export default CardView