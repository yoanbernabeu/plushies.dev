import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function LikeButton({ slug, compact = false }: { slug: string; compact?: boolean }) {
    const [hasPlushie, setHasPlushie] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        // Check auth and fetch status
        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user);
            if (user) {
                checkCollection(user.id);
            } else {
                setLoading(false);
            }
        });
    }, []);

    const checkCollection = async (userId: string) => {
        const { data } = await supabase
            .from('user_collections')
            .select('*')
            .eq('user_id', userId)
            .eq('plushie_slug', slug)
            .single();

        if (data) setHasPlushie(true);
        setLoading(false);
    };

    const toggleCollection = async (e: React.MouseEvent) => {
        // Prevent card click when clicking the button
        e.preventDefault();
        e.stopPropagation();

        if (!user) {
            alert('Please login to collect plushies!');
            return;
        }

        // Optimistic UI
        const previousState = hasPlushie;
        setHasPlushie(!previousState);

        if (!previousState) {
            // Add
            const { error } = await supabase
                .from('user_collections')
                .insert({ user_id: user.id, plushie_slug: slug });

            if (error) {
                console.error(error);
                setHasPlushie(previousState); // Revert
            }
        } else {
            // Remove
            const { error } = await supabase
                .from('user_collections')
                .delete()
                .eq('user_id', user.id)
                .eq('plushie_slug', slug);

            if (error) {
                console.error(error);
                setHasPlushie(previousState); // Revert
            }
        }
    };

    if (loading) return null;

    if (compact) {
        // Compact version for grid cards
        return (
            <button
                onClick={toggleCollection}
                className={`px-12 py-6 text-xs font-mono uppercase tracking-widest rounded-md border transition-all backdrop-blur-sm ${hasPlushie
                        ? 'border-[var(--accent-neon)] bg-[var(--accent-neon)] text-black font-bold shadow-[0_0_10px_var(--accent-neon)]'
                        : 'border-[var(--card-border)] bg-black/40 text-[var(--text-muted)] hover:border-[var(--accent-neon)] hover:text-[var(--accent-neon)] hover:bg-black/60'
                    }`}
            >
                {hasPlushie ? '✓ OWNED' : 'I HAVE THIS'}
            </button>
        );
    }

    return (
        <button
            onClick={toggleCollection}
            className={`btn-archive ${hasPlushie ? '!border-[var(--accent-neon)] !text-[var(--accent-neon)]' : ''}`}
        >
            {hasPlushie ? 'ACQUIRED [✓]' : 'I HAVE THIS'}
        </button>
    );
}
