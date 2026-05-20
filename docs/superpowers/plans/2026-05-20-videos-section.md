# Videos Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a horizontal video carousel below the Social Gallery with full admin CRUD, supporting both file uploads (Supabase Storage) and YouTube/Vimeo embeds, with lazy loading for performance.

**Architecture:** A new `videos` Supabase table stores metadata (title, URL, type). A `VideoPlayer` component renders `<video>` for uploads or `<iframe>` for embeds. A `VideosSection` carousel component uses `IntersectionObserver` for lazy loading. Admin gets a new "Videos" tab in `AdminPage.jsx` with add/edit/delete forms.

**Tech Stack:** React 18, Supabase (table + Storage), Tailwind CSS, Lucide icons, IntersectionObserver API

---

## File Structure

| File | Action | Responsibility |
|------|--------|---------------|
| `src/data/products.js` | Modify | Add video CRUD functions (fetch, add, update, delete, upload) |
| `src/components/VideoPlayer.jsx` | Create | Unified video player — renders `<video>` or `<iframe>` based on type |
| `src/components/VideosSection.jsx` | Create | Horizontal carousel with lazy loading, video modal, arrow navigation |
| `src/components/AdminPage.jsx` | Modify | Add "Videos" tab with list, add form, edit, delete |
| `src/App.jsx` | Modify | Import VideosSection, add videos state + real-time subscription |
| `src/index.css` | Modify | Add video carousel styles, play button animation, video modal |

---

### Task 1: SQL Migration — Create Videos Table

**Files:** None (run in Supabase SQL Editor)

- [ ] **Step 1: Run SQL to create the videos table**

Go to Supabase Dashboard > SQL Editor and run:

```sql
CREATE TABLE videos (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  video_url text NOT NULL,
  video_type text NOT NULL CHECK (video_type IN ('upload', 'embed')),
  thumbnail_url text,
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Videos are publicly readable"
  ON videos FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage videos"
  ON videos FOR ALL
  USING (true)
  WITH CHECK (true);
```

- [ ] **Step 2: Create the `videos` storage bucket**

Go to Supabase Dashboard > Storage > New Bucket:
- Name: `videos`
- Public: **Yes**
- File size limit: **50 MB**
- Allowed MIME types: `video/mp4, video/webm, video/quicktime`

- [ ] **Step 3: Verify**

Run `SELECT * FROM videos;` — should return empty table with correct columns. Check Storage shows `videos` bucket.

---

### Task 2: Video CRUD Functions

**Files:**
- Modify: `src/data/products.js` (append after `seedProducts` function, before `getLiveProducts`)

- [ ] **Step 1: Add video row mappers and CRUD functions**

Append this code to `src/data/products.js`, after the `seedProducts` function (around line 1716) and before `getLiveProducts`:

