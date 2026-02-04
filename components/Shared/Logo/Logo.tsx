import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/" className="logo-link">
      <svg width="104" height="16">
        <use href="/Icons.svg#Logo"></use>
      </svg>
    </Link>
  );
};
