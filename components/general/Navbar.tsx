import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-5">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.svg" alt="Logo" width={40} height={40} />
        <h1 className="text-2xl font-bold">
          Faiz<span className="text-primary">Career</span>
        </h1>
      </Link>
      <div className="flex items-center gap-4">
        <ThemeToggle />
          <Button>Login</Button>
      </div>
    </nav>
  );
};

export default Navbar;
