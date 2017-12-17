/**
 *  Author: harry.lang
 *  Date: 2017/11/24
 *  Description: Created by harrylang on 2017/11/24.
 */
import React from 'react';
import {connect} from 'react-redux';

import '../style/style.css';
import {updateTitle} from '../actions';
import img from '../images/hehe.png';

class Component extends React.Component {

    changeTitle() {
        this.props.updateTitle('404-' + (+new Date));
    }

    render() {
        const {nomatch} = this.props;

        return <div className="no-match">
            <h2>{nomatch.title}</h2>

            <img className="img" src={img} alt="404" onClick={this.changeTitle.bind(this)}/>

            <h3>No match for <code>{this.props.location.pathname}</code></h3>
        </div>;
    }
}


function mapStateToProps(state, ownProps) {
    return state.noMatchReducer ? {nomatch: state.noMatchReducer} : {};
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        dispatch: dispatch,
        updateTitle: (params)=>dispatch(updateTitle(params))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Component);
