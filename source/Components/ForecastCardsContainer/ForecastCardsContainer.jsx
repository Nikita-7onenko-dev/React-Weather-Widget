import * as styles from './ForecastCardsContainer.module.scss';
import { ClipLoader } from 'react-spinners';

export function ForecastCardsContainer({forecastCards}) {

    if(!forecastCards) return (
                <div className={styles.loading}>
                    <ClipLoader color="#FFF" />
                </div>
    )

    return (
        <div className={styles.ForecastCardsContainer} >
            {forecastCards}
        </div>  
    )
}

