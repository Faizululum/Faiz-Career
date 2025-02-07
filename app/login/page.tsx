import LoginForm from "@/components/forms/LoginForm";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <div className="w-full max-w-sm flex gap-6 flex-col">
        <Link href="/" className="flex items-center gap-2 self-center">
            <Image src="/logo.svg" alt="Logo" width={40} height={40} />
            <h1 className="text-2xl font-bold">Faiz<span className="text-primary">Career</span></h1> 
        </Link>

        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
