import React from 'react';
import "./CharacterCard.css"

export default function CharacterCard(props) {
    return (
        <div className='character_card'>
            <div><img src={props.image}></img></div>
            <div>
                <p>{props.name}</p>
            </div>
            <button onClick={props.onClick}>see more info</button>
        </div>
    )
}