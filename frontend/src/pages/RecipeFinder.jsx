import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { Filter, Clock, ChevronRight, Sparkles } from 'lucide-react';

const RecipeFinder = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [diet, setDiet] = useState('');
    const location = useLocation();
    const [generating, setGenerating] = useState(false);
    const [generatedRecipe, setGeneratedRecipe] = useState(null);
    const searchParams = new URLSearchParams(location.search);
    const initialIngredients = searchParams.get('ingredients') || '';

    useEffect(() => {
        fetchRecipes(initialIngredients, diet);
    }, [initialIngredients, diet]);

    const fetchRecipes = async (ingredients, selectedDiet) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8000/api/recipes/search/`, {
                params: { ingredients, diet: selectedDiet }
            });
            setRecipes(response.data);
        } catch (error) {
            console.error("Error fetching recipes:", error);
            // Fallback data for demonstration
            setRecipes([
                { id: 1, title: 'Avocado Toast', image_url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500&auto=format', cooking_time: 15, diet_type: 'vegan' },
                { id: 2, title: 'Chicken Salad', image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format', cooking_time: 25, diet_type: 'non-veg' },
                { id: 3, title: 'Quinoa Bowl', image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format', cooking_time: 20, diet_type: 'veg' },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const generateRecipe = async () => {
        if (!initialIngredients) return;
        setGenerating(true);
        try {
            const response = await axios.post(`http://localhost:8000/api/recipes/generate/`, {
                ingredients: initialIngredients.split(','),
                diet: diet
            });
            setGeneratedRecipe(response.data);
        } catch (error) {
            console.error("Error generating recipe:", error);
            alert("Failed to generate recipe. Please try again.");
        } finally {
            setGenerating(false);
        }
    };

    const dietFilters = [
        { value: '', label: 'All Diets' },
        { value: 'veg', label: 'Vegetarian' },
        { value: 'non-veg', label: 'Non-Vegetarian' },
        { value: 'vegan', label: 'Vegan' },
        { value: 'keto', label: 'Keto' },
    ];

    return (
        <div className="container page-padding">
            <div className="finder-header">
                <h1>Find Your Perfect Meal</h1>
                <div className="filters">
                    <Filter size={20} />
                    {dietFilters.map((f) => (
                        <button
                            key={f.value}
                            className={`filter-btn ${diet === f.value ? 'active' : ''}`}
                            onClick={() => setDiet(f.value)}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
                <button
                    className="generate-btn glass"
                    onClick={generateRecipe}
                    disabled={generating || !initialIngredients}
                >
                    <Sparkles size={18} />
                    {generating ? 'Magic in progress...' : 'Generate Magic Recipe'}
                </button>
            </div>

            {generatedRecipe && (
                <div className="generated-recipe-section animate-fade-in glass">
                    <div className="generated-header">
                        <h2>✨ Magic Suggestion: {generatedRecipe.title}</h2>
                        <button className="close-btn" onClick={() => setGeneratedRecipe(null)}>×</button>
                    </div>
                    <div className="generated-content">
                        <p className="description">{generatedRecipe.description}</p>
                        <div className="recipe-details-grid">
                            <div className="detail-item">
                                <strong>Instructions:</strong>
                                <p>{generatedRecipe.instructions}</p>
                            </div>
                            <div className="detail-item">
                                <strong>Ingredients needed:</strong>
                                <ul>
                                    {generatedRecipe.ingredients_needed?.map((ing, i) => (
                                        <li key={i}>{ing}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="recipe-meta-tags">
                            <span><Clock size={14} /> {generatedRecipe.cooking_time} mins</span>
                            <span className="diet-badge-gen">{generatedRecipe.diet_type}</span>
                        </div>
                    </div>
                </div>
            )}

            {loading ? (
                <div className="loading">Cooking up results...</div>
            ) : (
                <div className="recipe-grid">
                    {recipes.length > 0 ? recipes.map((recipe) => (
                        <div key={recipe.id} className="recipe-card animate-fade-in">
                            <div className="recipe-image">
                                <img src={recipe.image_url || 'https://via.placeholder.com/300x200?text=Food'} alt={recipe.title} />
                                <span className="diet-badge">{recipe.diet_type}</span>
                            </div>
                            <div className="recipe-info">
                                <h3>{recipe.title}</h3>
                                <div className="recipe-meta">
                                    <Clock size={16} />
                                    <span>{recipe.cooking_time} mins</span>
                                </div>
                                <Link to={`/recipe/${recipe.id}`} className="view-btn">
                                    View Details
                                    <ChevronRight size={16} />
                                </Link>
                            </div>
                        </div>
                    )) : (
                        <div className="no-results">No recipes found. Try different ingredients!</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default RecipeFinder;
