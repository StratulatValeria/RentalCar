import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Vehicle } from "@/types/vehicle";
import { getVehicles, VehicleFilters } from "@/lib/vehicleService";

interface VehicleState {
  vehicles: Vehicle[];
  favorites: string[];
  isLoading: boolean;
  page: number;
  hasMore: boolean;
  filters: VehicleFilters;

  fetchVehicles: (isNewSearch?: boolean) => Promise<void>;
  setFilter: (filterName: string, value: string) => void;
  toggleFavorite: (vehicleId: string) => void;
  resetVehicles: () => void;
}

export const useVehicleStore = create<VehicleState>()(
  persist(
    (set, get) => ({
      vehicles: [],
      favorites: [],
      isLoading: false,
      page: 1,
      hasMore: true,
      filters: {
        brand: "",
        price: "",
        mileageFrom: "",
        mileageTo: "",
      } as VehicleFilters,
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
        if (isNewSearch) {
          set({ vehicles: [], page: 1, hasMore: true });
        }

        set({ isLoading: true });
        try {
          const response = await getVehicles(get().page, get().filters);
          const fetchedCars = Array.isArray(response.cars) ? response.cars : [];
          const total = response.totalCars || 0;
         set((state) => ({
            vehicles: isNewSearch ? fetchedCars : [...state.vehicles, ...fetchedCars],
            page: state.page + 1,
            hasMore: (isNewSearch ? fetchedCars.length : state.vehicles.length + fetchedCars.length) < total,
          }));
        } catch (error) {
          console.error(error);
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
