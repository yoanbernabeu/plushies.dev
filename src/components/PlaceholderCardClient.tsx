interface Props {
    type?: 'coming-soon' | 'empty';
}

export default function PlaceholderCardClient({ type = 'coming-soon' }: Props) {
    const isComingSoon = type === 'coming-soon';

    return (
        <article className="specimen-card opacity-30">
            <div className="card-header">
                <span>ID: {isComingSoon ? 'COMING_SOON' : 'NOT_OWNED'}</span>
                <span>{isComingSoon ? '[LOCKED]' : '[EMPTY]'}</span>
            </div>
            <div className="card-visual">
                <div className="visual-grid"></div>
                <div className="plush-img flex items-center justify-center text-[var(--text-muted)] text-6xl">
                    {isComingSoon ? '?' : '∅'}
                </div>
            </div>
            <div className="rarity-tag">
                {isComingSoon ? 'COMING SOON // ARCHIVE' : 'NOT IN COLLECTION'}
            </div>
            <div className="card-footer">
                <span className="specimen-tech">
                    // {isComingSoon ? 'PLACEHOLDER' : 'EMPTY_SLOT'}
                </span>
                <h2 className="specimen-name">
                    {isComingSoon ? 'More Coming Soon' : 'Not Yet Collected'}
                </h2>
                <div className="action-row">
                    <span style={{ fontFamily: "'Space Mono'", fontSize: '0.7rem', color: '#555' }}>
                        QTY: {isComingSoon ? '?' : '0'}
                    </span>
                    <button className="btn-archive" disabled>
                        {isComingSoon ? 'LOCKED' : 'EMPTY'}
                    </button>
                </div>
            </div>
        </article>
    );
}
