import React, { useState, useEffect, useRef } from 'react';

export function isTikTokUrl(url) {
  return /tiktok\.com/.test(url);
}

export function extractEmbedUrl(url) {
  // YouTube
  const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`;
  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
  return url;
}

// Load TikTok embed script once
let tiktokScriptLoaded = false;
let tiktokScriptLoading = false;
function loadTikTokScript() {
  return new Promise((resolve) => {
    if (tiktokScriptLoaded) { resolve(); return; }
    if (tiktokScriptLoading) {
      const check = setInterval(() => {
        if (tiktokScriptLoaded) { clearInterval(check); resolve(); }
      }, 100);
      return;
    }
    tiktokScriptLoading = true;
    const script = document.createElement('script');
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;
    script.onload = () => { tiktokScriptLoaded = true; resolve(); };
    document.body.appendChild(script);
  });
}

const TikTokEmbed = ({ videoUrl, className = '' }) => {
  const [html, setHtml] = useState('');
  const [error, setError] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    setHtml('');
    setError(false);

    fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(videoUrl)}`)
      .then(res => res.json())
      .then(async (data) => {
        if (cancelled) return;
        if (data.html) {
          setHtml(data.html);
          await loadTikTokScript();
          // Process the new embed after script loads
          if (window.tiktokEmbedLib && containerRef.current) {
            window.tiktokEmbedLib.render(containerRef.current);
          }
        } else {
          setError(true);
        }
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => { cancelled = true; };
  }, [videoUrl]);

  if (error) {
    return (
      <div className={`relative w-full aspect-video rounded-xl overflow-hidden bg-black flex items-center justify-center ${className}`}>
        <p className="text-white/60 text-sm">Could not load TikTok video</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-xl overflow-hidden bg-black [&_.tiktok-embed]:!min-w-0 [&_.tiktok-embed]:!w-full [&_.tiktok-embed]:!max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

const VideoPlayer = ({ videoUrl, videoType, title, poster, className = '' }) => {
  if (videoType === 'embed') {
    // TikTok uses oEmbed, not iframe
    if (isTikTokUrl(videoUrl)) {
      return <TikTokEmbed videoUrl={videoUrl} className={className} />;
    }

    const embedUrl = extractEmbedUrl(videoUrl);
    return (
      <div className={`relative w-full aspect-video rounded-xl overflow-hidden bg-black ${className}`}>
        <iframe
          src={embedUrl}
          title={title || 'Video'}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className={`relative w-full aspect-video rounded-xl overflow-hidden bg-black ${className}`}>
      <video
        src={videoUrl}
        poster={poster}
        controls
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-contain"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
