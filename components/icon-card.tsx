import { Experience } from "@/.contentlayer/generated";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { Button } from "./ui/button";
import { InfoCircledIcon } from "@radix-ui/react-icons";

type IconCardProps = {
  experience: Experience;
  className?: string;
};

export const IconCard: FC<IconCardProps> = ({ experience, className }) => {
  return (
    <div
      className={`card flex flex-col p-5 sm:p-6 justify-between items-center gap-4 ${className ?? ""}`}
    >
      <div className="w-20 h-20 sm:w-32 sm:h-32 relative">
        <Image
          src={experience.logoPath ?? "/icons/placeholder.png"}
          alt={experience.organization}
          fill
          className="rounded-xl"
        />
      </div>
      <div className="flex flex-col items-center space-y-1">
        <div className="text-xl sm:text-2xl font-bold leading-none text-center">
          {experience.position}
        </div>
        <div className="text-md italic leading-none w-full text-center">
          {`@${experience.organization}`}
        </div>
      </div>
      <Link href={experience.slug}>
        <Button variant="outline">
          <span className="text-sm px-2">Learn more</span>
          <InfoCircledIcon />
        </Button>
      </Link>
    </div>
  );
};
