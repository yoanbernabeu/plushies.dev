import type { ImageMetadata } from "astro";

export function getPlushieImage(slug: string) {
  // Vite's import.meta.glob is the standard way to import dynamic assets
  // We import all pngs from src/assets
  const images = import.meta.glob<{ default: ImageMetadata }>("../assets/*.png", { eager: true });
  
  // Construct the expected path
  const imagePath = `../assets/${slug}.png`;
  
  // Return the image module if found, otherwise undefined (or a placeholder)
  if (images[imagePath]) {
    return images[imagePath].default;
  }
  
  console.error(`Image not found for slug: ${slug}. Expected at: ${imagePath}`);
  return undefined; 
}

