/**
 *  Author: harry.lang
 *  Date: 2017/11/24
 *  Description: Created by harrylang on 2017/11/24.
 */
import React from 'react';
import { connect } from 'react-redux';

import { updateTitle, getList } from '../redux/actions';
import NoMatch from '../components/NoMatch';

class NoMatchContainer extends React.Component {
    render() {
        return <NoMatch {...this.props} />;
    }
}

function mapStateToProps(state, ownProps) {
    return state.noMatchReducer ? { nomatch: state.noMatchReducer } : {};
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        dispatch: dispatch,
        updateTitle: (params) => dispatch(updateTitle(params)),
        getList: () => dispatch(getList())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(NoMatchContainer);
