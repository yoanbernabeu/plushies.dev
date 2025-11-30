import LikeButton from './LikeButton';

interface PlushieCardClientProps {
    slug: string;
    name: string;
    techs: string[];
    image: string;
    owned?: boolean;
}

export default function PlushieCardClient({ slug, name, techs, image, owned = false }: PlushieCardClientProps) {
    return (
        <a href={`/plushie/${slug}`} className="specimen-card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="card-header">
                <span>ID: {slug.toUpperCase()}</span>
                <LikeButton slug={slug} compact />
            </div>
            <div className="card-visual">
                <div className="visual-grid"></div>
                <img src={image} alt={name} className="plush-img" width="300" height="300" />
            </div>
            <div className="rarity-tag">CONFIDENTIAL // ARCHIVE</div>
            <div className="card-footer">
                <span className="specimen-tech">// {techs.join('::').toUpperCase()}</span>
                <h2 className="specimen-name">{name}</h2>
                <div className="action-row">
                    <span style={{ fontFamily: "'Space Mono'", fontSize: '0.7rem', color: '#555' }}>QTY: 1</span>
                </div>
            </div>
        </a>
    );
}
