export const prerender = true;
import { getCollection } from 'astro:content';
import { getImage } from 'astro:assets';
import { getPlushieImage } from '../utils/images';

export async function GET() {
    const plushies = await getCollection('plushies');

    const manifest: Record<string, any> = {};

    for (const plushie of plushies) {
        const imageSrc = getPlushieImage(plushie.slug);
        
        if (imageSrc) {
            const optimizedImage = await getImage({ src: imageSrc, format: 'webp' });

            manifest[plushie.slug] = {
                name: plushie.data.name,
                techs: plushie.data.techs,
                image: optimizedImage.src
            };
        }
    }

    return new Response(JSON.stringify(manifest), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
