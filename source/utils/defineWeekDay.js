export function defineWeekDay(date, isShortMode) {

    let daysOfWeek = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
    
    if(isShortMode) {
        daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
    }

    return daysOfWeek[getEuroDay( new Date(date).getDay() )];
}

function getEuroDay(date) {
    return (date === 0) ? 6 : date - 1

}