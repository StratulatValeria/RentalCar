"use client";
import Select, { components, DropdownIndicatorProps } from "react-select";
import css from "./page.module.css";
import { StylesConfig, GroupBase } from "react-select";

interface SelectOption {
  value: string;
  label: string;
}
const brands: SelectOption[] = [
  { value: "buick", label: "Buick" },
  { value: "volvo", label: "Volvo" },
  { value: "bmw", label: "BMW" },
  { value: "chevrolet", label: "Chevrolet" },
  { value: "chrysler", label: "Chrysler" },
  { value: "aston Martin", label: "Aston Martin" },
  { value: "audi", label: "Audi" },
  { value: "bentley", label: "Bentley" },
  { value: "gmc", label: "GMC" },
  { value: "hummer", label: "HUMMER" },
];
const prices: SelectOption[] = [];
for (let i = 30; i <= 150; i += 10) {
  prices.push({ value: i.toString(), label: i.toString() });
}
const customStyles: StylesConfig<
  SelectOption,
  false,
  GroupBase<SelectOption>
> = {
  control: (base) => ({
    ...base,
    backgroundColor: "#F7F7FB",
    border: "none",
    borderRadius: "14px",
    height: "48px",
    boxShadow: "none",
    cursor: "pointer",
    display: "flex",
    paddingLeft: "8px",
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "0 8px",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#121417",
    fontSize: "18px",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#121417",
    fontSize: "18px",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#FFFFFF",
    borderRadius: "14px",
    padding: "14px 8px 14px 18px",
    marginTop: "4px",
    boxShadow: "0px 4px 36px 0px rgba(0, 0, 0, 0.02)",
    border: "1px solid rgba(18, 20, 23, 0.05)",
    zIndex: 100,
    width: "204px",
  }),
  menuList: (base) => ({
    ...base,
    maxHeight: "272px",
    padding: "0",
    "&::-webkit-scrollbar": {
      width: "8px",
      display: "block",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(18, 20, 23, 0.05)",
      borderRadius: "10px",
    },
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: "transparent",
    color: state.isSelected ? "#121417" : "rgba(18, 20, 23, 0.2)",
    fontSize: "16px",
    fontWeight: "500",
    lineHeight: "1.25",
    cursor: "pointer",
    padding: "4px 0",
    transition: "color 0.2s ease",
    "&:active": { backgroundColor: "transparent" },
    "&:hover": {
      color: "#121417",
    },
  }),
};

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

export default function CatalogPage() {
  return (
    <section className={css.catalogSection}>
      <div className={css.container}>
        <form className={css.filterForm}>
          <div className={css.filterGroup}>
            <label className={css.label}>Car brand</label>

            <Select
              options={brands}
              placeholder="Choose a brand"
              classNamePrefix="custom-select"
              styles={customStyles}
              components={{
                DropdownIndicator: CustomIndicator,
                IndicatorSeparator: () => null,
              }}
            />
          </div>
          {/* cena */}
          <div className={css.filterGroup}>
            <label className={css.label}>Price / 1 hour</label>
            <Select
              options={prices}
              placeholder="Choose a price"
              classNamePrefix="custom-select"
              styles={customStyles}
              components={{
                DropdownIndicator: CustomIndicator,
                IndicatorSeparator: () => null,
              }}
            />
          </div>
          {/* probeg */}
          <div className={css.filterGroup}>
            <label className={css.label}>Car mileage / km</label>
            <div className={css.mileageInputs}>
              <div className={css.inputWrapper}>
                <span className={css.inputLabel}>From</span>
                <input type="text" className={css.inputLeft} />
              </div>
              <div className={css.inputWrapper}>
                <span className={css.inputLabel}>To</span>
                <input type="text" className={css.inputRight} />
              </div>
            </div>
          </div>
          <button type="submit" className={css.searchBtn}>
            {" "}
            Search
          </button>
        </form>
      </div>
    </section>
  );
}
