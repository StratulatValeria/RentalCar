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
      <div className={css.container}>
        <FilterBar />
        {isLoading && vehicles.length === 0 && (
          <div className={css.centeredLoader}>
            <Loader />
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
          <button className={css.loadMoreBtn} onClick={handleLoadMore}>
            Load More
          </button>
        )}
      </div>
    </section>
  );
}
