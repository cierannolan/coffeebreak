import React from 'react';

const MeowCounter = ({ meowCount, visible, visibilities }) => (
    meowCount > 0 && (
        <div
            className="meow-counter"
            style={{
                opacity: visible ? 1 : 0,
                transition: 'opacity 1s ease-out',
            }}
        >
            {visibilities.cat ? 'Bagel' : 'The Ghost of Bagel'}&nbsp;has been harassed&nbsp;
            <div className="meow-counter-number">{meowCount}</div>
            &nbsp;times.
        </div>
    )
);
2 
export default MeowCounter;
