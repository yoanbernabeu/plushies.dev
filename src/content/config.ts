import { z, defineCollection } from 'astro:content';

const plushies = defineCollection({
  type: 'content',
  schema: () => z.object({
    name: z.string(),               // Nom (ex: "Ferris The Crab")
    techs: z.array(z.string()),     // Catégories (ex: ["Rust", "WASM"])
    official_link: z.string().url(),// Lien d'achat ou source
  }),
});

export const collections = { plushies };
