import React from "react";


const Weather = (props) =>{
    return(
        <div className="container">
            <div className="currentDay">
            <h1>
                {props.city}, {props.country}
            </h1>
            <h5 className="py-2">
                <i className={`wi ${props.weatherIcon} display-2`}></i>
            </h5>
    <h1 className="py-2">{props.temp_farenheit}&deg;</h1>
            {minmaxTemp(props.temp_max,props.temp_min)}
            <h4 className="py-3">{props.description}</h4>
            </div>
        <div className="forecast">
            <h2>Next 4 Day Forecast:</h2>
            <h4>{props.forecastDay1}, {props.forecastDay1Temp}&deg;</h4>
            <h4>{props.forecastDay2}, {props.forecastDay2Temp}&deg;</h4>
            <h4>{props.forecastDay3}, {props.forecastDay3Temp}&deg;</h4>
            <h4>{props.forecastDay4}, {props.forecastDay4Temp}&deg;</h4>
        </div>
        </div>
    );
    }


function minmaxTemp(min,max){
    return(
        <h3>
            <span className="px-4">{min}&deg;</span>
            <span className="px-4">{max}&deg;</span>
        </h3>
    )
}


export default Weather