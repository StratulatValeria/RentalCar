export const formatMileage = (mileage: number): string => {
  const value = typeof mileage === "string" ? parseInt(mileage, 10) : mileage;
  if (isNaN(value)) return "0";
  return value.toLocaleString("ru-RU").replace(",", ".");
};

export const formatId = (id: string): string => {
  if (!id) return "";

  const numbersOnly = id.replace(/\D/g, "");
  return numbersOnly.slice(0, 4);
};
