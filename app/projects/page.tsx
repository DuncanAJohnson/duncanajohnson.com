import { allProjects, Project } from "contentlayer/generated";
import Image from "next/image";
import Link from "next/link";
import { ExternalLinkIcon, PlayIcon } from "lucide-react";

function ProjectCard({ project }: { project: Project }) {
  const hasVideo = project.video && project.video.trim() !== "";
  const hasLink = project.link && project.link.trim() !== "";

  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    // This regex extracts the ID from a standard watch link or a short link
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|embed\?v=|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
  
    return (match && match[2].length === 11) 
      ? `https://www.youtube.com/embed/${match[2]}`
      : url;
  };

  return (
    <div className="group relative overflow-hidden rounded-xl bg-card border border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
      {/* Video / Placeholder Section */}
      <div className="relative aspect-video bg-muted overflow-hidden">
        {hasVideo ? (
          <iframe
            width="560"
            height="315"
            src={getEmbedUrl(project.video ?? "")}
            title={`${project.title} video`}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted to-muted-foreground/10">
            <div className="flex flex-col items-center gap-2 text-muted-foreground/50">
              <PlayIcon className="w-12 h-12" />
              <span className="text-sm">No video available</span>
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {project.icon && (
              <div className="relative w-10 h-10 shrink-0 rounded-lg overflow-hidden bg-muted">
                <Image
                  src={project.icon}
                  alt={project.title}
                  fill
                  className="object-contain p-1"
                />
              </div>
            )}
            <div className="min-w-0">
              <h3 className="font-semibold text-lg leading-tight truncate">
                {project.title}
              </h3>
              {project.organization && (
                <p className="text-sm text-muted-foreground truncate">
                  {project.organization}
                </p>
              )}
            </div>
          </div>

          {hasLink && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label={`Visit ${project.title}`}
            >
              <ExternalLinkIcon className="w-4 h-4" />
            </a>
          )}
        </div>

        {project.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>
        )}

        <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
          <span>
            {project.startDate} — {project.endDate || "Present"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default async function ProjectsPage() {
  // Sort projects by endDate (most recent first), then by startDate
  const sortedProjects = allProjects.sort((a, b) => {
    let aEndDate: Date;
    let bEndDate: Date;

    if (!a.endDate) {
      aEndDate = new Date();
    } else {
      const aEndYear = parseInt(a.endDate.split("/")[1]);
      const aEndMonth = parseInt(a.endDate.split("/")[0]);
      aEndDate = new Date(aEndYear, aEndMonth, 1);
    }

    if (!b.endDate) {
      bEndDate = new Date();
    } else {
      const bEndYear = parseInt(b.endDate.split("/")[1]);
      const bEndMonth = parseInt(b.endDate.split("/")[0]);
      bEndDate = new Date(bEndYear, bEndMonth, 1);
    }

    if (aEndDate < bEndDate) return 1;
    if (aEndDate > bEndDate) return -1;

    // If end dates are the same, compare startDates
    const aStartYear = parseInt(a.startDate.split("/")[1]);
    const bStartYear = parseInt(b.startDate.split("/")[1]);
    const aStartMonth = parseInt(a.startDate.split("/")[0]);
    const bStartMonth = parseInt(b.startDate.split("/")[0]);
    const aStartDate = new Date(aStartYear, aStartMonth, 1);
    const bStartDate = new Date(bStartYear, bStartMonth, 1);

    return aStartDate > bStartDate ? -1 : 1;
  });

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedProjects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
}
