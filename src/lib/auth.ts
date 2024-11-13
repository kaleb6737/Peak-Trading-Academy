// src/lib/auth.ts

import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "/Volumes/HACKED_SQL/peak-trader-academy/src/lib/firebaseConfig";


export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Error during sign-in", error);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error during logout", error);
  }
};
