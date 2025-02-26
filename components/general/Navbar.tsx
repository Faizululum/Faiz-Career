import Image from "next/image";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { auth } from "@/app/utils/auth";
import UserDropdown from "./UserDropdown";

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="flex items-center justify-between py-5">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.svg" alt="Logo" width={40} height={40} />
        <h1 className="text-2xl font-bold">
          Faiz<span className="text-primary">Career</span>
        </h1>
      </Link>

      {/* Navbar Desktop */}
      <div className="hidden md:flex items-center gap-5">
        <ThemeToggle />
        <Link href="/post-job" className={buttonVariants({ size: "lg" })}>
          Post Job
        </Link>
        {session?.user ? (
          <UserDropdown email={session.user.email as string} name={session.user.name as string} image={session.user.image as string} />
        ) : (
          <Link href="/login" className={buttonVariants({ size: "lg", variant: "outline" })}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
