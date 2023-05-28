import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setExemplo } from '../redux/action';

class View extends Component {
    constructor() {
        super();
        this.state = {
            exemplo: 'Variável exemplo do state do componente View.',
        }
    }

    render() {
        const { exemplo } = this.state;
        const { dispatch } = this.props;
        return (
            <div className='wiew'>
                {exemplo}
                <button onClick={() => {
                    dispatch(setExemplo('setei o exemplo'))
                }} >SetExemplo</button>
            </div>
        )
    }
}

export default connect()(View);