export const formatMileage = (mileage: number): string => {
  const value = typeof mileage === "string" ? parseInt(mileage, 10) : mileage;
  if (isNaN(value)) return "0";
  return value.toLocaleString("ru-RU").replace(",", ".");
};
