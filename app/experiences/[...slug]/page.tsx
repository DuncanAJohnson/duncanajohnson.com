import { notFound } from "next/navigation";
import { allExperiences } from "contentlayer/generated";

import { Metadata } from "next";
import { Mdx } from "@/components/mdx-components";
import Image from "next/image";
import "./styles.css";

interface ExperienceProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: ExperienceProps["params"]) {
  const slug = params?.slug?.join("/");
  const experience = allExperiences.find(
    (experience) => experience.slugAsParams === slug
  );

  if (!experience) {
    null;
  }

  return experience;
}

export async function generateMetadata({
  params,
}: ExperienceProps): Promise<Metadata> {
  const experience = await getPostFromParams(params);

  if (!experience) {
    return {};
  }

  return {
    title: experience.position,
    description: experience.position,
  };
}

export async function generateStaticParams(): Promise<
  ExperienceProps["params"][]
> {
  return allExperiences.map((experience) => ({
    slug: experience.slugAsParams.split("/"),
  }));
}

export default async function ExperiencePage({ params }: ExperienceProps) {
  const experience = await getPostFromParams(params);

  if (!experience) {
    notFound();
  }

  //ex: https://www.linkedin.com/in/elliot-roe-1b1a1b1b/ -> linkedin.com
  const extractDomain = (websiteLink: string) => {
    const websiteLinkArray = websiteLink.split("/");
    const websiteLinkDomain = websiteLinkArray[2];
    return websiteLinkDomain;
  };

  return (
    <article className="py-6 px-4 sm:px-0 max-w-4xl mx-auto prose dark:prose-invert">
      <div className="card p-4 sm:p-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:justify-between sm:items-start">
          <a href={experience.websiteLink}>
            <div className="flex flex-col items-center justify-center">
              <div className="h-20 w-20 border-0 rounded-md overflow-hidden">
                <Image
                  src={experience.logoPath}
                  alt="headshot"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "auto", height: "100%", margin: 0 }}
                />
              </div>
              <p className="text-xs italic text-slate-700">
                {extractDomain(experience.websiteLink)}
              </p>
            </div>
          </a>
          <div className="flex flex-col items-center justify-center text-center sm:text-left">
            <h1 className="m-1 section-header">{experience.position}</h1>
            <h2 className="italic m-0">{experience.organization}</h2>
          </div>
          <div className="flex flex-col items-center justify-center sm:items-end">
            <p className="text-base sm:text-xl mt-0 text-slate-700 dark:text-slate-200">
              {experience.startDate} —{" "}
              {experience?.endDate ? experience.endDate : "Present"}
            </p>
          </div>
        </div>
        <hr className="my-4" />
        <Mdx code={experience.body.code} />
      </div>
    </article>
  );
}
