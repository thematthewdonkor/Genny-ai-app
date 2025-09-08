"use client";

import { useUser } from "@clerk/clerk-react";
import { UserButton, SignInButton } from "@clerk/clerk-react";

import { Button } from "./ui/button";

const Navbar = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">AI Chat</h1>

        {isSignedIn ? (
          <UserButton showName />
        ) : (
          <SignInButton mode="modal">
            <Button>Get Started</Button>
          </SignInButton>
        )}
      </div>
    </div>
  );
};

export default Navbar;
