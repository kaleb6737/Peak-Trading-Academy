// src/app/Components/LoginNavBar.tsx

"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const LoginNavBar = () => {
  const { data: session } = useSession();

  return (
    <nav className="flex items-center justify-between bg-backgroundBlack p-6 text-softWhite">
      <div className="text-xl font-bold text-accentWarmYellow">
        <Link href="/">Peak Trader Academy</Link>
      </div>

      <div className="space-x-4">
        {session ? (
          <>
            <span className="text-softWhite">Welcome, {session.user?.name || "User"}</span>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 bg-accentWarmYellow text-backgroundBlack rounded hover:bg-foreground transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => signIn("google")}
              className="px-4 py-2 bg-accentWarmYellow text-backgroundBlack rounded hover:bg-foreground transition"
            >
              Login
            </button>
            <button
              onClick={() => signIn("google")}
              className="px-4 py-2 bg-accentWarmYellow text-backgroundBlack rounded hover:bg-foreground transition"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default LoginNavBar;
