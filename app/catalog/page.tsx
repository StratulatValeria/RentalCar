"use client";

import { useEffect } from "react";
import { useVehicleStore } from "@/store/useVehicleStore";
import { VehicleCard } from "@/components/VehicleCard/VehicleCard";
import { FilterBar } from "@/components/FilterBar/FilterBar";
import css from "./page.module.css";

export default function CatalogPage() {
  const { vehicles, isLoading, hasMore, fetchVehicles } = useVehicleStore();

  useEffect(() => {
    fetchVehicles(true);
  }, []);

  return (
    <section className={css.catalogSection}>
      <div className={css.container}>
        <FilterBar />

        <div className={css.grid}>
          {vehicles?.map((car) => (
            <VehicleCard key={car.id} vehicle={car} />
          ))}
        </div>

        {isLoading && <div className={css.loader}>Loading...</div>}

        {hasMore && !isLoading && (
          <button
            className={css.loadMoreBtn}
            onClick={() => fetchVehicles(false)}
          >
            Load More
          </button>
        )}
      </div>
    </section>
  );
}
