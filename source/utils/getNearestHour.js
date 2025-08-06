export function getNearestHour(time) {
    // Округлить до ближайшего часа для расчета времени восхода/заката
      const rounded = new Date(time);
      if(rounded.getMinutes() >= 30) {
          rounded.setMinutes(60, 0);
      } else {
          rounded.setMinutes(0, 0, 0)
      } 
      return rounded.getHours();
}