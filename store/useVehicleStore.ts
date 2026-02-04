import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Vehicle } from "@/types/vehicle";
import {
  getVehicles,
  VehicleFilters,
  getFilterMetadata,
} from "@/lib/vehicleService";

interface VehicleState {
  allBrands: string[];
  maxPriceInRange: number;
  vehicles: Vehicle[];
  favorites: string[];
  isLoading: boolean;
  page: number;
  hasMore: boolean;
  filters: VehicleFilters;

  fetchVehicles: (isNewSearch?: boolean) => Promise<void>;
  fetchFilterMetadata: () => Promise<void>;
  setFilter: (filterName: string, value: string) => void;
  toggleFavorite: (vehicleId: string) => void;
  resetVehicles: () => void;
}

export const useVehicleStore = create<VehicleState>()(
  persist(
    (set, get) => ({
      vehicles: [],
      favorites: [],
      allBrands: [],
      maxPriceInRange: 150,
      isLoading: false,
      page: 1,
      hasMore: true,
      filters: {
        brand: "",
        price: "",
        mileageFrom: "",
        mileageTo: "",
      } as VehicleFilters,
      fetchFilterMetadata: async () => {
        try {
          const { brands, maxPrice } = await getFilterMetadata();

          set({
            allBrands: brands,
            maxPriceInRange: maxPrice,
          });
        } catch (error) {
          if (error instanceof Error) {
            console.error("Metadata error:", error.message);
          }
        }
      },
      setFilter: (name, value) =>
        set((state) => ({
          filters: { ...state.filters, [name]: value },
        })),

      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((favId) => favId !== id)
            : [...state.favorites, id],
        })),

      resetVehicles: () => set({ vehicles: [], page: 1, hasMore: true }),

      fetchVehicles: async (isNewSearch = false) => {
        const nextPage = isNewSearch ? 1 : get().page;
        if (isNewSearch) {
          set({ vehicles: [], page: 1, hasMore: true });
        }

        set({ isLoading: true });

        try {
          const { filters } = get();

          const sanitizedFilters = {
            ...filters,
            mileageFrom:
              filters.mileageFrom?.toString().replace(/\s/g, "") || "",
            mileageTo: filters.mileageTo?.toString().replace(/\s/g, "") || "",
          };

          const response = await getVehicles(nextPage, sanitizedFilters);

          const fetchedCars = Array.isArray(response.cars) ? response.cars : [];
          const total = response.totalCars || 0;

          set((state) => {
            const newVehicles = isNewSearch
              ? fetchedCars
              : [...state.vehicles, ...fetchedCars];

            return {
              vehicles: newVehicles,
              page: nextPage + 1,
              hasMore: newVehicles.length < total,
            };
          });
        } catch (error) {
          console.error("Помилка завантаження:", error);
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "vehicle-storage",
      partialize: (state) => ({ favorites: state.favorites }),
    },
  ),
);
