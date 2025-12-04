import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat } from 'lucide-react';

function Header() {
    return (
        <header style={{
            backgroundColor: 'var(--surface)',
            padding: '16px 0',
            boxShadow: 'var(--shadow)',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            <div className="container flex items-center justify-center">
                <Link to="/" className="flex items-center gap-2" style={{ textDecoration: 'none' }}>
                    <ChefHat color="var(--primary)" size={32} />
                    <h1 style={{
                        fontSize: '1.5rem',
                        fontWeight: '800',
                        background: 'linear-gradient(45deg, var(--primary), var(--warning))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Cooking Finder
                    </h1>
                </Link>
            </div>
        </header>
    );
}

export default Header;
