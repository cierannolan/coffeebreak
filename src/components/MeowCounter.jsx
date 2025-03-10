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
            <span className="meow-counter-number">{meowCount}</span> 
            &nbsp;times.
        </div>
    )
);
 
export default MeowCounter;
