import * as styles from "./TemperatureBlock.module.scss";

import { ClipLoader } from "react-spinners";

// Методы интерпретации данных
import { weatherCodeInterpreter } from "../../utils/weatherCodeInterpreter";
import { defineSunriseSunsetTime } from "../../utils/defineSunRiseSunsetTime";
import { convertWindAzimuth } from "../../utils/convertWindAzimuth";

export function TemperatureBlock({data}) {

    if(!data) return (
        <div className={styles.loading} >
            <ClipLoader color="#FFF" />
        </div>
    )

    let weatherData = data.addedCities[data.currentCity];
    let weather = weatherCodeInterpreter(weatherData?.current.weather_code);
    let message;
    let sunrise, sunset;

    if(new Date(weatherData.daily.sunrise[0]).getHours() === new Date(weatherData.daily.sunset[0]).getHours()) {
        message = weatherData.current.is_day === 1 ? "Полярный день" : "Полярная ночь";
    } else {
        [sunrise, sunset] = defineSunriseSunsetTime(weatherData);
    }
    
    let windDirection = convertWindAzimuth(weatherData.current.wind_direction_10m)
    

    return (
        <div className={styles.TemperatureBlock}>
            <h2><strong>{weatherData?.current.temperature_2m}</strong><span> {weatherData?.current_units.temperature_2m}</span></h2>
            <p>{weather}</p>
            <p>
                Ветер: {weatherData.current.wind_speed_10m + "  м/с"}<br />
                {windDirection}
            </p>
            <p>Влажность: {weatherData?.current.relative_humidity_2m + "%"}</p>
            <p>
                {sunrise && sunrise ?
                 (<><span>Рассвет: {sunrise}</span><br />
                <span>Закат: {sunset}</span></>)
                : message
                
                }
            </p>
        </div>
    )
}