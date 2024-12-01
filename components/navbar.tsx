import {
  Button,
  Kbd,
  Link,
  Input,
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
  link as linkStyles,
} from "@nextui-org/react";
import NextLink from "next/link";
import clsx from "clsx";
import { auth, logout } from "@/src/firebase/authentication";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  LogOutIcon, 
} from "@/components/icons";
import { NexusLogo } from "@/components/icons";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getUserType } from "@/src/firebase/getData";

export const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userType, setUserType] = useState(0);
  const route = useRouter();

  const logOut = () => {
    logout(route);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      setLoggedIn(!!user);
    });

    const fetchUserType = async () => {
      const type = await getUserType()
      setUserType(type)
    }

    fetchUserType()

    return () => {
      unsubscribe();
    };
  }, []);

  const navItems = siteConfig.navItems.filter((item) => {
    if (loggedIn && item.hideWhenLoggedIn) return false;
    if (item.usuarioAdm && userType !== 1) return false
    return !item.requiresAuth || (item.requiresAuth && loggedIn);
  });

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <NexusLogo />
            <p className="font-bold text-inherit text-violet-700">INC</p>
          </NextLink>
        </NavbarBrand>
        <div className="hidden lg:flex gap-4 justify-start ml-2">
          {navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
          {loggedIn && (
            <Button onClick={logOut} className="hover:cursor-pointer">
              <LogOutIcon />
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
        {loggedIn && (
          <Button onClick={logOut} className="hover:cursor-pointer">
            <LogOutIcon />
          </Button>
        )}
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {navItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <NextLink href={item.href}>{item.label}</NextLink>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
