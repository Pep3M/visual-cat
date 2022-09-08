import { Link } from "react-router-dom";
import AddButton from "../atoms/AddButton/AddButton";
import "./card.css";
import React, { Component } from "react";

export class Card extends Component {
    state = {
        selected: false,
    };

    handleCallback = (childData) => {
        this.setState({ selected: childData });
    };

    render() {
        const { title, img, id } = this.props;
        return (
            <div className="card">
                <AddButton parentCallback={this.handleCallback} />
                {/* <Link to={"/movies/" + id}> */}
                <div className="imagen_card">
                    {img === "" ? (
                        <></>
                    ) : (
                        <img src={"./pelis/imgs/" + img} alt="" />
                    )}
                </div>
                {/* </Link> */}
                <div className="footer_card">{title}</div>
            </div>
        );
    }
}
