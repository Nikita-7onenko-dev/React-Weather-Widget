import * as styles from "./WeeklyForecastCard.module.scss";

import { convertWindAzimuth, getIconFromWindAzimuth } from "../../utils/convertWindAzimuth";
import {weatherCodeInterpreter} from '../../utils/weatherCodeInterpreter';

import { WeatherIcon } from "../WeatherIcon/WeatherIcon";
import { defineWeekDay } from "../../utils/defineWeekDay";


export function WeeklyForecastCards(data) {
    
    const weeklyForecastData = [];

    for (let i = 0; i < data.daily.time.length; i++) {
        weeklyForecastData.push({
            time: data.daily.time[i],
            weatherCode: data.daily.weather_code[i],
            temperatureMax: data.daily.temperature_2m_max[i],
            temperatureMin: data.daily.temperature_2m_min[i],
            windSpeed: data.daily.wind_speed_10m_max[i],
            windDirection: data.daily.wind_direction_10m_dominant[i],
            tempUnit: data.daily_units.temperature_2m_max
        })
    }

    const formatter = Intl.DateTimeFormat(undefined, {
        day: "2-digit",
        month: "2-digit",
    })

    const weeklyForecastCards = weeklyForecastData.map((card, index) => (
        <div className={styles.WeeklyForecastCard} key={card.time} >
            <p>
                {formatter.format( new Date(card.time))} {defineWeekDay(new Date(card.time), true)} {index === 0 && (<><br/>Сегодня</>)}
            </p>
            <WeatherIcon name={weatherCodeInterpreter(card.weatherCode, true)}/>
            <p>
                Макс: {card.temperatureMax}{card.tempUnit}<br/>
                Мин: {card.temperatureMin}{card.tempUnit}
            </p>
            <span>
                Ветер: {card.windSpeed} м/с<br/>
                <WeatherIcon name={getIconFromWindAzimuth(card.windDirection)} sizePx={"25px"} /> {convertWindAzimuth(card.windDirection, true)}  
            </span>
        </div>
    ))

    return weeklyForecastCards;

}