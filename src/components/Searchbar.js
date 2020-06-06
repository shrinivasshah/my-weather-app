import React from "react";
import "./Searchbar.css";
const Searchbar = (props) => {
  return (
    <div className="search-box" style={{textAlign:"center"}}>
    <div>{props.error?error():null}</div>
      <form onSubmit={props.loadWeather}>
        <div className="">
          <div className="">
            <input
              type="text"
              className="search-bar"
              name="city"
              autoComplete="off"
              placeholder="City, Country"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

function error(){
  return (
    <div className="alert alert-danger mx-5" role="alert">
      Please city and country
    </div>
  )
}


export default Searchbar;
