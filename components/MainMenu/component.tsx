"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { allProjects } from "@/.contentlayer/generated";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import "./styles.css";
import { Separator } from "../ui/separator";

const navigationOptions: {
  title: string;
  href: string;
  description: string;
}[] = [
  {
    title: "Home",
    href: "/",
    description: "The homepage.",
  },
  {
    title: "Experiences",
    href: "/experiences",
    description: "Learn more about my work.",
  },
  {
    title: "Projects",
    href: "/projects",
    description: "My projects.",
  },
  {
    title: "Weekly Journal",
    href: "/weekly_journal",
    description: "My weekly journal.",
  },
];

export function MainMenu() {
  return (
    <NavigationMenu className="card">
      <NavigationMenuList>
        {navigationOptions.map((option, i, arr) => (
          <>
            <NavigationMenuItem key={i}>
              <Link href={option.href} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {option.title}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            {i < arr.length - 1 && (
              <Separator orientation="vertical" className="h-4" />
            )}
          </>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
