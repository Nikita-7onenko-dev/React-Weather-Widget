import * as styles from './CityBlock.module.scss';

import { ClipLoader } from 'react-spinners';

import { Button } from "../Button/Button";
import { Clock } from "../Clock/Clock";

import { defineWeekDay } from "../../utils/defineWeekDay";

export function CityBlock({data , setData, setIsOpenPane}) {

    if(!data) return (
         <div className={styles.loading} >
            <ClipLoader color="#FFF" />
         </div>
    )

    const cityName = data.currentCity;
    const weatherData = data.addedCities[cityName]

    const formatter = Intl.DateTimeFormat(undefined, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    })

    let dayOfWeek = defineWeekDay(weatherData.current.time);
    let date = formatter.format( new Date(weatherData.current.time) )

    return (
        <div className={styles.CityBlock}>
            <h2>{cityName}</h2>
            <p>{dayOfWeek}</p>
            <time dateTime={date}>{date}</time>
            <Clock data={data} setData={setData} />               
            <Button onClick={() => setIsOpenPane(true)}>Управление городами</Button>
        </div>
    )
}