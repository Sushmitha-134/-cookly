import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChefHat, Calendar, ShoppingCart, Search, Home } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();

    const navItems = [
        { path: '/', icon: <Home size={20} />, label: 'Home' },
        { path: '/recipes', icon: <Search size={20} />, label: 'Recipes' },
        { path: '/planner', icon: <Calendar size={20} />, label: 'Planner' },
        { path: '/grocery', icon: <ShoppingCart size={20} />, label: 'Grocery' },
    ];

    return (
        <nav className="navbar glass">
            <div className="container nav-content">
                <Link to="/" className="logo">
                    <ChefHat size={32} color="var(--primary)" />
                    <span>Cookly</span>
                </Link>
                <div className="nav-links">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
