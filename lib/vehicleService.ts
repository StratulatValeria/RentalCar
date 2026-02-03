import { api } from "./api";
import type { Vehicle, VehiclesResponse } from "@/types/vehicle";

export interface VehicleFilters {
  brand?: string;
  price?: string;
  mileageFrom?: string;
  mileageTo?: string;
}

export const getVehicles = async (
  page: number,
  filters: VehicleFilters,
): Promise<VehiclesResponse> => {
  const { data } = await api.get<VehiclesResponse>("/cars", {
    params: {
      page,
      limit: 12,
      brand: filters.brand || undefined,
      rentalPrice: filters.price || undefined,
      minMileage: filters.mileageFrom || undefined,
      maxMileage: filters.mileageTo || undefined,
    },
  });
  return data;
};
export const getFilterMetadata = async () => {
  const { data } = await api.get<VehiclesResponse | Vehicle[]>("/cars");
  const carsArray: Vehicle[] = Array.isArray(data) ? data : data.cars || [];
  if (carsArray.length === 0) {
    return { brands: [], maxPrice: 150 };
  }
  const brands: string[] = Array.from(
    new Set(carsArray.map((v) => v.brand)),
  ).sort();
  const maxPrice: number = Math.max(
    ...carsArray.map((v) => Number(v.rentalPrice) || 0),
  );
  return { brands, maxPrice };
};
