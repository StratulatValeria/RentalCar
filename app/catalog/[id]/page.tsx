"use client";
import { useParams } from "next/navigation";
import { useVehicleStore } from "@/store/useVehicleStore";
import { formatMileage } from "@/lib/utils";
import css from "./VehicleDetails.module.css";
import Image from "next/image";

export default function VehicleDetailsPage() {
  const { id } = useParams();
  const { vehicles } = useVehicleStore();

  const vehicle = vehicles.find((v) => v.id === id);
  if (!vehicle) {
    return <div className={css.notFound}>Car not found.</div>;
  }
  return (
    <div className={css.container}>
      <div className={css.contentWrapper}>
        <Image
          src={vehicle.img}
          alt={vehicle.brand}
          className={css.mainImage}
        ></Image>
        <div className={css.info}>
          <h2>
            {vehicle.brand} {vehicle.model}, {vehicle.year}
          </h2>
          <p className={css.price}>${vehicle.rentalPrice}</p>

          <div className={css.specs}>
            <span>{vehicle.address.split(",")[1]?.trim()}</span>
            <span>{vehicle.address.split(",")[2]?.trim()}</span>
            <span> {id}</span>
            <span>Mileage: {formatMileage(vehicle.mileage)} km</span>
          </div>
          {/* <BookingForm carId={vehicle.id} /> */}
        </div>
      </div>
    </div>
  );
}
