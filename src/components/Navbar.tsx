"use client";
import Image from "next/image";
import { assets } from "@/assets/assets";
import React, { useRef, useState, useEffect } from "react";
import { ubuntu } from "@/utils/font";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Currently in the client component importing global icons doesn't work, 
// so icons should be imported individually;

import {
  faBars,
  faXmark,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";

type NavLink = {
  id: number;
  title: string;
  href: string;
}

// Navigation items
const navLinks: NavLink[] = [
  { id: 1, title: "Home", href: "/" },
  { id: 2, title: "All Doctors", href: "/doctors" },
  { id: 3, title: "About", href: "/about" },
  { id: 4, title: "Contact", href: "/contact" },
  { id: 5, title: "Admin", href: "/admin" },
];

const Navbar:React.FC = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const pathName = usePathname();


  // CLICK-OUTSIDE-LISTENER
  const menuRef = useRef<HTMLDivElement | null>(null); //=> the profile menu is refrenced
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // when the profile menu is opened, then confirm the profile menu is not detecting this click, means it must be outside of the profile menu.
      // mean our target ref object not containing this click, then close the menu
      if (
        menuRef.current &&
        !(menuRef.current as Node).contains(event.target as Node)
      ) {
        setShowProfile(false);
      }
    };
    // add the outside event listener when the profile menu is opened
    if (showProfile) {
      document.addEventListener("click", handleClickOutside);
    }

    // when the profile menu is closed then remove unnecessary listeners
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showProfile]);

  return (

    // fixing the navbar at the top 
    // first this first=> root layout given the relative position
    // by giving the fixed position it will become out of the flow 
    // with position it should be given where should be the navbar fixed like top:0;
    // that's why width property is given.
    // bg-shold be white, otherwise it becomes transparent
    // z-index should given max otherwise some content show above it, for example next image.
    // then last the first element of any content must be given a top margin otherwise it will be hidden behind the navbar

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
                    pathName === navlink.href && "border-b border-custom-red text-custom-red"
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
            {showProfile && 
          <div
            className={`${
              showProfile
                ? " opacity-100 scale-100 transition ease-out duration-100"
                : " opacity-0 scale-95 transition ease-in duration-75"
            } transition transform absolute top-14 right-14 shadow-md py-3 flex flex-col profile-dropdown-shadow w-60 z-20 bg-white rounded text-sm`}
          >
            <Link
              className="hover:bg-gray-100 px-2 py-3 font-medium"
              href={"/signup"}
            >
              Sign up
            </Link>
            <Link className="hover:bg-gray-100 px-2 py-3" href={"/login"}>
              Log in
            </Link>
          </div>
          }
        </div>

        {/*  Mobile menue */}
        <button
          onClick={() => setShowMenu((prev) => !prev)}
          className="rounded md:hidden p-4"
          aria-controls="mobile-menu"
          aria-expanded={showMenu}
        >
          {/* Somehow the second one is using in the smooth transition, it can not be deleted from hear
          at all a frame is being developed that is making the transition
          */}
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
          // transition property is the shorthand for the transition-property transition-duration transition-function transition-delay
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
              {/* Childrens sit on the top of the parent, this is the style  heirarchy of element . */}
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
            <li onClick={() => setShowMenu(false)}>
              <Link href={"/login"}>Login</Link>
            </li>
            <li onClick={() => setShowMenu(false)}>
              <Link href={"/signup"}>Create Account</Link>
            </li>

            {navLinks.map((link) => {
              return (
                <li key={link.id} onClick={() => setShowMenu(false)} className={`${pathName === link.href && "border-b border-custom-red text-custom-red"}`}>
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

{
  /* <div
            className={`${
              showProfile ? "block" : "hidden"
            } absolute top-14 right-14 shadow-md py-3 flex flex-col profile-dropdown-shadow w-60 z-20 bg-white rounded text-sm`}
          > */
}

// the above version of the navbar is well optimized
// {/* Mobile menue button */}
// {/* in the hidden class display= none, mean the whole block is removed */}
// {/* visiblity: hidden; hide the element but space reserved, display:none; remove the element completly and does not reserve the space */}
// <FontAwesomeIcon
//   onClick={() => setShowMenu(true)}
//   icon={faBars}
//   className="h-6 w-6 md:hidden fixed top-4 right-4"
// />

// {/* Designing Mobile menue */}
// <div
//   className={`md:hidden ${
//     showMenue ? "fixed w-full" : "h-0 w-0"
//   } right-0 top-0 bottom-0 bg-white overflow-hidden  z-20 transition-all`}
// >

//   {/* another way to transition */}
// {/* <div className={`md:hidden fixed top-0 right-0 bottom-0 overflow-hidden z-20 bg-white transition-transform duration-300  ${showMenue ? 'translate-x-0 w-full' : 'translate-x-full w-0'}`}> */}

//   {/*position-fixed right-0 top-0 bottom-0 ensures the div covers the entire right side of the screen. */}
//   {/* as showMenu true then from right side to take the whole screen and transition will be done by right to left */}

//   {/*Note: Since the element is not in the DOM, transitions will not work (because the browser doesn’t animate hidden elements). */}
//   {/* it means to perform transition the element must be in the dom */}

//   {/*fixed w-full right-0 top-0 bottom-0 bg-white => these classes makes the screen full size */}
//   {/* top-0 bottom-0 → Stretches the element from the top to the bottom. */}
//   {/* inset is the shorthand for top right bottom left */}
//   {/* inset-0 is used to make the element wider to the screen */}
//   <div className="flex justify-between items-center wrapper">
//     {/* logo */}
//     <div className="flex gap-2 items-center font-bold hover:cursor-pointer">
//       <Image
//         src={assets.logo}
//         alt="Logo.png"
//         height={40}
//         width={40}
//         className=""
//       />
//       <div className={`${ubuntu.className} text-custom-red`}>
//         CareMate
//       </div>
//     </div>
//     {/* Menu icon */}
//     <FontAwesomeIcon
//       onClick={() => setShowMenu(false)}
//       icon={faXmark}
//       className="h-6 w-6"
//     />
//   </div>
//   {/* Menu navigation links */}
//   <div className="">
//       <ul className="flex flex-col mt-5 items-center gap-2 font-medium text-lg">
//         <Link className="px-4 py-2 rounded" onClick={() => setShowMenu(false)} href={'/login'}> Login</Link>
//         <Link className="px-4 py-2 rounded" onClick={() => setShowMenu(false)} href={'/signup'}> Signup</Link>
//         <Link className="px-4 py-2 rounded" onClick={() => setShowMenu(false)} href={'/'}> Home</Link>
//         <Link className="px-4 py-2 rounded" onClick={() => setShowMenu(false)} href={'/doctors'}>All Doctors</Link>
//         <Link className="px-4 py-2 rounded" onClick={() => setShowMenu(false)} href={'/about'}>About</Link>
//         <Link className="px-4 py-2 rounded" onClick={() => setShowMenu(false)} href={'/contact'}>Contact</Link>
//         <Link className="px-4 py-2 rounded" onClick={() => setShowMenu(false)} href={'/admin'}>Admin</Link>
//       </ul>
//   </div>
// </div>
