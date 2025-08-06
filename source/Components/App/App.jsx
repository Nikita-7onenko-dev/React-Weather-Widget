import { useState } from "react";

import { MainLayoutBlock } from "../MainLayoutBlock/MainLayoutBlock";
import { WeeklyForecastCards } from "../WeeklyForecastCards/WeeklyForecastCards";

import { useInitFetch } from "../../Hooks/useInitFetch";
import { HourlyForecastCards } from "../HourlyForecastCards/HourlyForecastCards";

export default function App() {

    const [data, setData] = useState(null);
    useInitFetch(setData);
    console.log(data)
    let weeklyForecastCards;
    let hourlyForecastCards;

    if(data) {
        weeklyForecastCards = WeeklyForecastCards(data.addedCities[data.currentCity]);
        hourlyForecastCards = HourlyForecastCards(data.addedCities[data.currentCity]);
    }

    return (
            <MainLayoutBlock data={data}
                setData={setData}
                weeklyForecastCards={weeklyForecastCards}
                hourlyForecastCards={hourlyForecastCards}
            />
    )
}