import React from "react";

export const Input = (props) => {
    return (
        <input
            value={props.value}
            onChange={props.saveName}
            placeholder="Enter your name..."
            type="text"
            className='gender__input'
        />
    )
}
