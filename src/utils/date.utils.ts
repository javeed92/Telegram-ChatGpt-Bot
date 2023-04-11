export const getSpesifiedMonthLaterDate = (monthsToAdd: number = 1,from: Date = new Date()) => {
  // Get the current date
  const date = from;
  const year = date.getFullYear();
  const month = date.getMonth();
  const nextMonth = (month + monthsToAdd) % 12;
  const yearOfNextMonth = year + Math.floor((month + monthsToAdd) / 12);
  const lastDayOfMonth = new Date(yearOfNextMonth, nextMonth, 0).getDate();
  const day = Math.min(date.getDate(), lastDayOfMonth);
  return new Date(yearOfNextMonth, nextMonth, day);
};
