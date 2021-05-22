import React, { useState } from 'react'
import classes from './WeatherPage.module.css'
import WeatherAPI from './../../API/weather-api'




const WeatherPage = () => {

    const [query, setQuery] = useState('')
    const [weather, setWeather] = useState({})

    
    const search = (e) => {
        if (e.key === 'Enter') {
        fetch(`${WeatherAPI.base}weather?q=${query}&units=metric&APPID=${WeatherAPI.key}`)
            .then(res => res.json())
            .then(res => {
                setWeather(res)
                setQuery('')
            })
            
    }}



const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()]
        let date = d.getDate()
        let month = months[d.getMonth()]
        let year = d.getFullYear()

        return `${day} ${date} ${month} ${year}`
    }
    return (
        
        <div className={classes.WeatherPage}>
            <main>
                <div className={classes.searchBox}>
                    <input
                        type='text'
                        className={classes.searchBar}
                        placeholder='Enter your city'
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                        onKeyPress={search}
                    />
                </div>
        
                <div>
                </div>
                {(typeof weather.main != 'undefined') ? (
                    <div>
                        <div className={classes.locationBox}>
                            
                            <div className={classes.location}>
                                {weather.name}, {weather.sys.country}
                            </div>
                            <div className={classes.date}>
                                {dateBuilder(new Date())}
                            </div>
                            <div className={classes.weatherBox}>
                                <div className={classes.temp}>
                                    {Math.round(weather.main.temp)}°c
                        </div>
                                <div className={classes.weather}>
                                    {weather.weather[0].main}
                                </div>
                            </div>
  
                        </div>
                    </div>
                ) : ('')}
            </main>
        </div>
    )
}

export default WeatherPage
