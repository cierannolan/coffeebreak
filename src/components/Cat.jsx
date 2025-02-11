import React from 'react';
import catImg from './assets/images/bagel.gif';

const Cat = ({ meowClicked }) => (
    <>
        <img className="cat" src={catImg} alt="Cat" />
        <div
            className="cat-head-clickable"
            onClick={meowClicked}
            style={{
                position: 'absolute',
                bottom: '7.5%',
                left: '63.5%',
                width: '5.8%',
                height: '8.5%',
                cursor: 'pointer',
                zIndex: 2,
            }}
        />
    </>
);

export default Cat