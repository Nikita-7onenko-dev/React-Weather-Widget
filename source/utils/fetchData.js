
export async function fetchLocationByIP() {
    try{
        let response = await fetch('https://tiny-waterfall-4e64.nikitatrihomkin.workers.dev/');
        if(!response.ok) throw new Error(`Ошибка сервера при запросе местоположения по IP - ${response.status}`)
        
        let location = await response.json();

        return location
    
    } catch(err) {
        console.log(err)
        console.log(err.message)
    }
}

export async function fetchCoords(cityName) {
  try {
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&language=ru`);
    if (!response.ok) throw new Error(`Ошибка при запросе координат — ${response.status}`);

    let coords = await response.json();

    if(!coords?.results) {
        return;
    } else if(coords.results.length === 1) {
        return coords.results;
    } else {
        coords = coords.results.filter(item => 
            item.feature_code.startsWith('PPL')
        )
    }

    return coords;

  } catch (err) {
    console.log(err);
    console.log(err.message);
  }
}


export async function fetchWeather(lat, lon) {

    let params = {
            latitude:  lat,
            longitude : lon,
            timezone: "auto",
            current: "temperature_2m,wind_speed_10m,rain,snowfall,weather_code,relative_humidity_2m,is_day,precipitation,wind_direction_10m",
            wind_speed_unit: "ms",
            forecast_days: "7",
            daily: "sunrise,sunset,weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max,wind_direction_10m_dominant",
            hourly: "temperature_2m,precipitation_probability,weather_code",
    }

    const url = `https://api.open-meteo.com/v1/forecast?${new URLSearchParams( params ).toString()}`;

    try{

        let response = await fetch(url);
        if(!response.ok) throw new Error(`Ошибка сервера при получении погодных данных - ${response.status}`);
        let result = await response.json();
        
        return result

    } catch(err) {
        console.log(err)
        console.log(err.message)
    }
}
