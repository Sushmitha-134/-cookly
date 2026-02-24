import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Utensils, Clock, Leaf } from 'lucide-react';

const Home = () => {
    const [ingredients, setIngredients] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (ingredients.trim()) {
            navigate(`/recipes?ingredients=${encodeURIComponent(ingredients)}`);
        } else {
            navigate('/recipes');
        }
    };

    return (
        <div className="home-page">
            <section className="hero">
                <div className="container hero-content animate-fade-in">
                    <h1>Smart AI Meal Planner</h1>
                    <p>Transform your leftover ingredients into delicious healthy meals with Cookly.</p>

                    <form className="search-bar glass" onSubmit={handleSearch}>
                        <Search size={24} color="var(--text-light)" />
                        <input
                            type="text"
                            placeholder="Enter ingredients (extra tomato, chicken, pasta...)"
                            value={ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                        />
                        <button type="submit">Find Recipes</button>
                    </form>

                    <div className="hero-features">
                        <div className="feature">
                            <Utensils size={24} />
                            <span>Personalized Plans</span>
                        </div>
                        <div className="feature">
                            <Clock size={24} />
                            <span>Save Time</span>
                        </div>
                        <div className="feature">
                            <Leaf size={24} />
                            <span>Healthy Choices</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="how-it-works container">
                <h2 className="section-title">How it works</h2>
                <div className="steps">
                    <div className="step">
                        <div className="step-number">1</div>
                        <h3>Input Ingredients</h3>
                        <p>Tell us what you have in your fridge.</p>
                    </div>
                    <div className="step">
                        <div className="step-number">2</div>
                        <h3>Get AI Recipes</h3>
                        <p>Our AI suggests recipes based on your ingredients and dietary needs.</p>
                    </div>
                    <div className="step">
                        <div className="step-number">3</div>
                        <h3>Plan Your Week</h3>
                        <p>Add your favorite recipes to your weekly calendar.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
