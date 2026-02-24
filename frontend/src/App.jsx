import React, { useState } from 'react';
import axios from 'axios';
import { Sparkles, Utensils, Calendar, ShoppingBag, Search, Clock, ChevronRight } from 'lucide-react';

const App = () => {
    const [activeTab, setActiveTab] = useState('recipe');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    // Inputs
    const [foodName, setFoodName] = useState('');
    const [mealVarieties, setMealVarieties] = useState('');
    const [groceries, setGroceries] = useState('');

    const fetchAI = async (endpoint, payload) => {
        setLoading(true);
        setResult(null);
        try {
            const response = await axios.post(`http://localhost:8000/api/${endpoint}/`, payload);
            setResult(response.data);
        } catch (error) {
            console.error(error);
            alert('AI is a bit sleepy. Check if backend is running!');
        } finally {
            setLoading(false);
        }
    };

    const handleRecipeSearch = () => fetchAI('ai/recipe', { food_name: foodName });
    const handleDayPlan = () => fetchAI('ai/day-plan', { meal_varieties: mealVarieties });
    const handleShoppingPlan = () => fetchAI('ai/shopping-plan', { groceries: groceries });

    return (
        <div className="app-container">
            <header>
                <h1>GEMINI CHEF</h1>
                <p className="subtitle">Your Personal AI Culinary Assistant</p>
            </header>

            <div className="tabs">
                <button
                    className={`tab-btn ${activeTab === 'recipe' ? 'active' : ''}`}
                    onClick={() => { setActiveTab('recipe'); setResult(null); }}
                >
                    <Search size={18} style={{ marginRight: 8 }} />
                    Find Recipe
                </button>
                <button
                    className={`tab-btn ${activeTab === 'day' ? 'active' : ''}`}
                    onClick={() => { setActiveTab('day'); setResult(null); }}
                >
                    <Utensils size={18} style={{ marginRight: 8 }} />
                    Today's Plan
                </button>
                <button
                    className={`tab-btn ${activeTab === 'week' ? 'active' : ''}`}
                    onClick={() => { setActiveTab('week'); setResult(null); }}
                >
                    <Calendar size={18} style={{ marginRight: 8 }} />
                    Grocery Plan
                </button>
            </div>

            <main className="content-section">
                {activeTab === 'recipe' && (
                    <div className="animate-fade">
                        <h2 className="section-label">Tell me a dish you crave...</h2>
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="e.g. Butter Chicken, Paneer Tikka, Sushi..."
                                value={foodName}
                                onChange={(e) => setFoodName(e.target.value)}
                            />
                            <button className="magic-btn" onClick={handleRecipeSearch} disabled={loading || !foodName}>
                                <Sparkles size={20} />
                                Get Recipe
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'day' && (
                    <div className="animate-fade">
                        <h2 className="section-label">What items do you have for today?</h2>
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="e.g. bread, eggs, chicken, rice..."
                                value={mealVarieties}
                                onChange={(e) => setMealVarieties(e.target.value)}
                            />
                            <button className="magic-btn" onClick={handleDayPlan} disabled={loading || !mealVarieties}>
                                <Sparkles size={20} />
                                Plan Today
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'week' && (
                    <div className="animate-fade">
                        <h2 className="section-label">What's in your shopping bag?</h2>
                        <div className="input-group">
                            <textarea
                                placeholder="List your groceries here..."
                                rows="3"
                                value={groceries}
                                onChange={(e) => setGroceries(e.target.value)}
                                style={{ width: '100%', marginBottom: 15 }}
                            />
                        </div>
                        <button className="magic-btn" onClick={handleShoppingPlan} disabled={loading || !groceries}>
                            <Sparkles size={20} />
                            Generate Weekly Plan
                        </button>
                    </div>
                )}

                {loading && <div className="loader"></div>}

                {result && activeTab === 'recipe' && (
                    <div className="result-card">
                        <h2 className="recipe-title">{result.title}</h2>
                        <div className="grid-2">
                            <div>
                                <h3 className="section-label"><ShoppingBag size={20} /> Ingredients</h3>
                                <ul>
                                    {result.ingredients?.map((ing, i) => <li key={i}>{ing}</li>)}
                                </ul>
                            </div>
                            <div>
                                <h3 className="section-label"><Clock size={20} /> Instructions</h3>
                                {result.instructions?.map((step, i) => (
                                    <div key={i} className="step-card">
                                        <span className="step-num">{i + 1}</span> {step}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {result && activeTab === 'day' && (
                    <div className="result-card">
                        <div className="grid-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                            {['breakfast', 'lunch', 'dinner'].map((meal) => (
                                <div key={meal} className="day-card">
                                    <h3><span style={{ textTransform: 'capitalize' }}>{meal}</span></h3>
                                    <h4 style={{ color: 'white', marginBottom: 10 }}>{result[meal]?.title}</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>{result[meal]?.instructions?.slice(0, 100)}...</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {result && activeTab === 'week' && (
                    <div className="result-card">
                        <div className="week-grid">
                            {Object.entries(result).map(([day, plan]) => (
                                <div key={day} className="day-card">
                                    <h3>{day}</h3>
                                    <div className="time-slot"><span className="time-label">Morning:</span> <span>{plan.morning}</span></div>
                                    <div className="time-slot"><span className="time-label">Evening:</span> <span>{plan.evening}</span></div>
                                    <div className="time-slot"><span className="time-label">Night:</span> <span>{plan.night}</span></div>
                                    <div className="time-slot"><span className="time-label">Snacks:</span> <span>{plan.snacks}</span></div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default App;
