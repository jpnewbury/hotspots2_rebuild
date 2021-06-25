import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/index";

export default function Layout({ children }) {
  const [user, { mutate }] = useCurrentUser();
  const handleLogout = async () => {
    await fetch("/api/auth", {
      method: "DELETE",
    });
    mutate(null);
  };
  return (
    <>
      <Head>
        <title>Hot Spots for Trout</title>
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta
          name="description"
          content="A citizen science program by Roaring Fork Conservancy."
        />
        <meta property="og:title" content="Hot Spots for Trour" />
        <meta property="og:description" content="A data gathering app." />
        {/* <meta
          property="og:image"
          content="https://repository-images.githubusercontent.com/201392697/5d392300-eef3-11e9-8e20-53310193fbfd"
        /> */}
      </Head>
      <header>
        <nav>
          <div className="stack">
            <div>
              <Link href="/">
                <a>
                  <h1>Hot Spots for Trout</h1>
                </a>
              </Link>
            </div>
            <div>
              <h4>A citizen science program by Roaring Fork Conservancy</h4>
            </div>
          </div>
          <div>
            {!user ? (
              <>
                <Link href="/login">
                  <button>Log In </button>
                </Link>
                &nbsp; &nbsp;
                <Link href="/signup">
                  <button>Register</button>
                </Link>
              </>
            ) : (
              <>
                {/* <Link href={`/user/${user._id}`}>
                  <button>My Journal</button>
                </Link> */}
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <button onClick={handleLogout}>Logout</button>
              </>
            )}
          </div>
        </nav>
      </header>
      <main>{children}</main>
      <div className="center">
        <footer className="footer">© 2021 Roaring Fork Conservancy</footer>
      </div>
    </>
  );
}
