import React, { useState } from 'react';

const Dropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const calculatorOptions = [
    { label: 'StockX', value: 'StockX' },
    { label: 'GOAT', value: 'GOAT' },
    { label: 'StockXVsGOAT', value: 'StockXVsGOAT' },
  ];
  return (
    <div
      className="relative inline-block"
      onMouseLeave={() => setShowDropdown(false)}
    >
      {/* Dropdown Button */}
      <button
        className="bg-cornflowerblue text-white px-4 py-2 text-base font-roboto cursor-pointer hover:bg-blue-600"
        onMouseEnter={() => setShowDropdown(true)}
      >
        Calculators ▼
      </button>
      {/* Dropdown Menu */}
      <div
        className={`${
          showDropdown ? 'block' : 'hidden'
        } absolute bg-cornflowerblue text-white w-full z-10 rounded-none`}
      >
        {calculatorOptions.map((option) => (
          <a
            key={option.value}
            href={`/calculators/${option.value}`}
            className="block px-4 py-2 text-center hover:bg-blue-600"
          >
            {option.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;