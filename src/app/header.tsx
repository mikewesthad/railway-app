"use client";

import Image from "next/image";
import styles from "./header.module.css";
import Link from "next/link";
import { MdPerson } from "react-icons/md";
import { useUser } from "@auth0/nextjs-auth0";
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from "@/components/Dropdown";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();
  const { user, isLoading } = useUser();

  const isLoggedIn = user && !isLoading;
  const image =
    isLoggedIn && user.picture ? (
      // Don't try to optimize images served from user-defined URLs.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={user.picture}
        alt={user.name || "User avatar"}
        className={styles.avatar}
        width={32}
        height={32}
      />
    ) : (
      <MdPerson className={styles.icon} />
    );

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/">
          <Image src="/railway-logo.svg" alt="Railway" width={32} height={32} priority />
        </Link>
        <Dropdown>
          <DropdownButton>{image}</DropdownButton>
          <DropdownMenu placement="bottom end">
            {isLoggedIn ? (
              <DropdownItem onAction={() => router.push("/auth/logout")}>Log out</DropdownItem>
            ) : (
              <DropdownItem onAction={() => router.push("/auth/login")}>Log in</DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>
      </div>
    </header>
  );
}
