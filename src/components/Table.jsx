import React from 'react';
import coffee from '../assets/images/coffee.gif';
import steam from '../assets/images/steam.gif';
import cat from '../assets/images/bagel.gif';
import table from '../assets/images/table.png';
import laptop from '../assets/images/laptop.png';
import typing from '../assets/images/typing.gif';

const Table = ({ meowClicked, visibilities, typingAudio, isPlaying }) => (
    <div className="table-container">
        <img className={visibilities.table ? 'coffee' : 'coffee open'} src={coffee} style={{ visibility: visibilities.coffee ? 'visible' : 'hidden' }} alt="Coffee" />
        <img className={visibilities.table ? 'steam' : 'steam open'} src={steam} style={{ visibility: visibilities.coffee ? 'visible' : 'hidden' }} alt="Steam" />
        <img className={visibilities.table ? 'cat' : 'cat open'} src={cat} style={{ visibility: visibilities.cat ? 'visible' : 'hidden' }} alt="Cat" />
        <div
            className={visibilities.table ? 'cat-head-clickable' : 'cat-head-clickable open'}
            onClick={meowClicked}
        />
        <img className="laptop" src={laptop} style={{ visibility: visibilities.table ? 'visible' : 'hidden' }} alt="Laptop" />
        <img
            className="typing"
            src={typing}
            style={{
                visibility: (isPlaying && visibilities.table && typingAudio >= 0.2) ? 'visible' : 'hidden'
            }}
            alt="Typing"
        />
        <img className="table" src={table} style={{ visibility: visibilities.table ? 'visible' : 'hidden' }} alt="Table" />
    </div>
);

export default Table