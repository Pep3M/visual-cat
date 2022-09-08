import './addButon.css'
import React, { Component } from 'react';

class Addbutton extends Component {
    constructor(props) {
        super(props)

        this.state = {
            clicked: false,
            nombreClase: 'sf-btn add'
        }

        this.nombreClase = 'sf-btn add'
    }

    handleClicked = e => {
        if (this.state.clicked) {
            this.setState({
                clicked: false,
                nombreClase: 'sf-btn add'
            })
            this.props.parentCallback(false)
        }else{
            this.setState({
                clicked: true,
                nombreClase: 'sf-btn added'
            })
            this.props.parentCallback(true)
        }

    };

    componentDidMount() {
        
    }

    render() {

        return (
            <div className="boton_container">
                <button type="submit" className={this.state.nombreClase} onClick={this.handleClicked}>
                    <div class="icn-sf">
                        <span class="line line-1"></span>
                        <span class="line line-2"></span>
                    </div>
                    <div class="loader"></div>
                </button>
            </div>
        );
    }
}

export default Addbutton;
