import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

//   Reusable iframe component for embedding YouTube videos.

const YTIFrame = ({ embedId, title, autoplay = 0 }) => {
  const iframeSrc = `https://www.youtube.com/embed/${embedId}?autoplay=${autoplay}`;
  return (
    <iframe
      width="100%"
      height="100%"
      src={iframeSrc}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="tw-border-none tw-w-full tw-h-full"
    />
  );
};

// Wrapper component for displaying a YouTube video with header and external link button

const YouTubeVideo = ({ videoUrl, title, autoplay = 0 }) => {
  // Extract the YouTube video ID from a URL
  const getYouTubeId = (url) => {
    const regExp =
      /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[1]?.length === 11 ? match[1] : null;
  };

  const videoId = getYouTubeId(videoUrl);

  if (!videoId) {
    console.error("Invalid YouTube URL provided.");
    return null;
  }

  return (
    <Box>
      {/*Title Header */}
      <Box className="tw-flex tw-items-center tw-justify-between tw-mb-4">
        <Typography variant="h6" className="tw-font-semibold">
          {title}
        </Typography>
        <IconButton
          onClick={() => window.open(videoUrl, "_blank")}
          color="primary"
          aria-label="Open YouTube"
        >
          <OpenInNewIcon />
        </IconButton>
      </Box>

      {/* Embed YouTube Video */}
      <Box className="tw-w-full tw-aspect-video tw-rounded-xl tw-overflow-hidden tw-shadow-md">
        <YTIFrame embedId={videoId} title={title} autoplay={autoplay} />
      </Box>
    </Box>
  );
};
export default YouTubeVideo;
