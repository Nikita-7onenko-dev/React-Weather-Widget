import {fetchLocationByIP, fetchWeather} from "../utils/fetchData";

import { useEffect} from "react";

export function useInitFetch(setData) {

    useEffect( () => {
        async function fetchAll() {

            try {
                const location = await fetchLocationByIP();
                const weatherData = await fetchWeather(location.latitude, location.longitude, location.city);

                setData({
                    currentCity: location.city,
                    addedCities: {
                            [location.city]: weatherData
                        }
                })

            } catch(err) {
                console.log(err);
            }
            
        }

        fetchAll();

    }, [])
}