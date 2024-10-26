import { useEffect, useState } from "react"
import {Avatar} from "@nextui-org/react";
import { useStorage } from "@plasmohq/storage/hook"
import {
  useNavigate,
  Routes,
  Route,
  MemoryRouter
} from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignUp,
  useClerk,
  useUser,
  ClerkProvider,
} from "@clerk/chrome-extension";

function HelloUser() {
  const { isSignedIn, user } = useUser();
  const clerk = useClerk();

  if (!isSignedIn) {
    return null;
  }

  return (
    <>
      <p>Hi, {user.primaryEmailAddress?.emailAddress}!</p>
      <p>
        <button onClick={() => clerk.signOut()}>Sign out</button>
      </p>
    </>
  );
}

const publishableKey = process.env.PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY || "";

export function Header() {



  return (
    <ClerkProvider publishableKey={publishableKey}>
      <div className="App">
        <header className="App-header">
          <p>Welcome to Clerk Chrome Extension Starter!</p>
          <a
            className="App-link"
            href="https://clerk.dev/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more about Clerk
          </a>
        </header>
        <main className="App-main">
          <SignUp signInUrl="/" />
          <SignedIn>
                  <HelloUser />
                </SignedIn>
                <SignedOut>
                  <SignIn afterSignInUrl="/" signUpUrl="/sign-up" />
                </SignedOut>

        </main>
      </div>
    </ClerkProvider>
  );
}