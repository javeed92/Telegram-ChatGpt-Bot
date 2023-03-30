export const getOneMonthLaterDate = () => {
  // Get the current date
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const nextMonth = (month + 1) % 12;
  const yearOfNextMonth = year + Math.floor((month + 1) / 12);
  const lastDayOfMonth = new Date(yearOfNextMonth, nextMonth, 0).getDate();
  const day = Math.min(date.getDate(), lastDayOfMonth);
  return new Date(yearOfNextMonth, nextMonth, day);
};
