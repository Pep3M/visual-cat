import './seemore.css'

import React, { Component } from 'react';

class Seemore extends Component {

    state = ({
        verMas: false
    })
    
    /* cambiarState = () => {
        this.setState({
            verMas: !this.state.verMas
        })
        this.props.onChange(this.state.verMas)
    } */
    
    render() {
        return (
            <div className="see_more_container" >
                <hr aria-hidden="true" />
                <button className='boton' onClick={()=>this.props.onChange(true)}> Ver mas</button>
            </div>
        );
    }
}

export default Seemore;

