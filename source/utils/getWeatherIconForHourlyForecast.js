
import { WeatherIcon } from "../Components/WeatherIcon/WeatherIcon";
import { weatherCodeInterpreter } from "./weatherCodeInterpreter";

export function getWeatherIconForHourlyForecast({
  forecastHour,
  sunsetHour,
  sunriseHour,
  isDay,
  weatherCode
}) {
  const isSunriseTime = forecastHour === sunriseHour && sunriseHour !== sunsetHour;
  const isSunsetTime = forecastHour === sunsetHour && sunriseHour !== sunsetHour;
  const isNightTime = (forecastHour < sunriseHour || forecastHour > sunsetHour) && sunriseHour !== sunsetHour;
  const isPolarDay = sunsetHour === sunriseHour && isDay === 1;
  const isPolarNight = (forecastHour < sunriseHour || forecastHour > sunsetHour) && sunriseHour === sunsetHour;

  return isSunriseTime ?  <WeatherIcon name="wi-sunrise"/>
    : isSunsetTime ? <WeatherIcon name="wi-sunset"/>
    : isNightTime ? <WeatherIcon name={weatherCodeInterpreter(weatherCode, true, true)}/>
    : isPolarDay ? <WeatherIcon name={weatherCodeInterpreter(weatherCode, true)}/>
    : isPolarNight ? <WeatherIcon name={weatherCodeInterpreter(weatherCode, true, true)}/>
    : <WeatherIcon name={weatherCodeInterpreter(weatherCode, true)}/> // Если ничего из вышеперечисленного значит сейчас день
}