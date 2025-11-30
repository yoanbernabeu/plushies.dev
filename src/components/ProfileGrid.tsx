import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import PlushieCardClient from './PlushieCardClient';
import PlaceholderCardClient from './PlaceholderCardClient';

interface Props {
    username: string;
}

export default function ProfileGrid({ username }: Props) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [profile, setProfile] = useState<any>(null);
    const [plushies, setPlushies] = useState<any[]>([]);
    const [visibleCount, setVisibleCount] = useState(8);

    useEffect(() => {
        loadProfile();
    }, [username]);

    async function loadProfile() {
        try {
            // 1. Get User ID from username
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('id, username, avatar_url')
                .eq('username', username)
                .single();

            if (profileError || !profileData) {
                setError('USER NOT FOUND');
                setLoading(false);
                return;
            }

            setProfile(profileData);

            // 2. Get Collection
            const { data: collection } = await supabase
                .from('user_collections')
                .select('plushie_slug')
                .eq('user_id', profileData.id);

            // 3. Get Manifest
            const response = await fetch('/plushies-manifest.json');
            const manifest = await response.json();

            // 4. Build plushies array
            const plushiesData = collection?.map((item: any) => {
                const plushie = manifest[item.plushie_slug];
                if (!plushie) return null;
                return {
                    slug: item.plushie_slug,
                    ...plushie,
                    owned: true
                };
            }).filter(Boolean) || [];

            setPlushies(plushiesData);
            setLoading(false);
        } catch (err) {
            setError('Error loading profile');
            setLoading(false);
        }
    }

    const loadMore = () => {
        setVisibleCount(prev => prev + 8);
    };

    if (loading) {
        return (
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">LOADING PROFILE...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center">
                <h1 className="text-4xl font-bold text-red-500">{error}</h1>
            </div>
        );
    }

    const placeholderCount = Math.max(0, 7 - plushies.length);
    const totalItems = plushies.length + placeholderCount;
    const hasMore = visibleCount < totalItems;

    const getRank = (count: number) => {
        if (count >= 10) return 'VETERAN';
        if (count >= 3) return 'COLLECTOR';
        return 'NOVICE';
    };

    const rank = getRank(plushies.length);

    return (
        <>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 pb-16 text-center md:text-left relative z-10 bg-[var(--bg-color)]">
                <div className="relative">
                    <img
                        src={profile.avatar_url}
                        className="w-32 h-32 rounded-full border-2 border-[var(--accent-neon)] bg-[var(--card-bg)] object-cover"
                        alt={profile.username}
                    />
                    <div className="absolute -bottom-2 -right-2 bg-[var(--bg-color)] px-2 py-1 border border-[var(--accent-neon)] rounded text-[10px] font-mono text-[var(--accent-neon)] uppercase shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                        {rank}
                    </div>
                </div>

                <div className="flex-1 max-w-2xl">
                    <div className="flex flex-col md:flex-row items-center md:items-baseline gap-4 flex-wrap justify-center md:justify-start">
                        <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter break-all">
                            {profile.username}
                        </h1>
                        <a
                            href={`https://github.com/${profile.username}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--text-muted)] hover:text-[var(--accent-neon)] transition-colors flex items-center gap-2 text-sm font-mono"
                        >
                            <span>github.com/{profile.username}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                        </a>
                    </div>

                    <div className="mt-6 flex gap-8 text-sm font-mono text-[var(--text-muted)] uppercase justify-center md:justify-start">
                        <div>
                            <span className="block text-[10px] opacity-60">Collection Size</span>
                            <span className="text-xl text-[var(--text-main)]">{plushies.length}</span> ITEMS
                        </div>
                        <div>
                            <span className="block text-[10px] opacity-60">Rank</span>
                            <span className="text-xl text-[var(--text-main)]">{rank}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Spacer to prevent overlap */}
            <div className="h-32 w-full"></div>

            <section className="archive-grid">
                {plushies.slice(0, visibleCount).map((plushie, index) => (
                    <PlushieCardClient key={index} {...plushie} />
                ))}
                {Array.from({ length: Math.min(placeholderCount, Math.max(0, visibleCount - plushies.length)) }).map((_, index) => (
                    <PlaceholderCardClient key={`placeholder-${index}`} type="empty" />
                ))}
            </section>

            {hasMore && (
                <div className="text-center mt-12 mb-8">
                    <button onClick={loadMore} className="btn-archive text-lg px-8 py-4">
                        LOAD MORE [+{totalItems - visibleCount}]
                    </button>
                </div>
            )}
        </>
    );
}
