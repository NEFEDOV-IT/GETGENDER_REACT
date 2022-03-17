import React from "react";

export const Answer = (props) => {
    return (
        <p>Gender: {props.user} <span className="gender__answer">{props.gender}</span></p>
    )
}
