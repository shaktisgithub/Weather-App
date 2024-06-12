import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

const ToggleTheme = ({ toggleTheme, theme }) => {
  return (
    <button onClick={toggleTheme} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
      {theme === 'light' ? <FiMoon size={24} /> : <FiSun size={24} />}
    </button>
  );
};

export default ToggleTheme;
