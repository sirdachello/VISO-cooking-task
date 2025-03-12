import { Link, Outlet } from "react-router";
import ThemeController from "./ThemeController";

export default function Layout() {
  return (
    <>
      <header>
        <div className="navbar bg-base-300 shadow-sm gap-3 justify-between px-6">
          <nav className="flex gap-3">
            <Link to={"/recipes"} className="btn btn-primary text-xl">
              Home
            </Link>
            <Link to={"/recipes/favorite"} className="btn btn-primary text-xl">
              Favorites
            </Link>
          </nav>
          <ThemeController />
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="flex justify-center bg-base-300 p-4">
        <button className="btn btn-primary ">
          <a
            href="https://github.com/sirdachello"
            target="_blank"
            rel="noreferrer"
          >
            &copy; Valentine Kliuchev
          </a>
        </button>
      </footer>
    </>
  );
}