```javascript
// ─────────────────────────────────────────────
//  VIDEOS  –  Supabase-backed
// ─────────────────────────────────────────────

function rowToVideo(row) {
  return {
    id: row.id,
    title: row.title,
    videoUrl: row.video_url,
    videoType: row.video_type,
    thumbnailUrl: row.thumbnail_url,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
  };
}

function videoToRow(v) {
  return {
    title: v.title,
    video_url: v.videoUrl,
    video_type: v.videoType,
    thumbnail_url: v.thumbnailUrl || null,
    sort_order: v.sortOrder ?? 0,
  };
}

export async function fetchVideos() {
  if (!isConfigured()) return [];
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });
  if (error) {
    console.error('Failed to fetch videos:', error);
    return [];
  }
  return data.map(rowToVideo);
}

export async function addVideo(video) {
  const row = videoToRow(video);
  const { data, error } = await supabase
    .from('videos')
    .insert(row)
    .select()
    .single();
  if (error) throw error;
  return rowToVideo(data);
}

export async function updateVideo(id, updates) {
  const row = {};
  if (updates.title !== undefined) row.title = updates.title;
  if (updates.videoUrl !== undefined) row.video_url = updates.videoUrl;
  if (updates.videoType !== undefined) row.video_type = updates.videoType;
  if (updates.thumbnailUrl !== undefined) row.thumbnail_url = updates.thumbnailUrl;
  if (updates.sortOrder !== undefined) row.sort_order = updates.sortOrder;

  const { data, error } = await supabase
    .from('videos')
    .update(row)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return rowToVideo(data);
}

export async function deleteVideo(id) {
  const { error } = await supabase
    .from('videos')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

export async function uploadVideoFile(file) {
  const ext = file.name.split('.').pop();
  const fileName = `${Date.now()}.${ext}`;
  const { error } = await supabase.storage
    .from('videos')
    .upload(fileName, file, { upsert: false });
  if (error) throw error;
  const { data } = supabase.storage
    .from('videos')
    .getPublicUrl(fileName);
  return { url: data.publicUrl, path: fileName };
}

export async function deleteVideoFile(path) {
  const { error } = await supabase.storage
    .from('videos')
    .remove([path]);
  if (error) console.error('Failed to delete video file:', error);
}

export function extractVideoId(url) {
  // YouTube
  const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch) return { platform: 'youtube', id: ytMatch[1] };
  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return { platform: 'vimeo', id: vimeoMatch[1] };
  return null;
}

export function getVideoThumbnail(url) {
  const info = extractVideoId(url);
  if (!info) return null;
  if (info.platform === 'youtube') {
    return `https://img.youtube.com/vi/${info.id}/mqdefault.jpg`;
  }
  return null;
}
```

- [ ] **Step 2: Verify imports work**

In `src/data/products.js`, confirm `supabase` and `isConfigured` are already imported at the top (they are — used by subscriber and product functions).

- [ ] **Step 3: Commit**

```bash
git add src/data/products.js
git commit -m "feat: add video CRUD functions to data layer"
```

---

### Task 3: VideoPlayer Component

**Files:**
- Create: `src/components/VideoPlayer.jsx`

- [ ] **Step 1: Create VideoPlayer.jsx**

```jsx
import React from 'react';

