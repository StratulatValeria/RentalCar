import Image from "next/image";
import css from "./VehicleCard.module.css";
import type { Vehicle } from "@/types/vehicle";
import { useVehicleStore } from "@/store/useVehicleStore";

export const VehicleCard = ({ vehicle }: { vehicle: Vehicle }) => {
  const { favorites, toggleFavorite } = useVehicleStore();
  const isFavorite = favorites.includes(vehicle.id);
  return (
    <div className={css.card}>
      <div className={css.imageWrapper}>
        <Image src={vehicle.img} alt={vehicle.brand} fill className={css.img} />
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
        <div className={css.header}>
          <h2 className={css.title}>
            {vehicle.brand} <span className={css.accent}>{vehicle.model}</span>,{" "}
            {vehicle.year}
          </h2>
          <span className={css.price}>{vehicle.rentalPrice}</span>
        </div>
      </div>

      <div className={css.details}>
        <p className={css.tags}>
          <span>{vehicle.address.split(",")[1]}</span>
          <span>{vehicle.address.split(",")[2]}</span>
          <span>{vehicle.rentalCompany}</span>
          <span>{vehicle.mileage.toLocaleString("ru-RU")} km</span>
          <span>{vehicle.type}</span>
          <span>{vehicle.brand}</span>
          <span>{vehicle.id}</span>
          <span>{vehicle.functionalities[0]}</span>
        </p>
      </div>
      <button className={css.btn}>Learn more</button>
    </div>
  );
};
