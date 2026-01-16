import { Experience } from "@/.contentlayer/generated";
import { Separator } from "@/components/ui/separator";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

type SmallCardProps = {
  experience: Experience;
  className?: string;
};

export const SmallCard: FC<SmallCardProps> = ({ experience, className }) => {
  return (
    <div
      className={`card flex flex-row items-stretch justify-between overflow-hidden ${className ?? ""}`}
    >
      <div className="flex flex-row">
        <Link
          className="w-12 flex items-center justify-center hover:bg-muted transition-colors duration-200 ease-in-out"
          href={experience.slug}
          aria-label={`Learn more about ${experience.organization}`}
        >
          <InfoCircledIcon />
        </Link>
        <Separator orientation="vertical" className="h-full" />
      </div>
      <div className="flex-1 flex items-center px-4 py-3 sm:px-5 sm:py-4">
        <div className="text-sm sm:text-md font-bold leading-snug">
          {experience.position}
        </div>
      </div>
      <div className="w-16 sm:w-20 shrink-0 border-l">
        <div className="relative aspect-square w-full">
          <Image
            src={experience.logoPath ?? "/icons/placeholder.png"}
            alt={experience.organization}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};