export function extractEmbedUrl(url) {
  // YouTube
  const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`;
  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
  return url;
}

const VideoPlayer = ({ videoUrl, videoType, title, poster, className = '' }) => {
  if (videoType === 'embed') {
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/VideoPlayer.jsx
git commit -m "feat: add VideoPlayer component for uploaded and embedded videos"
```

---

### Task 4: VideosSection Carousel

**Files:**
- Create: `src/components/VideosSection.jsx`

- [ ] **Step 1: Create VideosSection.jsx**

```jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, ChevronLeft, ChevronRight, X, Video } from 'lucide-react';
import { fetchVideos, getVideoThumbnail } from '../data/products';
import VideoPlayer from './VideoPlayer';

const VideoCard = ({ video, index, onClick }) => {
  const thumbnail = video.thumbnailUrl || getVideoThumbnail(video.videoUrl);

  return (
    <div
      className="fade-up min-w-[280px] sm:min-w-[320px] lg:min-w-[350px] snap-center flex-shrink-0 cursor-pointer group"
      style={{ transitionDelay: `${index * 0.08}s` }}
      onClick={() => onClick(video)}
    >
      <div className="relative aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-matte-900 shadow-lg">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-matte-800 to-matte-900">
            <Video className="w-12 h-12 text-matte-600" />
          </div>
        )}

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-red play-btn-pulse">
            <Play className="w-6 h-6 sm:w-7 sm:h-7 text-matte-900 group-hover:text-white ml-0.5" fill="currentColor" />
          </div>
        </div>

        {/* Hover gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {video.title && (
        <p className="mt-3 text-sm sm:text-base font-medium text-matte-900 truncate px-1">
          {video.title}
        </p>
      )}
    </div>
  );
};

const VideoSkeleton = () => (
  <div className="min-w-[280px] sm:min-w-[320px] lg:min-w-[350px] flex-shrink-0">
    <div className="aspect-video rounded-xl sm:rounded-2xl bg-beige-100 animate-pulse" />
    <div className="mt-3 h-4 w-3/4 bg-beige-100 rounded animate-pulse" />
  </div>
);

const VideosSection = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [modalVideo, setModalVideo] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);

  // Lazy load: only fetch when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    fetchVideos().then(data => {
      setVideos(data);
      setLoading(false);
    });
  }, [isVisible]);

  // Check scroll position for arrow visibility
  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll, videos]);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector(':first-child')?.offsetWidth || 320;
    el.scrollBy({ left: direction * (cardWidth + 16), behavior: 'smooth' });
  };

  const openModal = (video) => {
    setModalVideo(video);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalVideo(null);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    if (!modalVideo) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [modalVideo]);

  // Don't render anything if no videos and not loading
  if (!loading && videos.length === 0) return null;

  return (
    <>
      <section ref={sectionRef} id="videos" className="py-16 sm:py-20 lg:py-32 bg-beige-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <p className="text-sm font-semibold text-brand-red tracking-widest uppercase mb-4 fade-up">
              Watch & Shop
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold fade-up stagger-1 section-title section-heading-underline">
              Our Videos
            </h2>
          </div>

          <div className="relative">
            {/* Left arrow */}
            {canScrollLeft && (
              <button
                onClick={() => scroll(-1)}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-beige-50 transition-colors -ml-2 sm:-ml-5"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5 text-matte-900" />
              </button>
            )}

            {/* Right arrow */}
            {canScrollRight && (
              <button
                onClick={() => scroll(1)}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-beige-50 transition-colors -mr-2 sm:-mr-5"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5 text-matte-900" />
              </button>
            )}

            {/* Carousel */}
            <div
              ref={scrollRef}
              className="video-carousel flex gap-4 sm:gap-6 overflow-x-auto pb-4 px-1"
            >
              {loading
                ? Array.from({ length: 4 }).map((_, i) => <VideoSkeleton key={i} />)
                : videos.map((video, i) => (
                    <VideoCard key={video.id} video={video} index={i} onClick={openModal} />
                  ))
              }
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {modalVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={modalVideo.title || 'Video player'}>
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative w-full max-w-4xl z-10">
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-20"
              aria-label="Close video"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            <VideoPlayer
              videoUrl={modalVideo.videoUrl}
              videoType={modalVideo.videoType}
              title={modalVideo.title}
              poster={modalVideo.thumbnailUrl || getVideoThumbnail(modalVideo.videoUrl)}
            />
            {modalVideo.title && (
              <p className="text-white text-center mt-4 text-sm sm:text-base font-medium">
                {modalVideo.title}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default VideosSection;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/VideosSection.jsx
git commit -m "feat: add VideosSection carousel with lazy loading and video modal"
```

---

### Task 5: CSS Additions

**Files:**
- Modify: `src/index.css` (append at end, before the closing)

- [ ] **Step 1: Add video-specific CSS**

Append this to the end of `src/index.css`:

```css
/* ─── Video Carousel ─── */
.video-carousel {
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.video-carousel::-webkit-scrollbar {
  display: none;
}

.video-carousel > * {
  scroll-snap-align: start;
}

/* Play button pulse animation */
.play-btn-pulse {
  box-shadow: 0 0 0 0 rgba(200, 40, 40, 0.4);
}

.group:hover .play-btn-pulse {
  animation: playPulse 1.5s ease-in-out infinite;
}

@keyframes playPulse {
  0% { box-shadow: 0 0 0 0 rgba(200, 40, 40, 0.4); }
  70% { box-shadow: 0 0 0 12px rgba(200, 40, 40, 0); }
  100% { box-shadow: 0 0 0 0 rgba(200, 40, 40, 0); }
}

/* Video modal entrance */
.video-modal-enter {
  animation: videoModalIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes videoModalIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/index.css
git commit -m "feat: add video carousel and play button CSS styles"
```

---

### Task 6: AdminPage Videos Tab

**Files:**
- Modify: `src/components/AdminPage.jsx`

- [ ] **Step 1: Add video imports to AdminPage.jsx**

At line 2 of `AdminPage.jsx`, update the lucide-react import to include `Video`:

```javascript
import {
  X, Mail, Lock, LogOut, Users, Download, Copy, Trash2, Search,
  Shield, CheckCircle, AlertCircle, BarChart3, ShoppingBag, TrendingUp,
  Edit3, Save, ImagePlus, RotateCcw, Plus, Loader2, ChevronDown, Eye, Video, Film
} from 'lucide-react';
```

At line 8, update the data/products import to include video functions:

```javascript
import {
  fetchSubscribers, removeSubscriber, clearSubscribers, escapeHtml,
  formatPrice, categories as CATEGORIES_LIST,
  updateProduct, deleteProduct, uploadProductImage, deleteProductImage, addProduct,
  seedProducts,
  fetchVideos, addVideo, updateVideo, deleteVideo, uploadVideoFile, deleteVideoFile, extractVideoId
} from '../data/products';
```

- [ ] **Step 2: Add video state and handlers to AdminPage**

Inside the `AdminPage` component, after the subscriber state declarations (around line 393), add video state:

```javascript
  const [videos, setVideos] = useState([]);
  const [videoSearch, setVideoSearch] = useState('');
  const [showAddVideoForm, setShowAddVideoForm] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);
```

After the `useEffect` that fetches subscribers (around line 397), add video fetching:

```javascript
  useEffect(() => {
    if (session) fetchVideos().then(setVideos);
  }, [session]);
```

After the subscriber management functions (around line 565, after `copyEmails`), add video management functions:

```javascript
  // ─── Video Management ───

  const filteredVideos = videos.filter(v => {
    if (!videoSearch) return true;
    return v.title?.toLowerCase().includes(videoSearch.toLowerCase());
  });

  const handleAddVideo = async (formData) => {
    setVideoLoading(true);
    try {
      let videoUrl = formData.videoUrl;
      let thumbnailUrl = formData.thumbnailUrl || null;

      if (formData.videoType === 'upload' && formData.file) {
        const result = await uploadVideoFile(formData.file);
        videoUrl = result.url;
      }

      if (formData.videoType === 'embed') {
        const { getVideoThumbnail } = await import('../data/products');
        thumbnailUrl = getVideoThumbnail(formData.videoUrl) || null;
      }

      await addVideo({
        title: formData.title,
        videoUrl,
        videoType: formData.videoType,
        thumbnailUrl,
        sortOrder: formData.sortOrder || 0,
      });

      const updated = await fetchVideos();
      setVideos(updated);
      setShowAddVideoForm(false);
      showToast('success', 'Video Added', `"${formData.title}" has been added.`);
    } catch (err) {
      showToast('error', 'Failed', err.message || 'Could not add video.');
    } finally {
      setVideoLoading(false);
    }
  };

  const handleDeleteVideo = async (video) => {
    if (!window.confirm(`Delete "${video.title}"? This cannot be undone.`)) return;
    try {
      if (video.videoType === 'upload' && video.videoUrl?.includes('supabase')) {
        const marker = '/videos/';
        const idx = video.videoUrl.indexOf(marker);
        if (idx !== -1) {
          const path = video.videoUrl.substring(idx + marker.length);
          await deleteVideoFile(path);
        }
      }
      await deleteVideo(video.id);
      const updated = await fetchVideos();
      setVideos(updated);
      showToast('success', 'Deleted', 'Video deleted.');
    } catch (err) {
      showToast('error', 'Failed', err.message || 'Could not delete video.');
    }
  };

  const handleUpdateVideoTitle = async (videoId, newTitle) => {
    try {
      await updateVideo(videoId, { title: newTitle });
      const updated = await fetchVideos();
      setVideos(updated);
      showToast('success', 'Updated', 'Video title updated.');
    } catch (err) {
      showToast('error', 'Failed', err.message || 'Could not update video.');
    }
  };
```

- [ ] **Step 3: Add Videos tab to the tab bar**

Find the tabs array (around line 686):

```javascript
{[['products', ShoppingBag], ['subscribers', Users], ['categories', BarChart3]].map(([tab, Icon]) => (
```

Change it to:

```javascript
{[['products', ShoppingBag], ['videos', Video], ['subscribers', Users], ['categories', BarChart3]].map(([tab, Icon]) => (
```

- [ ] **Step 4: Add Videos tab content**

After the Products tab closing `)}` (around line 811) and before the Subscribers tab comment, insert the Videos tab:

```jsx
        {/* ─── VIDEOS TAB ─── */}
        {activeTab === 'videos' && (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-beige-100 overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-beige-100">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="font-serif font-bold text-matte-900 text-sm sm:text-base flex items-center gap-2">
                  <Video className="w-5 h-5 text-champagne-300" /> Video Management
                </h3>
                <button onClick={() => setShowAddVideoForm(true)} className="flex items-center gap-1 px-3 sm:px-4 py-2 rounded-lg text-[10px] sm:text-xs font-semibold bg-brand-red text-white hover:bg-red-700 transition-colors">
                  <Plus className="w-4 h-4" /> <span className="hidden sm:inline">Add Video</span><span className="sm:hidden">Add</span>
                </button>
              </div>
              {!showAddVideoForm && (
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-matte-400" />
                  <input type="text" placeholder="Search videos..." value={videoSearch} onChange={(e) => setVideoSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-beige-200 bg-beige-50 focus:outline-none focus:border-brand-red text-sm" />
                </div>
              )}
            </div>

            {/* Add Video Form */}
            {showAddVideoForm && (
              <AddVideoForm
                onSave={handleAddVideo}
                onCancel={() => setShowAddVideoForm(false)}
                saving={videoLoading}
              />
            )}

            {/* Video List */}
            {!showAddVideoForm && (
              <div className="divide-y divide-beige-100">
                {filteredVideos.length === 0 ? (
                  <div className="p-8 text-center text-matte-500 text-sm">
                    {videos.length === 0 ? 'No videos yet. Add your first video!' : 'No videos match your search.'}
                  </div>
                ) : (
                  filteredVideos.map(video => (
                    <div key={video.id} className="p-3 sm:p-4 flex items-center gap-3 sm:gap-4 hover:bg-beige-50/50 transition-colors">
                      <div className="w-20 h-12 sm:w-24 sm:h-14 rounded-lg overflow-hidden bg-matte-900 flex-shrink-0 relative group/thumb">
                        {video.thumbnailUrl ? (
                          <img src={video.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Film className="w-5 h-5 text-matte-600" />
                          </div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <Play className="w-4 h-4 text-white" fill="white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <EditableField
                          value={video.title}
                          onSave={(val) => handleUpdateVideoTitle(video.id, val)}
                          className="text-sm font-medium text-matte-900"
                        />
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium ${video.videoType === 'upload' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'}`}>
                            {video.videoType === 'upload' ? 'File' : 'Embed'}
                          </span>
                          <span className="text-[10px] text-matte-400 truncate">{video.videoUrl}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteVideo(video)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors flex-shrink-0"
                        title="Delete video"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}
