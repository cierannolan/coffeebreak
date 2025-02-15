import React, { useState } from 'react';
import eye from "../assets/images/eye.png"
import eye_closed from "../assets/images/eye_closed.png"

const VisibilityMenu = ({ setVisibilities, visibilities }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const toggleVisibility = (key) => {
        setVisibilities(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const menuItems = [
        { key: 'cat', label: 'Cat' },
        { key: 'table', label: 'Table' },
        { key: 'coffee', label: 'Coffee' },
        { key: 'plant', label: 'Plant' },
        { key: 'master_volume', label: 'Master Volume' },
        { key: 'volume_controls', label: 'Volume Controls' },
        { key: 'play_button', label: 'Play/Pause Button' }
    ];

    return (
        <div className="visibility-menu">
            <img
                className="eye"
                src={isMenuOpen ? eye_closed : eye}
                onClick={toggleMenu}
                alt="Toggle visibility menu"
            />
            {isMenuOpen && (
                <div className="visibility-options">
                    {menuItems.map(({ key, label }) => (
                        <label key={key} className="visibility-option">
                            <input
                                type="checkbox"
                                checked={!visibilities[key]}
                                onChange={() => toggleVisibility(key)}
                            />
                            <span>Hide {label}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

export default VisibilityMenu;