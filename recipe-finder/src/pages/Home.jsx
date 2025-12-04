import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const GENRES = [
    '和食', '中華', '洋食', '韓国', 'イタリアン', 'インド', 'メキシカン'
];

function Home() {
    const [selectedGenre, setSelectedGenre] = useState(null);
    const navigate = useNavigate();

    const handleGenreClick = (genre) => {
        setSelectedGenre(genre);
    };

    const handleLetsCook = () => {
        if (selectedGenre) {
            navigate(`/results/${selectedGenre}`);
        }
    };

    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-4 mt-4">
                <h2 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>Select a Genre</h2>
                <Link to="/favorites" className="btn btn-secondary" style={{ padding: '8px 16px' }}>
                    <Star size={18} fill="var(--warning)" color="var(--warning)" />
                    Favorites
                </Link>
            </div>

            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '16px' }}>
                {GENRES.map(genre => (
                    <button
                        key={genre}
                        onClick={() => handleGenreClick(genre)}
                        style={{
                            padding: '24px',
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            backgroundColor: selectedGenre === genre ? 'var(--primary)' : 'var(--surface)',
                            color: selectedGenre === genre ? 'white' : 'var(--text)',
                            border: selectedGenre === genre ? '2px solid var(--primary)' : '2px solid transparent',
                            borderRadius: 'var(--radius)',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            boxShadow: selectedGenre === genre ? '0 4px 12px rgba(255, 107, 107, 0.4)' : 'none',
                            transform: selectedGenre === genre ? 'scale(1.05)' : 'scale(1)'
                        }}
                    >
                        {genre}
                    </button>
                ))}
            </div>

            <div className="text-center mt-4" style={{ marginTop: '40px' }}>
                <button
                    className="btn btn-primary"
                    onClick={handleLetsCook}
                    disabled={!selectedGenre}
                    style={{
                        fontSize: '1.2rem',
                        padding: '16px 48px',
                        opacity: selectedGenre ? 1 : 0.5,
                        cursor: selectedGenre ? 'pointer' : 'not-allowed'
                    }}
                >
                    Let's Cook!
                </button>
            </div>
        </div>
    );
}

export default Home;