```

- [ ] **Step 5: Add AddVideoForm component**

Before the `AdminPage` component definition (around line 380), add the `AddVideoForm` component:

```jsx
// ─────────────────────────────────────────────
//  Add Video Form
// ─────────────────────────────────────────────
const AddVideoForm = ({ onSave, onCancel, saving }) => {
  const [videoType, setVideoType] = useState('upload');
  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [file, setFile] = useState(null);
  const [sortOrder, setSortOrder] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (f) => {
    if (!f) return;
    if (f.size > 50 * 1024 * 1024) {
      alert('File must be under 50MB.');
      return;
    }
    setFile(f);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) { alert('Please enter a title.'); return; }
    if (videoType === 'upload' && !file) { alert('Please select a video file.'); return; }
    if (videoType === 'embed' && !videoUrl.trim()) { alert('Please paste a video URL.'); return; }
    onSave({ title: title.trim(), videoType, videoUrl: videoUrl.trim(), file, sortOrder });
  };

  return (
    <div className="p-4 sm:p-6 border-b border-beige-100 bg-beige-50/50">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <button type="button" onClick={() => setVideoType('upload')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${videoType === 'upload' ? 'bg-brand-red text-white' : 'bg-white border border-beige-200 text-matte-600 hover:border-brand-red'}`}>
            Upload File
          </button>
          <button type="button" onClick={() => setVideoType('embed')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${videoType === 'embed' ? 'bg-brand-red text-white' : 'bg-white border border-beige-200 text-matte-600 hover:border-brand-red'}`}>
            Paste Link
          </button>
        </div>

        <div>
          <label className="block text-xs font-medium text-matte-600 mb-1">Title *</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Video title" className="w-full px-3 py-2.5 rounded-lg border border-beige-200 bg-white text-sm focus:outline-none focus:border-brand-red" required />
        </div>

        {videoType === 'upload' ? (
          <div>
            <label className="block text-xs font-medium text-matte-600 mb-1">Video File *</label>
            <div
              className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-colors ${dragActive ? 'border-brand-red bg-brand-red/5' : 'border-beige-200 bg-white hover:border-brand-red/50'}`}
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={(e) => { e.preventDefault(); setDragActive(false); handleFile(e.dataTransfer.files[0]); }}
            >
              {file ? (
                <div className="flex items-center justify-center gap-3">
                  <Film className="w-8 h-8 text-brand-red" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-matte-900 truncate max-w-[200px]">{file.name}</p>
                    <p className="text-xs text-matte-500">{(file.size / (1024 * 1024)).toFixed(1)} MB</p>
                  </div>
                  <button type="button" onClick={() => setFile(null)} className="p-1 rounded-lg hover:bg-red-50 text-red-400">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div>
                  <Film className="w-8 h-8 text-matte-400 mx-auto mb-2" />
                  <p className="text-sm text-matte-600">Drag & drop or <button type="button" onClick={() => fileInputRef.current?.click()} className="text-brand-red font-medium hover:underline">browse</button></p>
                  <p className="text-xs text-matte-400 mt-1">MP4, WebM — Max 50MB</p>
                </div>
              )}
              <input ref={fileInputRef} type="file" accept="video/mp4,video/webm,video/quicktime" className="hidden" onChange={(e) => handleFile(e.target.files[0])} />
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-xs font-medium text-matte-600 mb-1">Video URL *</label>
            <input type="url" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..." className="w-full px-3 py-2.5 rounded-lg border border-beige-200 bg-white text-sm focus:outline-none focus:border-brand-red" />
            <p className="text-xs text-matte-400 mt-1">YouTube or Vimeo URLs supported</p>
          </div>
        )}

        <div>
          <label className="block text-xs font-medium text-matte-600 mb-1">Sort Order</label>
          <input type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))} placeholder="0" className="w-full px-3 py-2.5 rounded-lg border border-beige-200 bg-white text-sm focus:outline-none focus:border-brand-red" />
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-beige-100">
          <button type="button" onClick={onCancel} className="px-5 py-2.5 rounded-xl text-sm font-medium text-matte-600 hover:bg-beige-50 transition-colors">Cancel</button>
          <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-brand-red text-white hover:bg-red-700 transition-colors disabled:opacity-60">
            {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Add Video</>}
          </button>
        </div>
      </form>
    </div>
  );
};
```

- [ ] **Step 6: Commit**

```bash
git add src/components/AdminPage.jsx
git commit -m "feat: add Videos tab with CRUD form to admin panel"
```

---

### Task 7: App.jsx Integration

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Import VideosSection**

At line 12, after the SocialGallery import, add:

```javascript
import VideosSection from './components/VideosSection';
```

- [ ] **Step 2: Place VideosSection below SocialGallery**

Find the SocialGallery usage (around line 288):

```jsx
      <SocialGallery />
      <FAQ />
```

Change to:

```jsx
      <SocialGallery />
      <VideosSection />
      <FAQ />
```

- [ ] **Step 3: Commit**

```bash
git add src/App.jsx
git commit -m "feat: integrate VideosSection into main app below SocialGallery"
```

---

### Task 8: Final Verification

- [ ] **Step 1: Run the dev server**

```bash
npm run dev
```

Expected: App starts without errors on localhost.

- [ ] **Step 2: Verify Social Gallery still works**

Navigate to the social gallery section — images should display, lightbox should work.

- [ ] **Step 3: Verify Videos Section renders**

The Videos section should appear below the social gallery. If no videos exist yet, it should be hidden (graceful empty state).

- [ ] **Step 4: Test Admin Videos tab**

1. Open Admin from Footer
2. Click "Videos" tab
3. Click "Add Video" — try both "Upload File" and "Paste Link" modes
4. Verify video appears in the list after adding
5. Edit video title inline
6. Delete video with confirmation

- [ ] **Step 5: Verify carousel behavior**

After adding videos:
- Carousel scrolls horizontally with snap points
- Arrow buttons appear/disappear based on scroll position
- Click a video card opens the modal
- Modal plays the video (HTML5 for uploads, iframe for embeds)
- Escape closes the modal

- [ ] **Step 6: Verify lazy loading**

- Videos section should NOT load data until scrolled into view
- Check Network tab — no video requests until section is visible
- Skeleton placeholders should show while loading

- [ ] **Step 7: Verify responsive design**

- Mobile (< 640px): single card view, swipe navigation
- Tablet (640-1024px): 2-3 cards visible
- Desktop (> 1024px): 3-4 cards with arrow navigation

- [ ] **Step 8: Final commit**

```bash
git add -A
git commit -m "feat: complete videos section with admin CRUD and lazy loading"
```
