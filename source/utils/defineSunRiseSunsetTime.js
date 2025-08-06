import { getNearestHour } from "./getNearestHour"

export function defineSunriseSunsetTime(data, isGetNearestHour) {

    let sunrise = new Date(data.daily.sunrise[0])
    let sunset = new Date(data.daily.sunset[0])

    if(isGetNearestHour) {
        sunrise = getNearestHour( sunrise );
        sunset = getNearestHour( sunset );

    } else {
        const formatter = Intl.DateTimeFormat(undefined, {
            hour: '2-digit',
            minute: '2-digit',
        })
        
        sunrise = formatter.format( new Date(sunrise) )
        sunset = formatter.format( new Date(sunset) )
    }

    return [sunrise, sunset]
   
}