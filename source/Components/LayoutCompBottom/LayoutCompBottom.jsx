import * as styles from './LayoutCompBottom.module.scss';

import { ForecastToggler } from '../ForecastToggler/ForecastToggler';
import { ForecastCardsContainer } from '../ForecastCardsContainer/forecastCardsContainer'; 

import { useState } from "react";

export function LayoutCompBottom({weeklyForecastCards, hourlyForecastCards}) {
    const [toggler, setToggler] = useState(true);

    return (
        <div className={styles.LayoutCompBottom}>
            <ForecastToggler setToggler={setToggler} toggler={toggler}/>
            <ForecastCardsContainer forecastCards={toggler ? weeklyForecastCards : hourlyForecastCards}/>
        </div>
    )
}