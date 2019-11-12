import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import styles from '../assets/noMatch.css';
import img from '../assets/images/hehe.png';

import { updateTitle, getList } from '../redux/actions';

@connect(
    ({ noMatch }) => {
        return { title: noMatch.title };
    },
    (dispatch) => {
        return {
            dispatch: dispatch,
            updateTitle: (params) => dispatch(updateTitle(params)),
            getList: () => dispatch(getList())
        };
    }
)
class NoMatch extends PureComponent {

    componentDidMount() {
        const { getList } = this.props;
        getList();
    }

    render() {
        const {
            title, location,
            updateTitle
        } = this.props;

        return <div className={styles.noMatch}>
            <h2>{title}</h2>
            <img styleName="img" src={img} alt="404" onClick={() => { updateTitle('404-' + (+new Date)); }} />

            <h3>No match for <code>{location.pathname}</code></h3>
        </div>;
    }
}

export default NoMatch;
