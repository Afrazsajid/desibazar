"use client";

import React from "react";
import Link from "next/link";
import { useUser, ClerkLoaded, SignInButton, UserButton } from "@clerk/nextjs";
import { Menu, ShoppingCart , PackageIcon} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Searchform from "./ui/searchform";
import useBasketStore from "@/stores/store";


// Define props type for dynamic button highlighting
interface NavbarProps {
  highlightedItem: "home" | "pricing" | "category" | "cart" | "login" | "signup" | "about" | "contact";
}

const Navbar: React.FC<NavbarProps> = ({ highlightedItem }) => {
  const { user, isSignedIn } = useUser();

  // A function to check if the current item is the highlighted one
  const getButtonClass = (item: string) =>
    highlightedItem === item ? "bg-webprimary text-white" : "text-gray-800 hover:bg-gray-200";

  const groupedItemsLength = useBasketStore((state) => state.getGroupedItems().length);

  return (
    <nav className="bg-white shadow-md sticky w-full top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between h-14">
        {/* Logo / Home */}
        <div className="text-lg font-bold text-gray-800">Desi Bazar</div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center flex-grow max-w-xl ">
          <Searchform />
        </div>

        {/* Buttons (Visible on Desktop) */}
        <div className="hidden md:flex space-x-4 items-center gap-2">
          {/* <Link href="/" className={`px-4 py-2 rounded-lg ${getButtonClass("home")}`}>
            Home
          </Link> */}

          <ClerkLoaded>
            {isSignedIn ? (
              <>
              <div className=" flex gap-2 justify-center items-center  text-sm "><UserButton />  Welcome <div className="font-bold">{user.fullName}</div></div>
              
                <Link href="/myorders" className="relative">
                
                <PackageIcon size={30} />

            <span className="absolute bottom-0 right-0 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              1
            </span>
                </Link>
                
              </>
            ) : (
              <SignInButton>
                <button
                  className={`px-4 py-2 rounded-lg ${getButtonClass("login")} border border-gray-300`}
                >
                  Sign In
                </button>
              </SignInButton>
            )}
          </ClerkLoaded>

          <Link href="/cart" className="relative">
            <ShoppingCart size={30} />
            <span className="absolute bottom-0 right-0 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {groupedItemsLength}
            </span>
          </Link>
        </div>

     {/* Mobile Menu */}
<div className="md:hidden flex items-center gap-2">
  <Popover>
    <PopoverTrigger asChild>
      <button className="focus:outline-none flex items-center p-2 rounded-md">
        <Menu size={30} className="text-gray-800" />
      </button>
    </PopoverTrigger>
    <PopoverContent className="p-4 bg-white shadow-lg rounded-lg w-56">
      <div className="space-y-4">
        <Link
          href="/"
          className={`block w-full text-left px-4 py-2 rounded-lg ${getButtonClass("home")}`}
        >
          Home
        </Link>
        <Link
          href="/category"
          className={`block w-full text-left px-4 py-2 rounded-lg ${getButtonClass("category")}`}
        >
          Category
        </Link>
     
      </div>
    </PopoverContent>
  </Popover>

  {/* Cart Icon with Badge */}
  <Link href="/cart" className="relative">
    <ShoppingCart size={30} className="text-gray-800" />
    <span className="absolute bottom-0 right-0 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
      8
    </span>
  </Link>

  {/* Conditional User Button or Sign In */}
  <ClerkLoaded>
    {isSignedIn ? (
      <>
       <Link href="/myorders" className="relative">
                
                <PackageIcon size={30} />

            <span className="absolute bottom-0 right-0 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              1
            </span>
                </Link>
        <UserButton />
       
      </>
    ) : (
      <SignInButton>
        <button
          className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-secondary transition"
        >
          Sign In
        </button>
      </SignInButton>
    )}
  </ClerkLoaded>
</div>
      </div>

      {/* Search Bar (Visible on small screens) */}
      <div className="md:hidden px-4 py-2 bg-gray-100">
        <Searchform />
      </div>
    </nav>
  );
};

export default Navbar;
