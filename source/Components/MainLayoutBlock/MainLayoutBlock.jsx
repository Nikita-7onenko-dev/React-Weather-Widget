import * as styles from './MainLayoutBlock.module.scss';

import { LayoutCompTop } from "../LayoutCompTop/LayoutCompTop.jsx";
import {LayoutCompBottom} from "../LayoutCompBottom/LayoutCompBottom.jsx";

import { defineBackgroundImage } from "../../utils/defineBackgroundImage.js";
import { ManagementPane } from '../ManagementPane/ManagementPane.jsx';
import { useState } from 'react';


export function MainLayoutBlock({data, setData, weeklyForecastCards, hourlyForecastCards}) {

    const [isOpenPane, setIsOpenPane] = useState(false);

    let imgUrl;
    if(data) {
        imgUrl = defineBackgroundImage(data.addedCities[data.currentCity]);
    }

    return (
        <div className={styles.MainLayoutBlock} style={{backgroundImage: imgUrl}}>
            <LayoutCompTop
              data={data}  
              setData={setData}
              setIsOpenPane={setIsOpenPane}
            />
            <LayoutCompBottom 
                weeklyForecastCards={weeklyForecastCards}
                hourlyForecastCards={hourlyForecastCards}
            />
            {isOpenPane 
            && <ManagementPane 
                  setIsOpenPane={setIsOpenPane}
                  setData={setData}
                  data={data}
                />}
        </div>
    )
} 