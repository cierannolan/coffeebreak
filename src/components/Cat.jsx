import React from 'react';
import cat from './assets/images/bagel.gif';

const Cat = ({ meowClicked }) => (
    <>
        <img className="cat" src={cat} alt="Cat" />
        <div
            className="cat-head-clickable"
            onClick={meowClicked}
        />
    </>
);

export default Cat