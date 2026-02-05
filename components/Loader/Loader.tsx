import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={css.loadingWindow}>
      <div className={css.car}>
        <div className={css.strike}></div>
        <div className={css.strike + " " + css.strike2}></div>
        <div className={css.strike + " " + css.strike3}></div>
        <div className={css.strike + " " + css.strike4}></div>
        <div className={css.strike + " " + css.strike5}></div>
        <div className={`${css.carDetail} ${css.spoiler}`}></div>
        <div className={`${css.carDetail} ${css.back}`}></div>
        <div className={`${css.carDetail} ${css.center}`}></div>
        <div className={`${css.carDetail} ${css.center1}`}></div>
        <div className={`${css.carDetail} ${css.front}`}></div>
        <div className={`${css.carDetail} ${css.wheel}`}></div>
        <div className={`${css.carDetail} ${css.wheel} ${css.wheel2}`}></div>
      </div>
      <div className={css.text}>
        <span>Loading</span>
        <span className={css.dots}>...</span>
      </div>
    </div>
  );
};
export default Loader;
