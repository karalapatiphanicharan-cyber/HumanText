import React from 'react';

const Header = () => {
  return (
    <header className="py-12 text-center">
      <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
        HumanText
      </h1>
      <p className="text-slate-400 text-xl max-w-2xl mx-auto">
        Transform AI-generated text into natural human writing.
      </p>
    </header>
  );
};

export default Header;
