import { Experience } from "@/.contentlayer/generated";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { FC } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

type WideCardProps = {
  experience: Experience;
  content: string;
  featurePhoto: string;
  className?: string;
};

export const WideCard: FC<WideCardProps> = ({
  experience,
  content,
  featurePhoto,
  className,
}) => {
  return (
    <div
      className={`card flex flex-col sm:flex-row overflow-hidden sm:min-h-[280px] ${className ?? ""}`}
    >
      <div className="order-2 sm:order-1 flex-1 flex">
        <div className="flex flex-col p-5 sm:p-6">
          <div className="flex flex-row items-center space-x-1">
            <div className="w-8 h-8 relative">
              <Image
                src={experience.logoPath ?? "/icons/placeholder.png"}
                alt={experience.organization}
                fill
                className="rounded-md"
              />
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex flex-col">
              <div className="text-xl sm:text-2xl font-bold leading-none">
                {experience.position}
              </div>
              <div className="text-md italic leading-none">
                {`@${experience.organization}`}
              </div>
            </div>
          </div>
          <div className="text-sm sm:text-md leading-snug my-4 sm:my-5">
            {content}
          </div>
          <Link href={experience.slug}>
            <Button variant="outline">
              <span className="text-sm px-2">Learn more</span>
              <InfoCircledIcon />
            </Button>
          </Link>
        </div>
      </div>
      <div className="order-1 sm:order-2 w-full sm:w-1/3 border-b sm:border-b-0 sm:border-l">
        <Image
          src={featurePhoto}
          alt={experience.organization}
          width={1200}
          height={800}
          className="h-44 sm:h-full w-full object-cover"
          priority={false}
        />
      </div>
    </div>
  );
};
