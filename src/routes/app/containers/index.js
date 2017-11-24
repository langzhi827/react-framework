/**
 *  Author: harry.lang
 *  Date: 2017/11/24
 *  Description: Created by harrylang on 2017/11/24.
 */
import React from 'react';
import {connect} from 'react-redux';

import '../style/style.css';
import Title from '../components/Title';
import {updateTitle} from '../actions';

class Component extends React.Component {

    changeTitle() {
        this.props.updateTitle('app-' + (+new Date))
    }

    render() {
        const {app} = this.props;

        return <div className="app">
            <Title>{app.title}</Title>

            <div className="img" onClick={this.changeTitle.bind(this)}></div>
        </div>;
    }
}


function mapStateToProps(state, ownProps) {
    return state.appReducer ? {app: state.appReducer} : {};
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        dispatch: dispatch,
        updateTitle: (params)=>dispatch(updateTitle(params))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Component);