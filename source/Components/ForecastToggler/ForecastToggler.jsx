import * as styles from "./ForecastToggler.module.scss";

import { Button } from "../Button/Button";

export function ForecastToggler({setToggler, toggler}) {
    
    return (
        <div className={styles.toggler}>

            <Button 
                onClick={() => setToggler(true)}
                className={toggler ? styles.activatedForecastButton : ""}
            >На неделю
            </Button>

            <Button
                onClick={() => setToggler(false)}
                className={toggler ?  "" : styles.activatedForecastButton}
            >По часам
            </Button>
        
        </div>
    )

}