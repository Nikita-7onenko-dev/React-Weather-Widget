import * as styles from './searchForm.module.scss';

import { Button } from "../Button/Button";
import { SearchIcon } from "./SearchIcon/SearchIcon";

import { fetchCoords } from '../../utils/fetchData';

import { useRef } from "react";

export function SearchInput({isSearching, setIsSearching, isTyping, setIsTyping, setResponse}) {

  const inputRef = useRef(null);
  const typingTimeoutId = useRef(null);

  async function querySubmit(query) {
    const data = await fetchCoords(query);
    if(data) {
      setResponse(data);
    }
  }

  function onInputTyping(e) {
    const query = e.target.value;

    if(!isTyping) {
      setIsTyping(true);
    }

    if(typingTimeoutId.current) {
      clearTimeout(typingTimeoutId.current)
    }

    typingTimeoutId.current = setTimeout( () => {
      setIsTyping(false);

      if(!isSearching) return;
      querySubmit(query);

    }, 600);
  }

  async function onSubmit(e) {
    e.preventDefault();
    const query = e.target[0].value;
    querySubmit(query);
  }


  function focusHandler() {
    setIsSearching(true);
  }

  function onCancel() {
    inputRef.current.value = "";
    setIsSearching(false);
  }

  return (
    <form className={styles.searchForm} onSubmit={onSubmit}>
      {isTyping ? <SearchIcon isAnimate={true}/> : <SearchIcon />}
      <input
        type="text"
        placeholder="Введите местоположение"
        ref={inputRef}
        onChange={onInputTyping}
        onFocus={focusHandler}
      /> 
      {isSearching && <Button onClick={onCancel}>Отмена</Button>}
    </form>
  )
}