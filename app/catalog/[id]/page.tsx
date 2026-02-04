"use client";
import { useParams } from "next/navigation";
import { useVehicleStore } from "@/store/useVehicleStore";
import { formatMileage } from "@/lib/utils";
import css from "./VehicleDetails.module.css";
import Image from "next/image";
import { BookingForm } from "@/components/BookingForm/BookingForm";
import { useEffect } from "react";
import { formatId } from "@/lib/utils";

export default function VehicleDetailsPage() {
  const { id } = useParams();
  const { vehicles, fetchVehicles, isLoading } = useVehicleStore();

  const vehicle = vehicles.find((v) => v.id === id);
  useEffect(() => {
    if (!vehicle && id) {
      fetchVehicles();
    }
  }, [vehicle, id, fetchVehicles]);
  if (isLoading && !vehicle) {
    return <div className={css.loader}>Loading car details...</div>;
  }
  if (!vehicle) {
    return <div className={css.notFound}>Car not found.</div>;
  }

  return (
    <div className={css.container}>
      <div className={css.contentWrapper}>
        <div className={css.imageSide}>
          <div className={css.imageThumb}>
            <Image
              src={vehicle.img}
              alt={`${vehicle.brand} ${vehicle.model}`}
              width={640}
              height={512}
              className={css.mainImage}
              priority
            />
          </div>
          <BookingForm carId={vehicle.id} />
        </div>

        <div className={css.infoSide}>
          <div className={css.headerBlock}>
            <h2 className={css.title}>
              {vehicle.brand} {vehicle.model}, {vehicle.year}
            </h2>
            <span className={css.idLabel}>Id: {formatId(vehicle.id)}</span>
          </div>

          <div className={css.addressBlock}>
            <div className={css.addressMeta}>
              <svg className={css.iconMicro} width="16" height="16">
                <use href="/Icons.svg#Location" />
              </svg>
              <span>
                {vehicle.address.split(",")[1]?.trim()},{" "}
                {vehicle.address.split(",")[2]?.trim()}
              </span>
            </div>

            <div className={css.mileageMeta}>
              <span>Mileage: {formatMileage(vehicle.mileage)} km</span>
            </div>
          </div>

          <p className={css.price}>${vehicle.rentalPrice}</p>
          <p className={css.description}>{vehicle.description}</p>

          <h3 className={css.subTitle}>Rental Conditions:</h3>
          <ul className={css.conditionsList}>
            {vehicle.rentalConditions.map((item: string, index: number) => {
              const parts = item.split(/(\d+)/);
              return (
                <li key={index} className={css.listItem}>
                  <svg className={css.iconCheck} width="16" height="16">
                    <use href="/Icons.svg#VectorO" />
                  </svg>
                  <span>
                    {parts.map((part, i) =>
                      /^\d+$/.test(part) ? (
                        <span key={i} className={css.accent}>
                          {part}
                        </span>
                      ) : (
                        part
                      ),
                    )}
                  </span>
                </li>
              );
            })}
          </ul>

          <h3 className={css.subTitle}>Car Specifications:</h3>
          <ul className={css.specsListVertical}>
            <li className={css.listItem}>
              <svg className={css.iconSpec} width="16" height="16">
                <use href="/Icons.svg#Calendar" />
              </svg>
              <span>Year: {vehicle.year}</span>
            </li>
            <li className={css.listItem}>
              <svg className={css.iconSpec} width="16" height="16">
                <use href="/Icons.svg#Car" />
              </svg>
              <span>Type: {vehicle.type}</span>
            </li>
            <li className={css.listItem}>
              <svg className={css.iconSpec} width="16" height="16">
                <use href="/Icons.svg#Oil" />
              </svg>
              <span>Fuel: {vehicle.fuelConsumption}</span>
            </li>
            <li className={css.listItem}>
              <svg className={css.iconSpec} width="16" height="16">
                <use href="/Icons.svg#Setting" />
              </svg>
              <span>Engine: {vehicle.engineSize}</span>
            </li>
          </ul>

          <h3 className={css.subTitle}>Accessories and functionalities:</h3>
          <ul className={css.accessoriesGrid}>
            {[...vehicle.accessories, ...vehicle.functionalities].map(
              (item, index) => (
                <li key={index} className={css.accessoryItem}>
                  <svg className={css.iconCheck} width="16" height="16">
                    <use href="/Icons.svg#VectorO" />
                  </svg>
                  <span>{item}</span>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
