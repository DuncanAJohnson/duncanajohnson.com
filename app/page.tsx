"use client";

import {
  allPages,
  allExperiences,
  allProjects,
  Project,
} from "@/.contentlayer/generated";
import { Mdx } from "@/components/mdx-components";
import { CommitInfo, youtubeId } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon, PlayIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useFetch } from "usehooks-ts";

// "MM/YYYY" -> sortable number
const monthValue = (date: string) => {
  const [month, year] = date.split("/").map(Number);
  return year * 12 + month;
};

const yearRange = (startDate: string, endDate?: string) => {
  const start = startDate.split("/")[1];
  const end = endDate ? endDate.split("/")[1] : "Present";
  return start === end ? start : `${start} – ${end}`;
};

// Days since the daily builds started, counted in the viewer's timezone
const daysBuilding = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(2026, 8, 1);
  return Math.round((today.getTime() - start.getTime()) / 86_400_000);
};

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 inline-flex rounded-full border bg-background px-3 py-1 text-xs font-semibold uppercase tracking-widest text-foreground/70 shadow-sm">
      {children}
    </h2>
  );
}

function ProjectTile({ project }: { project: Project }) {
  const videoId = youtubeId(project.video);
  const href = project.link?.trim() || project.video;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group card overflow-hidden flex flex-col hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-video bg-muted overflow-hidden">
        {videoId && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
          <span className="rounded-full bg-white/90 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <PlayIcon className="w-5 h-5 text-slate-900" />
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold leading-snug">{project.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {project.description}
        </p>
      </div>
    </a>
  );
}

export default function Home() {
  const previousOrganizations = [
    "BX Coding",
    "Verse",
    "Tufts University CEEO",
    "LittleSeed",
  ];
  const previousExperiences = previousOrganizations.flatMap((organization) =>
    allExperiences.filter((experience) => experience.organization === organization)
  );

  const recentProjects = [...allProjects]
    .sort((a, b) => monthValue(b.startDate) - monthValue(a.startDate))
    .slice(0, 4);

  const aboutArticle = allPages.filter((page) => page.title === "About")[0];

  const repoCommitApiUrl =
    "https://api.github.com/repos/DuncanAJohnson/duncanajohnson.com/commits?per_page=1";

  const { data } = useFetch<CommitInfo[]>(repoCommitApiUrl);

  // Set after mount so the statically rendered HTML doesn't pin the count
  const [days, setDays] = useState<number | null>(null);
  useEffect(() => setDays(daysBuilding()), []);

  return (
    <div className="flex flex-col gap-16 sm:gap-20 w-full max-w-3xl mx-auto pt-8 sm:pt-12 pb-10">
      {/* Hero */}
      <section className="card relative overflow-hidden p-8 sm:p-12 flex flex-col-reverse sm:flex-row sm:items-center gap-8 sm:gap-12 bg-gradient-to-br from-card via-card to-slate-100 dark:to-slate-800/60">
        <div className="flex-1">
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-theme-gradient pb-1">
            Duncan Johnson
          </h1>
          <p className="mt-3 text-xl sm:text-2xl font-medium text-muted-foreground">
            Building tools for teachers
          </p>
          <div className="mt-6 space-y-3 text-base leading-relaxed [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-muted-foreground/40 hover:[&_a]:decoration-current">
            <Mdx code={aboutArticle.body.code} />
          </div>
        </div>
        <div className="relative w-36 h-36 sm:w-52 sm:h-52 shrink-0 rounded-full overflow-hidden border-4 border-background shadow-lg bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
          <Image
            src="/headshot.png"
            alt="Duncan Johnson"
            fill
            priority
            className="object-cover object-top"
          />
        </div>
      </section>

      {/* Now */}
      <section aria-labelledby="current-work">
        <SectionHeading>Now</SectionHeading>
        <div className="card p-6 sm:p-8 flex flex-col sm:flex-row gap-6">
          <div className="relative w-16 h-16 shrink-0">
            <Image src="/icons/teacher-dev.svg" alt="" fill className="object-contain" />
          </div>
          <div className="flex-1">
            <h3 id="current-work" className="text-2xl font-bold">
              <a href="https://teacher.dev" className="hover:underline underline-offset-4">
                teacher.dev
              </a>
            </h3>
            <p className="mt-1 text-lg font-medium">
              Building free apps for teachers every day.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              I’m building practical tools with teachers to solve real classroom
              problems, one day at a time. I also helped organize{" "}
              <a
                href="https://www.edtechathon.com/"
                className="text-foreground font-medium underline underline-offset-4 decoration-muted-foreground/40 hover:decoration-current"
              >
                EdTech-a-thon
              </a>
              , bringing educators and developers together for three days of
              building and testing classroom tools in July 2026.
            </p>
            <dl className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                {
                  value: days === null ? "–" : days.toLocaleString(),
                  label: "days building free apps",
                  className: "col-span-2 sm:col-span-1",
                },
                { value: "500K", label: "visits to teacher.dev sites" },
                { value: "70K", label: "social media followers" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className={`flex flex-col-reverse justify-end rounded-lg border bg-muted/40 px-4 py-3 ${stat.className ?? ""}`}
                >
                  <dt className="mt-1 text-sm text-muted-foreground">{stat.label}</dt>
                  <dd className="text-3xl sm:text-4xl font-black tracking-tight">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-6">
              <Button asChild>
                <a href="https://teacher.dev">
                  Follow the daily builds <ArrowUpRightIcon className="ml-1.5 w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Previously */}
      <section>
        <SectionHeading>Previously</SectionHeading>
        <ul className="card divide-y overflow-hidden">
          {previousExperiences.map((experience) => (
            <li key={experience.slug}>
              <Link
                href={experience.slug}
                className="group flex items-center gap-4 px-4 py-4 sm:px-6 hover:bg-muted/60 transition-colors"
              >
                <div className="relative w-10 h-10 shrink-0 rounded-md overflow-hidden border bg-background">
                  <Image
                    src={experience.logoPath ?? "/icons/placeholder.png"}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold leading-snug">
                    {experience.position}
                  </p>
                  <p className="text-sm text-muted-foreground truncate">
                    {experience.organization}
                  </p>
                </div>
                <span className="hidden sm:block text-sm text-muted-foreground tabular-nums whitespace-nowrap">
                  {yearRange(experience.startDate, experience.endDate)}
                </span>
                <ArrowRightIcon className="w-4 h-4 shrink-0 text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" />
              </Link>
            </li>
          ))}
        </ul>
        <Button asChild variant="outline" size="sm" className="mt-4 shadow-sm">
          <Link href="/experiences">
            All experiences <ArrowRightIcon className="ml-1 w-4 h-4" />
          </Link>
        </Button>
      </section>

      {/* Projects */}
      <section>
        <SectionHeading>Recent projects</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {recentProjects.map((project) => (
            <ProjectTile key={project._id} project={project} />
          ))}
        </div>
        <Button asChild variant="outline" size="sm" className="mt-4 shadow-sm">
          <Link href="/projects">
            All projects <ArrowRightIcon className="ml-1 w-4 h-4" />
          </Link>
        </Button>
      </section>

      {data && (
        <p className="mx-auto rounded-full bg-background px-3 py-1 text-xs text-muted-foreground">
          Last updated {new Date(data[0].commit.author.date).toLocaleDateString()}
        </p>
      )}
    </div>
  );
}
