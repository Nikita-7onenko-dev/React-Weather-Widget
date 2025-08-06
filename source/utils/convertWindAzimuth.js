// Для текста
export function convertWindAzimuth(data, isShortMode) {
    if(data >= 337.5 || data < 22.5) return isShortMode ? "C" : "Северный";
    else if (data >= 22.5 && data < 67.5) return isShortMode ? "C-B" : "Северо-восточный";
    else if (data >= 67.5 && data < 112.5) return isShortMode ? "B" : "Восточный";
    else if (data >= 112.5 && data < 157.5 ) return isShortMode ? "Ю-В" : "Юго-восточный";
    else if (data >= 157.5 && data < 202.5) return isShortMode ? "Ю" : "Южный";
    else if (data >= 202.5 && data < 247.5) return isShortMode ? "Ю-З" : "Юго-западный";
    else if (data >= 247.5 && data < 292.5) return isShortMode ? "З" : "Западный";
    else if (data >= 292.5 && data < 337.5) return isShortMode ? "С-З" : "Северо-западный";
}

// Для иконок, все 360 градусов
export function getIconFromWindAzimuth(data) {
    return `wi-wind from-${Math.round(data)}-deg`
}