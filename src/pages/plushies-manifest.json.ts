export const prerender = true;
import { getCollection } from 'astro:content';
import { getImage } from 'astro:assets';

export async function GET() {
    const plushies = await getCollection('plushies');

    const manifest: Record<string, any> = {};

    for (const plushie of plushies) {
        const optimizedImage = await getImage({ src: plushie.data.image, format: 'webp' });

        manifest[plushie.slug] = {
            name: plushie.data.name,
            techs: plushie.data.techs,
            image: optimizedImage.src
        };
    }

    return new Response(JSON.stringify(manifest), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
