// Builds the web copies of everything in public/images and the hero video
// into public/media. Originals stay untouched as the source.
//
//   npm run optimize-media
//
// Images: WebP at 640, 1280 and 1920 px wide (never upscaled), matching the
// widths in next.config.ts and src/lib/imageLoader.ts.
// Video: 720p H.264 (CRF 34, it sits under a dark overlay) with the index at
// the front so it starts playing at once, no audio track, plus a poster frame.

import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const OUT = path.join(PUBLIC, "media");
const WIDTHS = [640, 1280, 1920];
const SKIP_DIRS = new Set(["logo"]); // unused source files

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) yield* walk(full);
    } else if (/\.(jpe?g|png)$/i.test(entry.name)) {
      yield full;
    }
  }
}

async function isFresh(source, target) {
  if (!existsSync(target)) return false;
  return (await stat(target)).mtimeMs >= (await stat(source)).mtimeMs;
}

let made = 0;
for await (const file of walk(path.join(PUBLIC, "images"))) {
  const rel = path.relative(PUBLIC, file).replace(/\.(jpe?g|png)$/i, "");
  for (const width of WIDTHS) {
    const target = path.join(OUT, `${rel}-${width}.webp`);
    if (await isFresh(file, target)) continue;
    await mkdir(path.dirname(target), { recursive: true });
    await sharp(file)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 72, effort: 6 })
      .toFile(target);
    made++;
  }
}
console.log(`images: ${made} files written`);

const video = path.join(PUBLIC, "bg.mp4");
const videoOut = path.join(OUT, "bg.mp4");
const poster = path.join(OUT, "bg-poster.webp");
if (!(await isFresh(video, videoOut))) {
  await mkdir(OUT, { recursive: true });
  const ffmpeg = spawnSync(
    "ffmpeg",
    [
      "-y", "-loglevel", "error", "-i", video,
      "-vf", "scale=-2:720", "-c:v", "libx264", "-preset", "veryslow",
      "-crf", "34", "-pix_fmt", "yuv420p", "-an",
      "-movflags", "+faststart", videoOut,
    ],
    { stdio: "inherit" },
  );
  if (ffmpeg.status !== 0) throw new Error("ffmpeg failed (is it installed?)");
  const frame = spawnSync(
    "ffmpeg",
    ["-y", "-loglevel", "error", "-i", videoOut, "-frames:v", "1", "-f", "image2pipe", "-c:v", "png", "-"],
    { maxBuffer: 64 * 1024 * 1024 },
  );
  if (frame.status !== 0) throw new Error("poster frame failed");
  await sharp(frame.stdout).webp({ quality: 70 }).toFile(poster);
  console.log("video: written");
}
