import * as styles from "./ManagementPaneHat.module.scss"

import { Button } from "../Button/Button";
import { WeatherIcon } from "../WeatherIcon/WeatherIcon";


export function ManagementPaneHat({setIsOpenPane}) {

  return (
    <div className={styles.ManagementPaneHat}>
      <Button onClick={() => setIsOpenPane(false)}>
        <WeatherIcon name="wi-direction-left"></WeatherIcon>
      </Button>
      <h2>Управление городами</h2>
    </div>
  )
}