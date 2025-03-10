import React from 'react';
import toggle from '../assets/images/toggle.png';

const MenuToggle = ({ toggleMenu }) => (
    <button className="menu-toggle-button" onClick={toggleMenu}>
        <img src={toggle} alt="Menu Toggle" />
    </button>
);

export default MenuToggle