"use client";

import { useUser } from "@clerk/clerk-react";
import { UserButton, SignInButton } from "@clerk/clerk-react";
import { Button } from "./ui/button";

const Navbar = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="flex justify-between p-4">
      <h1 className="md:text-xl text-lg font-bold">AI Chat</h1>

      {isSignedIn ? (
        <UserButton showName />
      ) : (
        <SignInButton mode="modal">
          <Button>Get Started</Button>
        </SignInButton>
      )}
    </div>
  );
};

export default Navbar;
