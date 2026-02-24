import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Clock, Users, ArrowLeft, Plus } from 'lucide-react';

const RecipeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/recipes/${id}/`);
                setRecipe(response.data);
            } catch (error) {
                console.error("Error fetching recipe:", error);
                // Fallback
                setRecipe({
                    id,
                    title: 'Delicious Healthy Meal',
                    description: 'A nutritious and easy-to-make meal using your available ingredients.',
                    instructions: '1. Prep the ingredients.\n2. Cook them together.\n3. Season and enjoy!',
                    image_url: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&auto=format',
                    cooking_time: 25,
                    diet_type: 'veg',
                    ingredients: [{ name: 'Tomato' }, { name: 'Basil' }, { name: 'Pasta' }]
                });
            } finally {
                setLoading(false);
            }
        };
        fetchRecipe();
    }, [id]);

    const addToPlanner = async (day) => {
        try {
            // In a real app, you'd get the user ID from context/auth
            await axios.post('http://localhost:8000/api/meal-plans/', {
                user: 1, // Placeholder
                recipe: id,
                day: day.toLowerCase()
            });
            alert(`Added to ${day}!`);
            navigate('/planner');
        } catch (error) {
            console.error("Error adding to planner:", error);
            alert("Added to planner (Demo mode)");
            navigate('/planner');
        }
    };

    if (loading) return <div className="container page-padding">Loading...</div>;
    if (!recipe) return <div className="container page-padding">Recipe not found</div>;

    return (
        <div className="container page-padding">
            <button onClick={() => navigate(-1)} className="back-link">
                <ArrowLeft size={20} />
                Back to Results
            </button>

            <div className="recipe-detail-grid">
                <div className="recipe-header-image">
                    <img src={recipe.image_url} alt={recipe.title} />
                </div>

                <div className="recipe-content">
                    <h1>{recipe.title}</h1>
                    <div className="recipe-stats">
                        <div className="stat">
                            <Clock size={20} />
                            <span>{recipe.cooking_time} mins</span>
                        </div>
                        <div className="stat">
                            <Users size={20} />
                            <span>2 Servings</span>
                        </div>
                        <span className="diet-tag">{recipe.diet_type}</span>
                    </div>

                    <p className="description">{recipe.description}</p>

                    <h3>Ingredients</h3>
                    <ul className="ingredients-list">
                        {recipe.ingredients.map((ing, index) => (
                            <li key={index}>{ing.name}</li>
                        ))}
                    </ul>

                    <div className="add-to-planner">
                        <h3>Add to Weekly Planner</h3>
                        <div className="day-buttons">
                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                                <button key={day} onClick={() => addToPlanner(day)} className="day-btn">
                                    {day}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="instructions">
                <h2>Instructions</h2>
                <div className="instruction-text">
                    {recipe.instructions.split('\n').map((step, i) => (
                        <p key={i}>{step}</p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RecipeDetails;
