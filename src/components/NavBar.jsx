import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  House as Home,
  TelevisionSimple as TVShows,
  FilmSlate as Movies,
} from "@phosphor-icons/react";
import netflixLogo from "../assets/netflix-icon.png";

const navLinks = [
  { content: "Home", path: "", icon: Home },
  { content: "TV Shows", path: "tv", icon: TVShows },
  { content: "Movies", path: "movie", icon: Movies },
];

const NavBar = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`${
        isSticky ? "bg-black" : "bg-inherit"
      } fixed z-40 flex h-[68px] w-full items-center justify-between bg-opacity-90 px-4 transition-colors md:px-12 lg:px-16`}
    >
      <div className="flex items-center justify-between">
        <Link to="/" aria-label="Netflix">
          <img
            src={netflixLogo}
            alt="Netflix Logo"
            className="mr-6 w-20 cursor-pointer sm:w-[94px]"
          />
        </Link>
        <ul className="header-nav">
          {navLinks.map((navLink, index) => {
            const Icon = navLink.icon;
            return (
              <li key={index}>
                <Link
                  className="flex flex-col items-center justify-center text-[10px] font-medium text-light-gray transition-colors duration-300 hover:text-dark-gray md:mr-3 md:text-base md:font-normal lg:mr-5"
                  to={`/${navLink.path}`}
                >
                  <Icon
                    className="cursor-pointer md:hidden"
                    size={24}
                    weight="bold"
                  />
                  {navLink.content}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <button className="mr-4 cursor-pointer text-sm font-normal text-white transition-colors duration-500 hover:text-white-hover sm:mr-6 md:mr-3  md:text-base lg:mr-6">
          Sign In
        </button>
        <button className="cursor-pointer rounded bg-red-main px-4 py-2 text-sm text-white transition-colors duration-500 hover:bg-red-main/80 sm:px-6 md:text-base">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default NavBar;
