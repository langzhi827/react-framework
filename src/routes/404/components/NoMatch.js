/*
 * @Author: harry.lang 
 * @Date: 2018-03-20 14:54:22 
 * @Last Modified by: harry.lang
 * @Last Modified time: 2019-01-13 17:27:36
 */
import React, { PureComponent } from 'react';
import CSSModules from 'react-css-modules';

import styles from '../assets/noMatch.css';
import img from '../assets/images/hehe.png';

class NoMatch extends PureComponent {

    componentDidMount() {
        const { getList } = this.props;
        getList();
    }

    changeTitle() {
        this.props.updateTitle('404-' + (+new Date));
    }

    render() {
        const { nomatch } = this.props;

        return <div styleName="no-match">
            <h2>{nomatch.title}</h2>
            <img styleName="img" src={img} alt="404" onClick={this.changeTitle.bind(this)} />

            <h3>No match for <code>{this.props.location.pathname}</code></h3>
        </div>;
    }
}

export default CSSModules(NoMatch, styles);
