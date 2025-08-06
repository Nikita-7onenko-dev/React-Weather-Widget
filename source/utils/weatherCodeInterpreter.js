export function weatherCodeInterpreter(data, isIcon, isNight) {
            switch (data) {
            case 0 : return isIcon ? isNight ? "wi-night-clear" : "wi-day-sunny" : "Ясно";
            case 1 : return isIcon ? isNight ? "wi-night-alt-cloudy" : "wi-day-cloudy" : "Преимущ. ясно";
            case 2 : return  isIcon ? isNight ? "wi-night-alt-cloudy" : "wi-day-cloudy" : "Переменная облачность";
            case 3 : return isIcon ? "wi-cloudy" : "Пасмурно";
            case 45 : return isIcon ? isNight ? "wi-night-fog" : "wi-day-fog" : "Туман";
            case 48 : return isIcon ? "wi-snowflake-cold" : "Оседающая изморозь";
            case 51 : return isIcon ? "wi-showers" : "Слабая морось";
            case 53 : return isIcon ? "wi-showers" : "Морось";
            case 55 : return isIcon ? "wi-showers" : "Интенсивная морось";
            case 56 : return isIcon ? "wi-hail" : "Замерзающая морось";
            case 57 : return isIcon ? "wi-hail" : "Плотная замерзающая морось";
            case 61 : return isIcon ? "wi-showers" : "Слабый дождь";
            case 63 : return isIcon ? "wi-rain" : "Дождь";
            case 65 : return isIcon ? "wi-rain" : "Сильный дождь";
            case 66 : return isIcon ? "wi-rain-wind" : "Замерзающий дождь";
            case 67 : return isIcon ? "wi-rain-wind" : "Сильный замерзающий дождь";
            case 71 : return isIcon ? "wi-snow" : "Слабый снегопад";
            case 73 : return isIcon ? "wi-snow" : "Снегопад";
            case 75 : return isIcon ? "wi-snow" : "Сильный снегопад";
            case 77 : return isIcon ? "wi-snow" : "Крупный снег";
            case 80 : return isIcon ? "wi-rain" : "Слабый ливень";
            case 81 : return isIcon ? "wi-rain" : "Ливень";
            case 82 : return isIcon ? "wi-rain" : "Сильный ливень";
            case 85 : return isIcon ? "wi-sleet" : "Снег с дождем";
            case 86 : return isIcon ? "wi-sleet" : "Сильный снег с дождем";
            case 95 : return isIcon ? "wi-thunderstorm" : "Гроза";
            case 96 : return isIcon ? "wi-storm-showers" : "Гроза с градом";
            case 99 : return isIcon ? "wi-storm-showers" : "Гроза с крупным градом";
        }
}