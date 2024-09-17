import React, { useState } from 'react';

const Taskbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const calculators = [
        { name: 'StockX', path: '/calculators/StockX' },
        { name: 'GOAT', path: '/calculators/GOAT' },
        { name: 'StockXVsGOAT', path: '/calculators/StockXVsGOAT' },
    ];

    return (
        <header className="bg-cornflowerblue">
            <div className="flex items-center justify-between px-4 py-3">
                <div>
                    <h1 className="font-roboto text-white text-lg sm:text-2lg md:text-3xl lg:text-4lg">ProfitBreeze</h1>
                </div>
                {/* Hamburger icon for smaller screens */}
                <button onClick={() => setMenuOpen(!menuOpen)} className="sm:hidden text-white">
                    <span className="text-3xl">{menuOpen ? '✕' : '☰'}</span>
                </button>
                {/* Normal view */}
                <div className={`hidden sm:flex space-x-4`}>
                    <a href="/" className="text-cornflowerblue bg-white hover:shadow-md focus:ring-4 focus:outline-none focus:ring-cornflowerblue/50 font-roboto rounded-lg px-3 py-2">
                        Home
                    </a>
                    {calculators.map((calc, index) => (
                        <a
                            key={index}
                            href={calc.path}
                            className="text-cornflowerblue bg-white hover:shadow-md focus:ring-4 focus:outline-none focus:ring-cornflowerblue/50 font-roboto rounded-lg px-3 py-2"
                        >
                            {calc.name}
                        </a>
                    ))}
                </div>
            </div>
            {/* Smaller view with buttons showing when menuOpen is true */}
            {menuOpen && (
                <div className="sm:hidden bg-cornflowerblue w-full py-4">
                    <ul className="space-y-4 px-6">
                        <li>
                            <a href="/" className="text-white font-roboto text-lg hover:underline" onClick={() => setMenuOpen(false)}>
                                Home
                            </a>
                        </li>
                        {calculators.map((calc, index) => (
                            <li key={index}>
                                <a href={calc.path} className="text-white font-roboto text-lg hover:underline" onClick={() => setMenuOpen(false)}>
                                    {calc.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Taskbar;
