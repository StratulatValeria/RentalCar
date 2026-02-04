import Image from "next/image";
import css from "./VehicleCard.module.css";
import type { Vehicle } from "@/types/vehicle";
import { useVehicleStore } from "@/store/useVehicleStore";
import { formatMileage } from "@/lib/utils";
import Link from "next/link";

export const VehicleCard = ({ vehicle }: { vehicle: Vehicle }) => {
  const { favorites, toggleFavorite } = useVehicleStore();
  const isFavorite = favorites.includes(vehicle.id);

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
              href={isFavorite ? "/Icons.svg#Love-blue" : "/Icons.svg#Love"}
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
      <Link href={`/catalog/${vehicle.id}`} className={css.link}>
        <button className={css.btn}>Read more</button>
      </Link>
    </div>
  );
};
