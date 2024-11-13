import React, { createContext, useState, useEffect, useContext } from "react";
import { onAuthStateChanged, User, signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "../lib/firebaseConfig";
import { useRouter } from "next/navigation";

interface UserContextType {
  user: User | null;
  signOut: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (!user) {
        router.push("/welcome"); // Redirect to welcome page if no user is logged in
      }
    });
    return () => unsubscribe();
  }, [router]);

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUser(null); // Explicitly set user to null in context
    router.push("/welcome"); // Redirect after sign-out
  };

  return <UserContext.Provider value={{ user, signOut }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
