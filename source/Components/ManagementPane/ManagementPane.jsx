import * as styles from './managementPane.module.scss'

import { ManagementPaneHat } from "../ManagementPaneHat/ManagementPaneHat"
import { SearchInput } from "../SearchForm/SearchForm"
import { AddedCitiesList } from '../AddedCitiesList/AddedCitiesList'
import { SearchResultsList } from '../searchResultsList/searchResultsList'

import { useState } from 'react'


export function ManagementPane({setIsOpenPane, setData, data}) {

    const [isSearching, setIsSearching] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [response, setResponse] = useState(null);

    return (
        <div className={styles.managementPane}>
            <ManagementPaneHat setIsOpenPane={setIsOpenPane} />
            <SearchInput
              isSearching={isSearching}
              setIsSearching={setIsSearching}
              isTyping={isTyping}
              setIsTyping={setIsTyping}
              setResponse={setResponse}
            />
            {isSearching ? 
              <SearchResultsList
                data={data}
                searchResults={response}
                setData={setData}
                setIsOpenPane={setIsOpenPane}
              /> : 
              <AddedCitiesList 
                data={data}
                setData={setData}
                setIsOpenPane={setIsOpenPane}
              />}
        </div>
    )
}