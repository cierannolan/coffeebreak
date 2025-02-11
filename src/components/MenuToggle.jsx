import React from 'react';
import toggleIcon from '../assets/images/toggle.png';

const MenuToggle = ({ toggleMenu }) => (
    <button className="menu-toggle-button" onClick={toggleMenu}>
        <img src={toggleIcon} alt="Menu Toggle" />
    </button>
);

export default MenuToggle