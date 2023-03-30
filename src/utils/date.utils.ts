export const getOneMonthLaterDate = () => {
  // Get the current date
  const currentDate = new Date();

  // Get the month and year of the current date
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Add one month to the current date
  const oneMonthLater = new Date(currentYear, currentMonth + 1);

  return oneMonthLater
};
