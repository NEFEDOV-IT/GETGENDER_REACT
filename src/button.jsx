import React from "react";

export const Button = ({saveGender}) => {
    return (
        <button
            onClick={saveGender}
            type="submit"
            className="gender__button">
            Send
        </button>
    )
}
