import * as styles from './addedCitiesList.module.scss';

import { defineBackgroundImage } from '../../utils/defineBackgroundImage';


export function AddedCitiesList({data, setData, setIsOpenPane}) {

  const addedCitiesList = Object.keys(data.addedCities);
  const addedCitiesData = Object.values(data.addedCities);
  const currentCity = data.currentCity;

  function onClick(e) {
    const deleteBtnClick = e.target.closest('button');
    const clickOnCityTitle = e.target.closest('li > div');

    if(!clickOnCityTitle && !deleteBtnClick) return;

    const cityName = e.target.closest('li').dataset.cityName;

    if(clickOnCityTitle) {
        setData(prev => ({
          ...prev,
          currentCity: cityName,
          addedCities: {
            ...prev.addedCities
          }
        }))
        setIsOpenPane(false);
    }
    if(deleteBtnClick) {
      const {[cityName]: _, ...rest} = data.addedCities;
      const newData = {
        ...data,
        addedCities: {
          ...rest
        }
      }
      setData(newData);
    }
  }
    
  const listElements = addedCitiesData.map((cityData, index) => {
    
    let imgUrl = defineBackgroundImage(cityData);

    return (
      <li 
        className={styles.listElement}
        key={addedCitiesList[index]}
        style={{backgroundImage: imgUrl}}
        data-city-name={addedCitiesList[index]}
      >
        <div>
          <h2>{addedCitiesList[index]}</h2>
          <span>{cityData.current.temperature_2m} {cityData.current_units.temperature_2m}</span>
        </div>

        {addedCitiesData.length > 1 && addedCitiesList[index] !== currentCity && <button>
          <svg viewBox="0 0 448 512" fill="white" width="20px" height="20px"><path d="M170.5 51.6L151.5 80l145 0-19-28.4c-1.5-2.2-4-3.6-6.7-3.6l-93.7 0c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80 368 80l48 0 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-8 0 0 304c0 44.2-35.8 80-80 80l-224 0c-44.2 0-80-35.8-80-80l0-304-8 0c-13.3 0-24-10.7-24-24S10.7 80 24 80l8 0 48 0 13.8 0 36.7-55.1C140.9 9.4 158.4 0 177.1 0l93.7 0c18.7 0 36.2 9.4 46.6 24.9zM80 128l0 304c0 17.7 14.3 32 32 32l224 0c17.7 0 32-14.3 32-32l0-304L80 128zm80 64l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg>
        </button>}
      </li>
    )
  })

  return (
    <ul className={styles.addedCitiesList} onClick={onClick}>
        {listElements}
    </ul>
  )

}