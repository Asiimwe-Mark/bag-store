# Videos Section Feature — Design Spec

**Date:** 2026-05-20  
**Status:** Approved  
**Scope:** Add a videos carousel section under the social gallery with admin CRUD, Supabase storage, and performance optimizations.

---

## Overview

Add a horizontal video carousel below the existing `SocialGallery` component. The admin can upload video files (to Supabase Storage) or paste YouTube/Vimeo embed URLs. Videos are displayed in a lazy-loaded carousel with thumbnail previews. The full video plays in a modal on click.

---

## 1. Data Layer

### Supabase Table — `videos`

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid | Primary key, auto-generated |
| `title` | text | Video title |
| `video_url` | text | Supabase Storage URL or YouTube/Vimeo URL |
| `video_type` | text | `'upload'` or `'embed'` |
| `thumbnail_url` | text | Nullable — auto-generated for uploads, extracted for embeds |
| `sort_order` | int | Manual ordering in carousel |
| `created_at` | timestamp | Auto-set |

### Supabase Storage — `videos` bucket

- New public bucket for uploaded video files (.mp4, .webm)
- Path format: `{videoId}/{filename}`
- 50MB file size limit

### CRUD Functions (in `data/products.js`)

Following the existing product CRUD pattern:

- `fetchVideos()` — Supabase primary, empty array fallback
- `addVideo(video)` — insert row + upload file if type is `'upload'`
- `updateVideo(id, updates)` — update row
- `deleteVideo(id)` — delete row + delete storage file if uploaded
- `uploadVideoFile(file)` — upload to `videos` bucket, return public URL

### Real-time Sync

Subscribe to `videos` table `postgres_changes` in App.jsx, same pattern as products. Refresh video list on any change.

---

## 2. VideoPlayer Component

**Props:** `{ videoUrl, videoType, title, poster }`

### Uploaded Videos (`video_type: 'upload'`)

- HTML5 `<video>` with `controls`, `playsInline`, `preload="none"`
- `poster` attribute for thumbnail preview
- `loading="lazy"`

### Embedded Videos (`video_type: 'embed'`)

- `<iframe>` with YouTube/Vimeo embed URL
- Auto-extract thumbnails:
  - YouTube: `https://img.youtube.com/vi/{videoId}/mqdefault.jpg`
  - Vimeo: via oEmbed API
- `loading="lazy"` on iframe

### Thumbnail Strategy

- Uploads: optional admin-provided thumbnail, or auto-use first frame
- Embeds: auto-extracted from platform
- Thumbnails shown in carousel; full video loads only on click

---

## 3. VideosSection Carousel

**Placement:** Below `SocialGallery` in App.jsx

### Structure

- Section heading: "Videos" with gold underline animation (matching existing sections)
- Horizontal scrollable carousel with CSS scroll-snap
- Each card: thumbnail/poster, play button overlay, title below
- Click opens video modal with full VideoPlayer

### Carousel Behavior

- `scroll-snap-type: x mandatory` for smooth snapping
- Left/right arrow buttons (hidden on mobile, swipe instead)
- Touch drag via native horizontal scroll
- Cards: ~280px wide on mobile, ~350px on desktop

### Lazy Loading

- `IntersectionObserver` wrapper on the section
- Before visible: skeleton placeholder cards
- Once visible: thumbnails load first, full video on click only

### Animations

- `fade-up` entrance on section heading
- Cards stagger in with `stagger-1` through `stagger-N`
- Play button pulse on hover
- Modal: backdrop blur + scale-in animation

### Responsive

| Breakpoint | Cards visible | Navigation |
|------------|--------------|------------|
| < 640px | 1 (85vw) | Swipe only |
| 640-1024px | 2-3 | Arrows + swipe |
| > 1024px | 3-4 | Arrows + swipe |

---

## 4. Admin CRUD

**New "Videos" tab** in AdminPage.jsx alongside Products, Subscribers, Categories.

### Video List

- Table: title, type badge (upload/embed), thumbnail preview, created date
- Inline edit for title (same `EditableField` pattern as products)
- Delete with confirmation
- Sort order field for carousel ordering

### Add Video Form (Modal)

- Toggle: "Upload File" vs "Paste Link" (radio buttons)
- **Upload mode:** file input `.mp4, .webm`, 50MB limit, progress bar
- **Embed mode:** URL input, auto-validates YouTube/Vimeo
- Title text input
- Submit calls `addVideo()` — handles table insert + file upload

### Edit Video

- Click row to open edit modal
- Change title, replace file/update URL
- Can switch between upload/embed type

### Delete Video

- Deletes row AND storage file (if uploaded)
- Confirmation dialog

---

## 5. Performance

- `IntersectionObserver` — zero network cost until section is visible
- Thumbnails only in carousel — full video on click
- `preload="none"` on all `<video>` elements
- `loading="lazy"` on iframes
- Skeleton placeholders prevent layout shift
- 50MB upload limit enforced client-side

---

## 6. SQL Migration

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

-- Enable RLS
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Videos are publicly readable"
  ON videos FOR SELECT
  USING (true);

-- Authenticated insert/update/delete
CREATE POLICY "Admins can manage videos"
  ON videos FOR ALL
  USING (true)
  WITH CHECK (true);
```

Storage bucket `videos` must be created manually in Supabase Dashboard (public, 50MB limit).

---

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/data/products.js` | Modify | Add video CRUD functions |
| `src/components/VideoPlayer.jsx` | Create | Unified video player component |
| `src/components/VideosSection.jsx` | Create | Carousel section component |
| `src/components/AdminPage.jsx` | Modify | Add Videos tab with CRUD form |
| `src/App.jsx` | Modify | Import VideosSection, add real-time subscription |
| `src/index.css` | Modify | Add carousel and video-specific styles |
