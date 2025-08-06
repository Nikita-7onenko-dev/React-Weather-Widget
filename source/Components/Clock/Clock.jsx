import { useEffect, useState } from "react";

import { fetchWeather } from "../../utils/fetchData";

export function Clock( {data, setData} ) {

    let currentTimeZone = data.addedCities[data.currentCity].timezone;

    const formatter = Intl.DateTimeFormat(undefined, {
        timeZone: currentTimeZone || undefined,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    })

    const [time, setTime] = useState( formatter.format( new Date() ) );

    useEffect(() => {

        async function  tick() {
            let formattedTime = formatter.format( new Date() )
            setTime( formattedTime );

            let [ , minutes, seconds] = formattedTime.split(":");
            if(Number(minutes) % 5 === 0 && seconds === "01") {

                const weatherData = await fetchWeather(
                    data.addedCities[data.currentCity].latitude,
                    data.addedCities[data.currentCity].longitude
                );
                
                setData(prev => ({
                    ...prev,
                    addedCities: {
                        ...prev.addedCities,
                        [prev.currentCity]: weatherData
                    }
                }))
            }
        }

        const intervalId = setInterval(tick, 1000);
         console.log("Interval started:", intervalId);

        return () => { 
            clearInterval(intervalId);
            console.log("Interval cleared:", intervalId);
        }
    }, [currentTimeZone])

    return (
        <time dateTime={time}>{time}</time>
    )
}