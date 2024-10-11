import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-[rgba(0,0,0,0.7)] p-4" style={{backgroundColor: ''}}>
      <div className="mb-2 text-center">
        <Link href="/">
          <img
            src="/logo.png"
            alt="Logo"
            className="mx-auto"
            style={{ maxWidth: "150px" }}
          />
        </Link>
      </div>
      <nav className="text-center">
        <Link href="/" className="mx-4 text-white hover:underline">
          Home
        </Link>
        <Link href="/pokedex" className="mx-4 text-white hover:underline">
          Pokedex
        </Link>
      </nav>
    </header>
  );
}
