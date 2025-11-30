import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Collector {
    username: string;
    avatar_url: string;
}

export default function CollectorList({ slug }: { slug: string }) {
    const [collectors, setCollectors] = useState<Collector[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCollectors();
    }, [slug]);

    const fetchCollectors = async () => {
        // 1. Get total count
        const { count } = await supabase
            .from('user_collections')
            .select('*', { count: 'exact', head: true })
            .eq('plushie_slug', slug);

        setTotalCount(count || 0);

        // 2. Get last 5 collectors
        const { data } = await supabase
            .from('user_collections')
            .select(`
                user_id,
                profiles:user_id (
                    username,
                    avatar_url
                )
            `)
            .eq('plushie_slug', slug)
            .order('created_at', { ascending: false })
            .limit(5);

        if (data) {
            // @ts-ignore - Supabase types mapping is sometimes tricky
            const mappedCollectors = data.map((item: any) => ({
                username: item.profiles.username,
                avatar_url: item.profiles.avatar_url
            })).filter((c: any) => c.username && c.avatar_url);
            
            setCollectors(mappedCollectors);
        }
        setLoading(false);
    };

    if (loading) return <div className="h-8 animate-pulse bg-white/5 rounded w-32"></div>;

    if (totalCount === 0) {
        return (
            <div className="flex items-center gap-2 text-[10px] font-mono text-[var(--text-muted)] uppercase">
                <span>Be the first to collect this!</span>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
                {collectors.map((collector, i) => (
                    <a 
                        key={collector.username} 
                        href={`/u/${collector.username}`}
                        title={collector.username}
                        className="relative hover:scale-110 transition-transform z-0 hover:z-10"
                    >
                        <img 
                            src={collector.avatar_url} 
                            alt={collector.username}
                            className="w-8 h-8 rounded-full border border-[var(--bg-color)] bg-[var(--card-bg)]"
                        />
                    </a>
                ))}
            </div>
            <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase">
                <span className="text-[var(--accent-neon)] font-bold">{totalCount}</span> OWNERS
            </div>
        </div>
    );
}

