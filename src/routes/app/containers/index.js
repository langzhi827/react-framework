import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { updateTitle, getList } from '../redux/actions';
import App from '../components/App';

class AppContainer extends PureComponent {
    componentDidMount() {
        const { getList } = this.props;
        getList();
    }

    render() {
        return <App  {...this.props} />;
    }
}

function mapStateToProps(state, ownProps) {
    return state.appReducer ? { app: state.appReducer } : {};
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        dispatch: dispatch,
        updateTitle: (params) => dispatch(updateTitle(params)),
        getList: () => dispatch(getList())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);