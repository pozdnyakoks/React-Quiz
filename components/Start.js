import React from 'react';

export default function Start(props) {
    return (
        <div className="start">
            <h2 className="title">Quizzical</h2>
            <p className="desc">Best film's quiz in the world</p>
            <button onClick={props.changeState} className="startBtn">Start quiz</button>
        </div>
    )
}