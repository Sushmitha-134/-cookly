import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const WeeklyPlanner = () => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    useEffect(() => {
        fetchPlans();
    }, []);

    const fetchPlans = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/meal-plans/?user_id=1');
            setPlans(response.data);
        } catch (error) {
            console.error("Error fetching plans:", error);
            // Fallback
            setPlans([
                { id: 1, day: 'monday', recipe_details: { id: 1, title: 'Avocado Toast' } },
                { id: 2, day: 'wednesday', recipe_details: { id: 2, title: 'Chicken Salad' } },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const deletePlan = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/meal-plans/${id}/`);
            setPlans(plans.filter(p => p.id !== id));
        } catch (error) {
            // Demo delete
            setPlans(plans.filter(p => p.id !== id));
        }
    };

    return (
        <div className="container page-padding">
            <div className="planner-header">
                <h1>Your Weekly Meal Plan</h1>
                <p>Stay organized and eat healthy throughout the week.</p>
            </div>

            <div className="planner-grid">
                {days.map(day => (
                    <div key={day} className="day-column animate-fade-in">
                        <h3>{day}</h3>
                        <div className="day-meals">
                            {plans.filter(p => p.day === day).map(plan => (
                                <div key={plan.id} className="planned-meal">
                                    <Link to={`/recipe/${plan.recipe_details.id}`}>
                                        {plan.recipe_details.title}
                                    </Link>
                                    <button onClick={() => deletePlan(plan.id)} className="delete-btn">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                            {plans.filter(p => p.day === day).length === 0 && (
                                <Link to="/recipes" className="add-meal-link">
                                    + Add Meal
                                </Link>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeeklyPlanner;
