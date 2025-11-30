import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function Auth() {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signIn = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: window.location.origin
            }
        });
    };

    const signOut = async () => {
        await supabase.auth.signOut();
    };

    if (user) {
        return (
            <div className="flex items-center gap-4">
                {user.user_metadata.avatar_url && (
                    <a href={`/u/${user.user_metadata.user_name}`} className="hover:scale-110 transition-transform">
                        <img src={user.user_metadata.avatar_url} alt={user.user_metadata.user_name} className="w-8 h-8 rounded-full border border-[var(--accent-neon)]" />
                    </a>
                )}
                <button onClick={signOut} className="btn-archive text-xs">LOGOUT</button>
            </div>
        );
    }

    return (
        <button onClick={signIn} className="btn-archive">LOGIN [GITHUB]</button>
    );
}
