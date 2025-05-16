"use client";

import React, { useEffect, useState } from "react";

const API_KEY = "AIzaSyBGSv4DRC2URxnEH9acgahFhvhNvmvSM-c";
const CHANNEL_ID = "UCQpxGN8mbVJobwro6DlCIJA";
const MAX_RESULTS = 8;

interface Video {
  id: string;
  title: string;
  thumbnail: string;
}

export default function YoutubeVideos() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    async function fetchVideos() {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}`
      );
      const data = await res.json();
      const vids = data.items
        .filter((item: any) => item.id.kind === "youtube#video")
        .map((item: any) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.medium.url,
        }));
      setVideos(vids);
    }
    fetchVideos();
  }, []);

  if (!videos.length) return null;

  return (
    <div className="mt-16">
      <h3 className="text-3xl font-bold text-primary mb-8 text-center">
        Vidéos récentes
      </h3>
      <div className="grid gap-8 md:grid-cols-4 sm:grid-cols-2">
        {videos.map((video) => (
          <a
            key={video.id}
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <div className="relative w-full h-48 rounded-lg overflow-hidden shadow-lg">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="mt-3 text-white text-base font-medium line-clamp-2 text-center">
              {video.title}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
