"use client";

import { useEffect, useState } from "react";
import { useVehicleStore } from "@/store/useVehicleStore";
import { VehicleCard } from "@/components/VehicleCard/VehicleCard";
import { FilterBar } from "@/components/FilterBar/FilterBar";
import css from "./page.module.css";
import Loader from "@/components/Loader/Loader";

export default function CatalogPage() {
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { vehicles, isLoading, hasMore, fetchVehicles } = useVehicleStore();

  useEffect(() => {
    fetchVehicles(true);
  }, [fetchVehicles]);

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    try {
      await fetchVehicles(false);
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <section className={css.catalogSection}>
      <div className={css.catalogContainer}>
        <FilterBar />
        {isLoading && vehicles.length === 0 && (
          <div className={css.centeredLoader}>
            <Loader />
          </div>
        )}
        {!isLoading && vehicles.length === 0 && (
          <div className={css.noResults}>
            <p>
              No cars found matching your filters. Try changing your search
              criteria!
            </p>
          </div>
        )}
        <div className={css.grid}>
          {vehicles?.map((car) => (
            <VehicleCard key={car.id} vehicle={car} />
          ))}
        </div>

        {isLoading && vehicles.length > 0 && (
          <div className={css.bottomLoader}>
            <Loader />
          </div>
        )}
        {hasMore && !isLoading && (
          <button
            className={css.loadMoreBtn}
            onClick={handleLoadMore}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? "Loading..." : "Load More"}
          </button>
        )}
      </div>
    </section>
  );
}
