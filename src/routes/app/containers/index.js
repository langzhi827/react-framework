/**
 *  Author: harry.lang
 *  Date: 2017/11/24
 *  Description: Created by harrylang on 2017/11/24.
 */
import React from 'react';
import {connect} from 'react-redux';

import '../style/style.css';
import Title from '../components/Title';
import Table from '../components/Table';
import {updateTitle, getList} from '../actions';

class Component extends React.Component {

    changeTitle() {
        this.props.updateTitle('app-' + (+new Date));
    }

    componentWillMount() {
        this.props.getList();
    }

    render() {
        const {app} = this.props;
        return <div className="app">
            <Title>{app.title}</Title>

            <div className="img" onClick={this.changeTitle.bind(this)}></div>
            <Table list={app.list}></Table>
        </div>;
    }
}

function mapStateToProps(state, ownProps) {
    return state.appReducer ? {app: state.appReducer} : {};
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        dispatch: dispatch,
        updateTitle: (params)=>dispatch(updateTitle(params)),
        getList: ()=>dispatch(getList())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Component);