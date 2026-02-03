import { StylesConfig, GroupBase } from "react-select";

export interface SelectOption {
  value: string;
  label: string;
}

export const customStyles: StylesConfig<
  SelectOption,
  false,
  GroupBase<SelectOption>
> = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "var(--inputs)",
    border: "none",
    borderRadius: "14px",
    height: "44px",
    width: String(state.selectProps.placeholder).includes("price")
      ? "196px"
      : "204px",
    boxShadow: "none",
    cursor: "pointer",
    display: "flex",
    paddingLeft: "8px",
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "0",
    margin: "0",
    whiteSpace: "nowrap",
    display: "flex",
    overflow: "hidden",
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
  menu: (base, state) => ({
    ...base,
    backgroundColor: "#FFFFFF",
    borderRadius: "14px",
    padding: "14px 8px 14px 18px",
    marginTop: "4px",
    boxShadow: "0px 4px 36px 0px rgba(0, 0, 0, 0.02)",
    border: "1px solid rgba(18, 20, 23, 0.05)",
    zIndex: 100,
    width: String(state.selectProps.placeholder).includes("price")
      ? "196px"
      : "204px",
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
