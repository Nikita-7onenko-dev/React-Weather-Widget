// Лейаут компонент для группировки карточек верхней части виджета 
import { TemperatureBlock } from "../TemperatureBlock/TemperatureBlock";
import { CityBlock } from "../CityBlock/CityBlock";

import * as styles from "./LayoutCompTop.module.scss"

export function LayoutCompTop({data, setData, setIsOpenPane}) {
    return (
        <div className={styles.LayoutCompTop}>
            <TemperatureBlock data={data} />
            <CityBlock data={data} setData={setData} setIsOpenPane={setIsOpenPane}/>
        </div>
    )
}