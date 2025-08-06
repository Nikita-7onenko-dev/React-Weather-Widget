import clear_day from '../../public/img/clear_day.png';
import rain_day from '../../public/img/rain_day.png';
import snow_day from '../../public/img/snow_day.png';
import cloud_day from '../../public/img/cloud_day.png';
import clear_night from '../../public/img/clear_night.png';
import rain_night from '../../public/img/rain_night.png';
import snow_night from '../../public/img/snow_night.png';
import cloud_night from '../../public/img/cloud_night.png';

export function defineBackgroundImage(weatherData) {
        // Определить фоновое изображение
        const backgroundUrls = { 
            'clear_day': clear_day,
            'rain_day': rain_day,
            'snow_day': snow_day,
            'cloud_day': cloud_day,
            'clear_night': clear_night,
            'rain_night': rain_night,
            'snow_night': snow_night,
            'cloud_night': cloud_night
        };

        
        let currentWeatherKey = getWeatherKey(weatherData);

        let backgroundImageUrl = backgroundUrls[currentWeatherKey];
        return `url('${backgroundImageUrl}')`;
    }

function getWeatherKey(weatherData) {

    // Вычисляем ключ:
    // 1. Вид осадков
    let precipitationType;
    if (weatherData.current.weather_code === 0) {
        precipitationType = "clear";
    } else if (weatherData.current.weather_code > 0 && weatherData.current.weather_code <= 48) {
        precipitationType = "cloud";
    } else if ( (weatherData.current.weather_code >= 51 && weatherData.current.weather_code <= 67) ||
    (weatherData.current.weather_code >= 80 && weatherData.current.weather_code <= 99) ) {
        precipitationType = "rain";
    } else if (weatherData.current.weather_code >= 71 && weatherData.current.weather_code <= 77) {
        precipitationType = "snow";
    }
    // 2. Время суток
    let timeOfDay = weatherData.current.is_day > 0 ? 'day' : 'night';

    return `${precipitationType}_${timeOfDay}`;
}