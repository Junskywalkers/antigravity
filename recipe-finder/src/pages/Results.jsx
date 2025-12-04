import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RefreshCw, ArrowLeft } from 'lucide-react';
import RecipeCard from '../components/RecipeCard';
import recipesData from '../data/recipes.json';

function Results() {
    const { genre } = useParams();
    const navigate = useNavigate();
    const [displayedRecipes, setDisplayedRecipes] = useState([]);

    // Filter recipes by genre
    const genreRecipes = recipesData.filter(r => r.category === genre);

    const getRandomRecipes = () => {
        // Shuffle array
        const shuffled = [...genreRecipes].sort(() => 0.5 - Math.random());
        // Get first 3
        return shuffled.slice(0, 3);
    };

    useEffect(() => {
        setDisplayedRecipes(getRandomRecipes());
    }, [genre]);

    const handleReCook = () => {
        setDisplayedRecipes(getRandomRecipes());
    };

    return (
        <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-4 mt-4">
                <button onClick={() => navigate('/')} className="btn btn-secondary" style={{ padding: '8px 12px' }}>
                    <ArrowLeft size={20} />
                </button>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{genre} Recipes</h2>
                <div style={{ width: '44px' }}></div> {/* Spacer for alignment */}
            </div>

            <div className="grid gap-4">
                {displayedRecipes.map(recipe => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </div>

            {displayedRecipes.length === 0 && (
                <div className="text-center p-4">
                    <p>No recipes found for this genre.</p>
                </div>
            )}

            <div className="text-center mt-4" style={{ marginTop: '40px', marginBottom: '40px' }}>
                <button
                    className="btn btn-primary"
                    onClick={handleReCook}
                    style={{ fontSize: '1.2rem', padding: '16px 48px' }}
                >
                    <RefreshCw size={24} style={{ marginRight: '8px' }} />
                    Re Cook!
                </button>
            </div>
        </div>
    );
}

export default Results;
