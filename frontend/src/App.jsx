import React, { useState } from 'react';
import axios from 'axios';
import {
    Sparkles, Utensils, Calendar, ShoppingBag,
    Search, Clock, ChevronRight, Crown, CheckCircle2,
    Zap, Heart, Shield, Mail, Instagram, Twitter, Facebook, Github
} from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

// --- Shared Components ---

const Navbar = () => (
    <nav className="navbar">
        <Link to="/" className="logo-container" style={{ textDecoration: 'none' }}>
            <div className="logo">
                <Crown size={24} fill="currentColor" /> Cookly
            </div>
            <span className="tagline">Plan Smart, Eat Wise</span>
        </Link>
        <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li className="dropdown-trigger">
                Categories
                <div className="dropdown-menu">
                    <Link to="/recipes">Smart Recipe</Link>
                    <Link to="/plan">Meal Planning</Link>
                    <Link to="/weekly">Grocery List</Link>
                </div>
            </li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact Us</a></li>
        </ul>
        <Link to="/plan" className="btn-plan">Plan your meal!</Link>
    </nav>
);

const Footer = () => (
    <footer>
        <div className="logo" style={{ fontSize: '20px' }}>
            <Crown size={20} fill="currentColor" /> Cookly
        </div>
        <div className="social-icons">
            <a href="https://github.com/Sushmitha-134/-cookly.git" target="_blank" rel="noopener noreferrer" className="social-icon"><Github /></a>
            <a href="#" className="social-icon"><Twitter /></a>
            <a href="#" className="social-icon"><Instagram /></a>
        </div>
        <p className="copyright">© 2024 Cookly. All rights reserved. Plan Smart, Eat Wise.</p>
    </footer>
);

// --- Page Components ---

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-container">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <span className="hero-badge">FOOD MEAL PLANNER</span>
                    <h1 className="hero-title">
                        Cookly Your <span className="purple-text">Smart</span> <span className="orange-text">Eat Wise!</span>
                    </h1>
                    <p className="hero-description">
                        Say goodbye to meal planning stress! Get AI-powered recipe suggestions, reduce food waste, and make grocery shopping effortless.
                    </p>
                    <button className="btn-hero" onClick={() => navigate('/plan')}>Try Cookly Now</button>
                </div>
                <div className="hero-image">
                    <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800" alt="Healthy bowl" />
                </div>
            </section>

            {/* Categories Section */}
            <section id="categories">
                <h2 className="section-title">Categories</h2>
                <div className="categories-grid">
                    <div className="category-card">
                        <img src="https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=400" alt="Smart Recipe" />
                        <h3>Smart Recipe</h3>
                        <Link to="/recipes" className="btn-card">Discover Recipes <ChevronRight size={18} /></Link>
                    </div>
                    <div className="category-card">
                        <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=400" alt="Plan Meal" />
                        <h3>Plan Your Meal Effortlessly</h3>
                        <Link to="/plan" className="btn-card">Start Planning <ChevronRight size={18} /></Link>
                    </div>
                    <div className="category-card">
                        <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400" alt="Grocery List" />
                        <h3>Smart Grocery List</h3>
                        <Link to="/weekly" className="btn-card">Get Your List <ChevronRight size={18} /></Link>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="about-section">
                <div className="about-content">
                    <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '20px' }}>Fuel Your Day with Perfectly Planned Meals!</h2>
                    <p className="hero-description">
                        Cookly is your personal AI-powered meal planner. Just enter the ingredients you have, and we’ll suggest smart recipes that match your taste, save time, and reduce waste.
                    </p>
                    <ul className="about-bullets">
                        <li><CheckCircle2 className="bullet-icon" size={20} /> Smart AI-driven recipe suggestions</li>
                        <li><CheckCircle2 className="bullet-icon" size={20} /> Auto-generates weekly meal plans</li>
                        <li><CheckCircle2 className="bullet-icon" size={20} /> Saves money and reduces waste</li>
                        <li><CheckCircle2 className="bullet-icon" size={20} /> Health-conscious & energy-efficient</li>
                    </ul>
                </div>
                <div className="about-image">
                    <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800" alt="Cooking" />
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <h2 className="section-title">What makes Cookly special?</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <Sparkles className="feature-icon" size={32} />
                        <h3>Smart Recipe Suggestions</h3>
                        <p>Get recipes based on what you already have in your kitchen.</p>
                    </div>
                    <div className="feature-card">
                        <ShoppingBag className="feature-icon" size={32} />
                        <h3>Automated Grocery List</h3>
                        <p>Never forget an item again with AI-generated shopping lists.</p>
                    </div>
                    <div className="feature-card">
                        <Zap className="feature-icon" size={32} />
                        <h3>Meal Planning Made Easy</h3>
                        <p>Plan your entire week in just a few clicks.</p>
                    </div>
                    <div className="feature-card">
                        <Heart className="feature-icon" size={32} />
                        <h3>Health-Conscious Planning</h3>
                        <p>Suggestions tailored to your nutritional needs.</p>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="how-it-works">
                <h2 className="section-title">Cook Smart with Cookly!</h2>
                <div className="steps-container">
                    <div className="step-item">
                        <div className="step-number">1</div>
                        <p>Enter your ingredients or pick a recipe</p>
                    </div>
                    <div className="step-item">
                        <div className="step-number">2</div>
                        <p>Get smart grocery list</p>
                    </div>
                    <div className="step-item">
                        <div className="step-number">3</div>
                        <p>Follow step-by-step instructions</p>
                    </div>
                    <div className="step-item">
                        <div className="step-number">4</div>
                        <p>Cook & enjoy meal</p>
                    </div>
                </div>
                <div className="cta-center">
                    <button className="btn-hero" onClick={() => navigate('/plan')}>Get Your Perfect Meal Plan Today!</button>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="contact-section">
                <h2 className="section-title">Get In Touch With Us!</h2>
                <div className="contact-form">
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" placeholder="Your Name" />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" placeholder="your@email.com" />
                    </div>
                    <div className="form-group">
                        <label>Message</label>
                        <textarea className="form-control" rows="4" placeholder="How can we help?"></textarea>
                    </div>
                    <button className="btn-hero" style={{ width: '100%' }}>Submit</button>
                    <div className="support-email">
                        <Mail size={18} inline style={{ marginRight: 8, verticalAlign: 'middle' }} />
                        admin@cookly.in
                    </div>
                </div>
            </section>
        </div>
    );
};

