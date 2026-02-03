"use client";
import { useMemo, useEffect, useState } from "react";
import Select, { components, DropdownIndicatorProps } from "react-select";
import { useVehicleStore } from "@/store/useVehicleStore";
import { customStyles, SelectOption } from "./SelectConfig";
import css from "./FilterBar.module.css";

const CustomIndicator = (
  props: DropdownIndicatorProps<SelectOption, false>,
) => {
  const isOpen = props.selectProps.menuIsOpen;
  return (
    <components.DropdownIndicator {...props}>
      <svg width="13" height="7">
        <use href={`/Icoms.svg#${isOpen ? "Up" : "Down"}`}></use>
      </svg>
    </components.DropdownIndicator>
  );
};

export const FilterBar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const {
    allBrands,
    maxPriceInRange,
    fetchFilterMetadata,
    fetchVehicles,
    setFilter,
  } = useVehicleStore();

  useEffect(() => {
    setIsMounted(true);

    fetchFilterMetadata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchFilterMetadata]);

  const brands = useMemo(() => {
    return allBrands.map((b) => ({ value: b, label: b }));
  }, [allBrands]);

  const prices = useMemo(() => {
    const opts = [];
    for (let i = 30; i <= maxPriceInRange; i += 10) {
      opts.push({ value: i.toString(), label: i.toString() });
    }
    return opts;
  }, [maxPriceInRange]);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchVehicles(true);
  };

  if (!isMounted) {
    return <div style={{ height: "80px" }} />;
  }

  return (
    <form className={css.filterForm} onSubmit={onSearch}>
      <div className={css.filterGroup}>
        <label className={css.label}>Car brand</label>
        <Select
          options={brands}
          placeholder="Choose a brand"
          classNamePrefix="custom-select"
          styles={customStyles}
          onChange={(opt) => setFilter("brand", opt?.value || "")}
          components={{
            DropdownIndicator: CustomIndicator,
            IndicatorSeparator: () => null,
          }}
        />
      </div>

      <div className={css.filterGroup}>
        <label className={css.label}>Price / 1 hour</label>
        <Select
          options={prices}
          placeholder="Choose a price"
          classNamePrefix="custom-select"
          styles={customStyles}
          onChange={(opt) => setFilter("price", opt?.value || "")}
          formatOptionLabel={(option, { context }) =>
            context === "value" ? `To $${option.label}` : option.label
          }
          components={{
            DropdownIndicator: CustomIndicator,
            IndicatorSeparator: () => null,
          }}
        />
      </div>

      <div className={css.filterGroup}>
        <label className={css.label}>Car mileage / km</label>
        <div className={css.mileageInputs}>
          <input
            type="text"
            placeholder="From"
            onChange={(e) => setFilter("mileageFrom", e.target.value)}
            className={css.inputLeft}
          />
          <input
            type="text"
            placeholder="To"
            onChange={(e) => setFilter("mileageTo", e.target.value)}
            className={css.inputRight}
          />
        </div>
      </div>

      <button type="submit" className={css.searchBtn}>
        Search
      </button>
    </form>
  );
};
