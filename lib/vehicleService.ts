import { api } from "./api";
import type { Vehicle, VehiclesResponse} from "@/types/vehicle";

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
