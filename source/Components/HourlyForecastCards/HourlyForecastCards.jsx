import * as styles from './hourlyForecastCard.module.scss'

import { defineSunriseSunsetTime } from '../../utils/defineSunRiseSunsetTime';
import { defineWeekDay } from '../../utils/defineWeekDay';
import { getWeatherIconForHourlyForecast } from '../../utils/getWeatherIconForHourlyForecast';

export function HourlyForecastCards(data) {

  const timeFormatter = Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  })

  const dateFormatter = Intl.DateTimeFormat(undefined, {
    day: "2-digit",
    month: "2-digit",
  })
 
  const hourlyForecastData = [];
  const currentHour = new Date(data.current.time).getHours();

  for (let i = currentHour; i < currentHour + 24 ; i++) { // i < текущее время(час) + 24 часа
    hourlyForecastData.push({
      time: data.hourly.time[i],
      weatherCode: data.hourly.weather_code[i],
      temperature: data.hourly.temperature_2m[i], 
    })
  }

  const [sunriseHour, sunsetHour] = defineSunriseSunsetTime(data, true);

  const hourlyForecastCards = hourlyForecastData.map( (card, index) => {

    const forecastHour = new Date(card.time).getHours();

    const paramsForWeatherIcon = {
      forecastHour,
      sunsetHour,
      sunriseHour,
      isDay: data.current.is_day,
      weatherCode: card.weatherCode
    }
    
    return (
    <div className={styles.HourlyForecastCard} key={card.time}>
      <p>
        {dateFormatter.format( new Date(card.time) ) /* Дата */ } { defineWeekDay( new Date(card.time), true) /* День недели */ } <br/>
        {timeFormatter.format( new Date(card.time) /* Время */ )}{ index === 0 && (<><br/> Сейчас</>) }
      </p>
      <p>
        {card.temperature}{data.current_units.temperature_2m} {/* Температура */}
      </p>
      {getWeatherIconForHourlyForecast(paramsForWeatherIcon)} {/* Погода */}
    </div>
  )})

  return hourlyForecastCards;
}