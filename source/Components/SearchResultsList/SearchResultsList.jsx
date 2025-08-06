
import * as styles from './searchResultsList.module.scss';

import { fetchWeather } from '../../utils/fetchData'

export function SearchResultsList({data, searchResults, setData, setIsOpenPane}) {

  let searchResultsElements;

  if(Array.isArray(searchResults) && searchResults.length) {

    searchResultsElements = searchResults.map( (searchRes, index) => (
      <li key={index} data-search-index={index} className={styles.searchResultsElement}>
        {searchRes.name}
        {searchRes.country && ", " + searchRes.country}
        {searchRes.admin1 && ", " + searchRes.admin1}
        {searchRes.admin2 && ", " + searchRes.admin2}
      </li>
    ))
  } else {
    searchResultsElements = <p>Ничего не найдено</p>
  }

  async function onClick(e) {
    if(e.target.tagName !== "LI") return;

    const index = e.target.dataset.searchIndex;
    const weatherData = await fetchWeather(searchResults[index].latitude, searchResults[index].longitude);
    const newCity = searchResults[index].name
    
    if(weatherData) {
      const newData = {
        ...data,
        currentCity: newCity,
          addedCities: {
            ...data.addedCities,
            [newCity]: weatherData
          }
      }
      setData(newData)
      setIsOpenPane(false);
    }
  }

  return (
      <ul className={styles.searchResultsList} onClick={onClick}>
          {searchResultsElements}
      </ul>
  )

}