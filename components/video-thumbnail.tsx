"use client";

import { useState } from "react";
import { PlayIcon } from "lucide-react";
import { youtubeId } from "@/lib/utils";

type VideoThumbnailProps = {
  url: string;
  title: string;
};

// Shows the YouTube thumbnail and only loads the player once clicked
export function VideoThumbnail({ url, title }: VideoThumbnailProps) {
  const [playing, setPlaying] = useState(false);
  const id = youtubeId(url);

  if (!id) return null;

  if (playing) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${id}?autoplay=1`}
        title={`${title} video`}
        className="absolute inset-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group/video absolute inset-0 w-full h-full"
      aria-label={`Play ${title} video`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt=""
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover group-hover/video:scale-[1.03] transition-transform duration-300"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover/video:bg-black/25 transition-colors">
        <span className="rounded-full bg-white/90 p-4 shadow-lg group-hover/video:scale-110 transition-transform">
          <PlayIcon className="w-6 h-6 text-slate-900 fill-slate-900" />
        </span>
      </span>
    </button>
  );
}
