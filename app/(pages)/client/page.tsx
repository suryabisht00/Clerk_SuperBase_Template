// client side code
"use client";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const ClientPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    redirect("/sign-in"); // use when you are using isPublicRoute in middleware.ts
    // return null; // use when you are using isProtectedRoute in middleware.ts
  }
  return (
    <div className="h-full flex flex-col items-center justify-center text-2xl">
      Hello, {user.firstName} welcome to Templete
    </div>
  );
};

export default ClientPage;

