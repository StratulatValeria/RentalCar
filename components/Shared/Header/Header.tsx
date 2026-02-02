import { Logo } from "../Logo/Logo";
import css from "./Header.module.css";
import Link from "next/link";

export const Header = () => {
  return (
    <header className={css.headerContainer}>
      <Logo />
      <nav className={css.nav}>
        <Link className={css.navLink} href="/">
          Home
        </Link>
        <Link className={css.navLink} href="/catalog">
          Catalog
        </Link>
      </nav>
    </header>
  );
};