const RecipePage = () => {
    const [foodName, setFoodName] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8000/api/ai/recipe/', { food_name: foodName });
            setResult(response.data);
        } catch (error) {
            console.error(error);
            alert('Something went wrong. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="feature-page">
            <h2 className="section-title">Recipe Instructions</h2>
            <div className="form-group">
                <label>Dish Name</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Pasta Carbonara"
                        value={foodName}
                        onChange={(e) => setFoodName(e.target.value)}
                    />
                    <button className="btn-hero" onClick={handleSearch} disabled={loading || !foodName}>
                        {loading ? '...' : 'Get Recipe'}
                    </button>
                </div>
            </div>

            {loading && (
                <div className="loading-animation">
                    <div className="spinner"></div>
                    <p>Cooking up a plan...</p>
                </div>
            )}

            {result && (
                <div className="result-container animate-fade">
                    <h2 className="purple-text" style={{ marginBottom: '20px' }}>{result.title}</h2>
                    <div className="grid-2">
                        <div>
                            <h4 className="orange-text" style={{ marginBottom: '15px' }}>Ingredients</h4>
                            <ul style={{ listStyle: 'none' }}>
                                {result.ingredients?.map((ing, i) => (
                                    <li key={i} style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>• {ing}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="orange-text" style={{ marginBottom: '15px' }}>Instructions</h4>
                            {result.instructions?.map((step, i) => (
                                <div key={i} style={{ marginBottom: '15px', padding: '15px', background: 'white', borderRadius: '12px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                                    <strong style={{ color: 'var(--primary)' }}>Step {i + 1}:</strong> {step}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const PlanPage = () => {
    const [ingredients, setIngredients] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handlePlan = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8000/api/ai/day-plan/', { meal_varieties: ingredients });
            setResult(response.data);
        } catch (error) {
            console.error(error);
            alert('Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="feature-page">
            <h2 className="section-title">Today's Meal Planner</h2>
            <div className="form-group">
                <label>What ingredients do you have?</label>
                <textarea
                    className="form-control"
                    rows="3"
                    placeholder="e.g. eggs, bread, tomato..."
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Or Upload Image (Coming Soon)</label>
                <input type="file" disabled className="form-control" />
            </div>
            <button className="btn-hero" style={{ width: '100%' }} onClick={handlePlan} disabled={loading || !ingredients}>
                Cook Something!
            </button>

            {loading && <div className="loading-animation"><div className="spinner"></div><p>Planning your day...</p></div>}

            {result && (
                <div className="result-container">
                    <div className="grid-2">
                        {['breakfast', 'lunch', 'dinner'].map((meal) => (
                            <div key={meal} className="category-card" style={{ textAlign: 'left', background: 'white' }}>
                                <h4 className="purple-text" style={{ textTransform: 'capitalize' }}>{meal}</h4>
                                <h3 style={{ fontSize: '18px', margin: '10px 0' }}>{result[meal]?.title}</h3>
                                <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{result[meal]?.instructions?.slice(0, 100)}...</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const WeeklyPage = () => {
    const [groceries, setGroceries] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleWeekly = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8000/api/ai/shopping-plan/', { groceries });
            setResult(response.data);
        } catch (error) {
            console.error(error);
            alert('Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="feature-page">
            <h2 className="section-title">Weekly Meal Planner</h2>
            <div className="form-group">
                <label>Grocery List Input</label>
                <textarea
                    className="form-control"
                    rows="4"
                    placeholder="List your weekly groceries here..."
                    value={groceries}
                    onChange={(e) => setGroceries(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Upload Grocery Image (Coming Soon)</label>
                <input type="file" disabled className="form-control" />
            </div>
            <button className="btn-hero" style={{ width: '100%' }} onClick={handleWeekly} disabled={loading || !groceries}>
                Generate Plan
            </button>

            {loading && <div className="loading-animation"><div className="spinner"></div><p>Generating your week...</p></div>}

            {result && (
                <div className="result-container">
                    <div className="categories-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
                        {Object.entries(result).map(([day, plan]) => (
                            <div key={day} className="category-card" style={{ padding: '20px', textAlign: 'left', background: 'white' }}>
                                <h4 className="purple-text">{day}</h4>
                                <div style={{ fontSize: '12px', marginTop: '10px' }}>
                                    <div style={{ marginBottom: '5px' }}><strong>Morn:</strong> {plan.morning}</div>
                                    <div style={{ marginBottom: '5px' }}><strong>Eve:</strong> {plan.evening}</div>
                                    <div style={{ marginBottom: '5px' }}><strong>Night:</strong> {plan.night}</div>
                                    <div style={{ marginBottom: '5px' }}><strong>Snack:</strong> {plan.snacks}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

// --- Main App Component ---

const App = () => {
    return (
        <Router>
            <div className="app-main">
                <Navbar />
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/recipes" element={<RecipePage />} />
                    <Route path="/plan" element={<PlanPage />} />
                    <Route path="/weekly" element={<WeeklyPage />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;

