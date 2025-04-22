"use client";
import Image from "next/image";
import { assets } from "@/assets/assets";
import React, { useRef, useState, useEffect } from "react";
import { ubuntu } from "@/utils/font";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import {
  faBars,
  faXmark,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import {
  signOut,
  // useSession
} from "next-auth/react";
import { useAuthContext } from "@/hooks/useAuthContext";

type NavLink = {
  id: number;
  title: string;
  href: string;
};

// Navigation items
const navLinks: NavLink[] = [
  { id: 1, title: "Home", href: "/" },
  { id: 2, title: "All Doctors", href: "/doctors" },
  { id: 3, title: "About", href: "/about" },
  { id: 4, title: "Contact", href: "/contact" },
];
// { id: 5, title: "Admin", href: "/admin" },

const Navbar: React.FC = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const pathName = usePathname();

  const sessionData = useAuthContext();

  // LOGGOUT
  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();

    await signOut();
  };

  // CLICK-OUTSIDE-LISTENER
  const menuRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !(menuRef.current as Node).contains(event.target as Node)
      ) {
        setShowProfile(false);
      }
    };
    // ADDING OUTSIDE EVENT LISTENER
    if (showProfile) {
      document.addEventListener("click", handleClickOutside);
    }
    // REMOVING THE OUTSIDE EVENT LISTENER
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showProfile]);

  return (
    <div className="fixed top-0 w-full bg-white z-50">
      <div className="wrapper flex justify-between items-center border-b border-b-gray-300">
        {/* logo */}
        <div className="flex gap-2 items-center font-bold hover:cursor-pointer">
          <Image
            src={assets.logo}
            alt="Logo.png"
            height={40}
            width={40}
            className=""
          />

          <div className={`${ubuntu.className} text-custom-red`}>CareMate</div>
        </div>
        <div className="hidden md:block">
          <ul className="flex gap-4 hover:cursor-pointer font-medium">
            {navLinks.map((navlink: NavLink) => {
              return (
                <li
                  key={navlink.id}
                  className={`hover:text-custom-red ${
                    pathName === navlink.href &&
                    "border-b border-custom-red text-custom-red"
                  }`}
                >
                  <Link href={navlink.href}>{navlink.title}</Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={menuRef}>
          {/*Referencing the element*/}
          <button
            onClick={() => setShowProfile((prev) => !prev)}
            className="rounded-full border px-8 py-3 hover:shadow-lg hidden md:block text-gray-600"
          >
            <div className="flex justify-center items-center gap-4">
              <FontAwesomeIcon icon={faBars} className="h-4 w-4" />
              <FontAwesomeIcon icon={faCircleUser} className="h-7 w-7" />
            </div>
          </button>
          {showProfile && (
            <div
              className={`${
                showProfile
                  ? " opacity-100 scale-100 transition ease-out duration-100"
                  : " opacity-0 scale-95 transition ease-in duration-75"
              } transition transform absolute top-14 right-14 shadow-md py-3 flex flex-col profile-dropdown-shadow w-60 z-20 bg-white rounded text-sm`}
            >
              {sessionData?.user ? (
                <>
                  <div className="hover:bg-gray-100  font-medium">
                    <Link
                      className="w-full block px-2 py-3"
                      href={"/"}
                      aria-disabled={true}
                    >
                      {sessionData?.user.name}
                    </Link>
                  </div>

                  <div className="hover:bg-gray-100  font-medium">
                    <Link
                      className="w-full block px-2 py-3"
                      href={"/my-appointments"}
                      aria-disabled={true}
                    >
                      My Appointments
                    </Link>
                  </div>

                  <form onSubmit={handleLogout}>
                    <button
                      type="submit"
                      className="w-full text-start hover:bg-gray-100 px-2 py-3"
                      // onClick={() => setShowProfile(false)}
                    >
                      Sign Out
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <div
                    className="hover:bg-gray-100  font-medium"
                    onClick={() => setShowProfile(false)}
                  >
                    <Link className="w-full block px-2 py-3" href={"/signup"}>
                      Sign up
                    </Link>
                  </div>

                  <div
                    className="hover:bg-gray-100  font-medium"
                    onClick={() => setShowProfile(false)}
                  >
                    <Link className="w-full block px-2 py-3" href={"/login"}>
                      Log in
                    </Link>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/*  Mobile menue */}
        <button
          onClick={() => setShowMenu((prev) => !prev)}
          className="rounded md:hidden p-4"
          aria-controls="mobile-menu"
          aria-expanded={showMenu}
        >
          {showMenu ? (
            <FontAwesomeIcon icon={faXmark} className="h-6 w-6" />
          ) : (
            <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
          )}
        </button>

        {/* mobile menue */}
        <div
          id="mobile-menu"
          className={`md:hidden ${
            showMenu ? "opacity-100 visible" : "opacity-0 invisible"
          } fixed inset-0 overflow-hidden z-2 bg-white transition-all duration-300 ease-in-out pt-[11px]`}
        >
          {/* Navbar Mobile menu opened */}
          <div className="wrapper flex justify-between items-center">
            <div className="flex gap-2 items-center font-bold hover:cursor-pointer">
              <Image
                src={assets.logo}
                alt="Logo.png"
                height={40}
                width={40}
                className=""
              />
              <div className={`${ubuntu.className} text-custom-red`}>
                CareMate
              </div>
            </div>
            {/* x mark button */}
            <button
              onClick={() => setShowMenu((prev) => !prev)}
              className="rounded md:hidden mr-4"
            >
              <FontAwesomeIcon icon={faXmark} className="h-6 w-6" />
            </button>
          </div>
          {/* Navigation Links */}
          <ul className="flex flex-col items-center gap-4 font-medium text-lg mt-10">
            {sessionData?.user ? (
              <form onSubmit={handleLogout}>
                <button
                  type="submit"
                  className="w-full text-start hover:bg-gray-100 px-2 py-3"
                  onClick={() => setShowMenu(false)}
                >
                  Sign Out
                </button>
              </form>
            ) : (
              <li onClick={() => setShowMenu(false)}>
                <Link href={"/login"}>Login</Link>
              </li>
            )}

            {sessionData?.user ? (
              <li onClick={() => setShowMenu(false)}>
                <Link href={"/my-appointments"}>My appointments</Link>
              </li>
            ) : (
              <li onClick={() => setShowMenu(false)}>
                <Link href={"/signup"}>Create Account</Link>
              </li>
            )}

            {navLinks.map((link) => {
              return (
                <li
                  key={link.id}
                  onClick={() => setShowMenu(false)}
                  className={`${
                    pathName === link.href &&
                    "border-b border-custom-red text-custom-red"
                  }`}
                >
                  <Link href={link.href}>{link.title}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

