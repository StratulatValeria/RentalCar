import Image from "next/image";
import css from "./VehicleCard.module.css";
import type { Vehicle } from "@/types/vehicle";
import { useVehicleStore } from "@/store/useVehicleStore";
import { formatMileage } from "@/lib/utils";

export const VehicleCard = ({ vehicle }: { vehicle: Vehicle }) => {
  const { favorites, toggleFavorite } = useVehicleStore();
  const isFavorite = favorites.includes(vehicle.id);
  const addressParts = vehicle.address.split(",");
  const city = addressParts[1]?.trim();
  const country = addressParts[2]?.trim();
  return (
    <div className={css.card}>
      <div className={css.imageWrapper}>
        <Image
          src={vehicle.img}
          alt={vehicle.brand}
          fill
          className={css.img}
          sizes="(max-width: 768px) 100vw, 274px"
        />
        <button
          type="button"
          className={css.favoriteBtn}
          onClick={() => toggleFavorite(vehicle.id)}
        >
          <svg width="16" height="15" className={css.icon}>
            <use
              href={isFavorite ? "/Icoms.svg#Love-blue" : "/Icoms.svg#Love"}
            ></use>
          </svg>
        </button>
      </div>
      <div className={css.content}>
        <div className={css.info}>
          <div className={css.header}>
            <h2 className={css.title}>
              {vehicle.brand}{" "}
              <span className={css.accent}>{vehicle.model}</span>,{" "}
              {vehicle.year}
            </h2>
            <span className={css.price}>${vehicle.rentalPrice}</span>
          </div>
        </div>

        <div className={css.details}>
          <div className={css.tagsRow}>
            <span>{vehicle.address.split(",")[1]?.trim()}</span>
            <span>{vehicle.address.split(",")[2]?.trim()}</span>
            <span>{vehicle.rentalCompany}</span>
          </div>
          <div className={css.tagsRow}>
            <span>{vehicle.type}</span>
            <span>{formatMileage(vehicle.mileage)} km</span>
          </div>
        </div>
      </div>
      <button className={css.btn}>Read more</button>
    </div>
  );
};
