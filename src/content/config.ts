import { z, defineCollection } from 'astro:content';

const plushies = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    name: z.string(),               // Nom (ex: "Ferris The Crab")
    techs: z.array(z.string()),     // Catégories (ex: ["Rust", "WASM"])
    official_link: z.string().url(),// Lien d'achat ou source
    image: image(),                 // Image locale optimisée par Astro
  }),
});

export const collections = { plushies };
