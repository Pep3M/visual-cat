import React from "react";
import "./cartButton.scss";
import { FaCartPlus } from "react-icons/fa";

export const Cartbutton = (props) => {
    const { cantidad } = props;
    return (
        <div className="cart--button">
            <FaCartPlus />
            <span>{cantidad}</span>
        </div>
    );
};
