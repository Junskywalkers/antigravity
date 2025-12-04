import React, { useContext } from 'react';
import { Star, Youtube, BookOpen } from 'lucide-react';
import { FavoritesContext } from '../App';

function RecipeCard({ recipe }) {
    const { favorites, toggleFavorite } = useContext(FavoritesContext);
    const isFavorite = favorites.includes(recipe.id);

    return (
        <div className="card animate-fade-in">
            <div style={{ position: 'relative', height: '200px' }}>
                <img
                    src={recipe.image_url}
                    alt={recipe.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <button
                    onClick={() => toggleFavorite(recipe.id)}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'rgba(0,0,0,0.6)',
                        borderRadius: '50%',
                        padding: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backdropFilter: 'blur(4px)'
                    }}
                >
                    <Star
                        size={24}
                        fill={isFavorite ? 'var(--warning)' : 'none'}
                        color="var(--warning)"
                    />
                </button>
            </div>

            <div className="p-4">
                <h3 style={{ fontSize: '1.4rem', marginBottom: '8px', color: 'var(--primary)' }}>{recipe.title}</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '0.95rem' }}>
                    {recipe.description}
                </p>

                {/* Ingredients Section */}
                <div className="mb-4" style={{ backgroundColor: '#333', padding: '12px', borderRadius: '8px' }}>
                    <h4 style={{ fontSize: '1rem', marginBottom: '8px', color: 'var(--text)', borderBottom: '1px solid #444', paddingBottom: '4px' }}>
                        材料 (Ingredients)
                    </h4>
                    <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                            <li key={index} style={{ marginBottom: '4px' }}>{ingredient}</li>
                        ))}
                    </ul>
                </div>

                <div className="mb-4">
                    <h4 style={{ fontSize: '1rem', marginBottom: '8px', color: 'var(--text)' }}>作り方 (Steps):</h4>
                    <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)' }}>
                        {recipe.steps.map((step, index) => (
                            <li key={index} style={{ marginBottom: '4px' }}>{step}</li>
                        ))}
                    </ol>
                </div>

                {/* Source Citation */}
                {recipe.source && (
                    <div className="mb-4 flex items-center gap-2" style={{ fontSize: '0.8rem', color: '#888' }}>
                        <BookOpen size={14} />
                        <span>Source: {recipe.source}</span>
                    </div>
                )}

                {recipe.video_url && (
                    <a
                        href={recipe.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary"
                        style={{ width: '100%', marginTop: '8px' }}
                    >
                        <Youtube size={20} color="#FF0000" />
                        Watch Video
                    </a>
                )}
            </div>
        </div>
    );
}

export default RecipeCard;
