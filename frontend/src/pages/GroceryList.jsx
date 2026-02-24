import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingBasket, CheckCircle2 } from 'lucide-react';

const GroceryList = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchGroceryList();
    }, []);

    const fetchGroceryList = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/meal-plans/grocery_list/?user_id=1');
            setItems(response.data);
        } catch (error) {
            console.error("Error fetching grocery list:", error);
            // Fallback
            setItems([
                { name: 'Avocados', count: 2, checked: false },
                { name: 'Bread', count: 1, checked: true },
                { name: 'Chicken Breast', count: 2, checked: false },
                { name: 'Lettuce', count: 1, checked: false },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const toggleCheck = (index) => {
        const newItems = [...items];
        newItems[index].checked = !newItems[index].checked;
        setItems(newItems);
    };

    return (
        <div className="container page-padding">
            <div className="grocery-header text-center">
                <h1>Your Grocery List</h1>
                <p>Everything you need for your planned meals.</p>
            </div>

            <div className="grocery-list animate-fade-in">
                <div className="list-meta">
                    <ShoppingBasket size={24} color="var(--primary)" />
                    <span>{items.filter(i => !i.checked).length} items remaining</span>
                </div>

                {items.length > 0 ? (
                    <div className="items-container">
                        {items.map((item, index) => (
                            <div key={index} className={`grocery-item ${item.checked ? 'checked' : ''}`}>
                                <input
                                    type="checkbox"
                                    checked={item.checked}
                                    onChange={() => toggleCheck(index)}
                                    id={`item-${index}`}
                                />
                                <label htmlFor={`item-${index}`}>
                                    <span className="item-name">{item.name}</span>
                                    {item.count > 1 && <span className="item-count">x{item.count}</span>}
                                </label>
                                {item.checked && <CheckCircle2 size={18} color="var(--primary)" />}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-items">
                        <p>Your list is empty. Plan some meals to see ingredients here!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GroceryList;
