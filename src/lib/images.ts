import type { ImageMetadata } from 'astro';

const allImages = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/sq/*.*',
  { eager: true }
);

export const sqImages: Record<string, ImageMetadata> = {};
for (const [path, mod] of Object.entries(allImages)) {
  const filename = path.split('/').pop()!;
  sqImages[filename] = mod.default;
}

export function getSqImage(filename: string): ImageMetadata {
  const img = sqImages[filename];
  if (!img) {
    throw new Error(`Image not found: ${filename}`);
  }
  return img;
}
