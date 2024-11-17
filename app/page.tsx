"use client";

import {
  allPages,
  allProjects,
  allExperiences,
} from "@/.contentlayer/generated";
import { Mdx } from "@/components/mdx-components";
import { CommitInfo, cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { LinkHover } from "@/components/link-hover";
import { Separator } from "@/components/ui/separator";
import { WideCard } from "@/components/wide-card";
import { IconCard } from "@/components/icon-card";
import { SmallCard } from "@/components/small-card";
import Link from "next/link";
import { useFetch } from "usehooks-ts";

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <a
        ref={ref}
        className={cn(
          "block select-none space-y-1 p-3 border-gray-200 leading-none no-underline outline-none transition-colors item-hover item-outline",
          className
        )}
        {...props}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </a>
    </li>
  );
});
ListItem.displayName = "ListItem";

const ListRole = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { avatar: React.ReactNode }
>(({ className, title, children, avatar, ...props }, ref) => {
  return (
    <a
      ref={ref}
      className={cn(
        "block select-none space-y-1 p-3 leading-none no-underline outline-none transition-colors item-hover item-outline",
        className
      )}
      {...props}
    >
      <div className="flex items-center space-x-2">
        {avatar}
        <div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
          <div className="text-sm font-medium leading-none">{title}</div>
        </div>
      </div>
    </a>
  );
});
ListRole.displayName = "ListRole";

export default function Home() {
  const highlightOrganizaitons = [
    "BX Coding",
    "Verse",
    "Tufts University Center for Engineering Education and Outreach",
    "LittleSeed",
  ];
  const highlightedExperiences = allExperiences.filter((experience) =>
    highlightOrganizaitons.includes(experience.organization)
  );

  const aboutArticle = allPages.filter((page) => page.title === "About")[0];

  const repoCommitApiUrl =
    "https://api.github.com/repos/DuncanAJohnson/duncanajohnson.com/commits?per_page=1";

  const { data, error } = useFetch<CommitInfo[]>(repoCommitApiUrl);

  return (
    <div className="prose dark:prose-invert space-y-6 flex flex-col items-center w-full h-full pb-10">
      <div className="my-5">
        <div className="flex flex-row card bg-background max-w-[580px] mx-auto">
          <div className="relative w-[300px] h-[300px]">
            <Image
              src="/headshot.png"
              alt="headshot"
              fill
              style={{
                objectFit: "contain",
              }}
            />
          </div>
          <div className="flex flex-col justify-center p-10 pl-10 max-sm:pl-10 h-full">
            <p>
              <span className="text-6xl font-black text-theme-gradient">
                Duncan Johnson
              </span>
            </p>
            <p>
              <span className="text-xl">
                Educator and Social Impact Entrepreneur
              </span>
            </p>
          </div>
        </div>
        <p className="text-sm italic text-muted-foreground my-1 bg-background">{`Last Updated: ${
          data
            ? new Date(data[0].commit.author.date).toLocaleDateString()
            : "-----"
        }`}</p>
      </div>
      <article className="bg-background">
        <Mdx code={aboutArticle.body.code} />
      </article>
      <div className="flex flex-col h-full sm:grid sm:grid-cols-3 sm:grid-rows-3 sm:gap-4">
        <WideCard
          className="col-span-2 row-span-2"
          experience={highlightedExperiences[0]}
          featurePhoto="/BXCoding-Feature.jpeg"
          content="Co-founded BX Coding, a 501(c)(3) computing education non-profit that has taught 500+ students in the STEM fields."
        />
        <IconCard
          className="col-span-1 row-span-3"
          experience={highlightedExperiences[2]}
        />
        <SmallCard
          className="sm:col-span-1 sm:row-span-1 max-sm:h-16"
          experience={highlightedExperiences[1]}
        />
        <SmallCard
          className="sm:  col-span-1 sm:row-span-1 max-sm:h-16"
          experience={highlightedExperiences[3]}
        />
      </div>
      <Link href="/experiences">
        <Button>All Experiences</Button>
      </Link>
    </div>
  );
}
