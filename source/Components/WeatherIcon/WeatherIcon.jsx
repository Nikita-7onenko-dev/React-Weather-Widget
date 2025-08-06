import { useEffect, useState } from "react";
import {ClipLoader}  from "react-spinners";

export function WeatherIcon({name, customClassName, sizePx}) {

    const [isFontLoaded, setIsFontLoaded] = useState(false)

    useEffect(() => {
        document.fonts
            .load(`${sizePx || '28px'} WeatherIcons`)
            .then(() => setIsFontLoaded(true))
    },[sizePx])

    if(!isFontLoaded){
        return <ClipLoader color="#FFF" size={sizePx} />
    } else {
        return (
            <i className={`wi ${name} ${customClassName || ""}`} style={{fontSize: sizePx}}></i>
        )
    }
}