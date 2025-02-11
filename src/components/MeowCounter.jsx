import React from 'react';

const MeowCounter = ({ meowCount, visible }) => (
    meowCount > 0 && (
        <div
            className="meow-counter"
            style={{
                opacity: visible ? 1 : 0,
                transition: 'opacity 1s ease-out',
            }}
        >
            Bagel has been harassed&nbsp;
            <div className="meow-counter-number">{meowCount}</div>
            &nbsp;times.
        </div>
    )
);

export default MeowCounter