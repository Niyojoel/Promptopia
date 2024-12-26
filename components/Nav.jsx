"use client"

import { useState, useEffect } from "react"
import { DB } from "@data/db";
import Link from "next/link";
import Image from "next/image";
import {signOut, useSession} from "next-auth/react";
import { nav } from "@data/content";
import { SignIn } from "@components/SignIn";

const Nav = () => {
  const {data: session} = useSession();
  const {userDB} = DB();

  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(()=> {
    window.addEventListener("resize", () => {setToggleDropdown(false)});
  }, [])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image src={nav.logo} width={30} height={30} alt="Promptopia logo" className="object-contain"/>
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" className="outline_btn" onClick={signOut}>
              Sign Out
            </button>
            <Link href="/profile">
              <Image src={session?.user?.image || userDB.image} alt="profile-img" width={37} height={37} className="rounded-full"/>
            </Link>
          </div>
          ): (
          <SignIn/>
        )}
      </div>

      {/* Mobile navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image src={session?.user?.image || userDB.image} alt="profile-img" width={37} height={37} className="rounded-full" onClick={()=> setToggleDropdown(dropdown => !dropdown)}/>

            {toggleDropdown && (
              <div className="dropdown">
                <Link href="/profile" className="dropdown_link w-full border-b text-right" onClick={()=> setToggleDropdown(false)}>
                  My Profile
                </Link>
                <Link href="/create-prompt" className="dropdown_link mt-1 w-full border-b text-right" onClick={()=> setToggleDropdown(false)}>
                  Create Prompt
                </Link>
                <button type="button" className="mt-5 black_btn" onClick={()=> {
                  setToggleDropdown(false);
                  signOut();
                  }}>
                    Sign Out
                </button>
              </div>
            )}
          </div>
          ): (
          <SignIn/>
        )}
      </div>
    </nav>
  )
}

export default Nav