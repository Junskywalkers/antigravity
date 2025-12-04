import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import RecipeCard from '../components/RecipeCard';
import { FavoritesContext } from '../App';
import recipesData from '../data/recipes.json';

function Favorites() {
    const { favorites } = useContext(FavoritesContext);
    const navigate = useNavigate();

    // Get full recipe objects for favorite IDs
    const favoriteRecipes = recipesData.filter(r => favorites.includes(r.id));

    return (
        <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-4 mt-4">
                <button onClick={() => navigate('/')} className="btn btn-secondary" style={{ padding: '8px 12px' }}>
                    <ArrowLeft size={20} />
                </button>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>My Favorites</h2>
                <div style={{ width: '44px' }}></div>
            </div>

            <div className="grid gap-4">
                {favoriteRecipes.map(recipe => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </div>

            {favoriteRecipes.length === 0 && (
                <div className="text-center p-4" style={{ marginTop: '40px' }}>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                        No favorites yet. Go find some delicious recipes!
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="btn btn-primary mt-4"
                    >
                        Go to Home
                    </button>
                </div>
            )}
        </div>
    );
}

export default Favorites;
