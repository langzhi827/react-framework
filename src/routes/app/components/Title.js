/**
 *  Author: harry.lang
 *  Date: 2017/11/24
 *  Description: Created by harrylang on 2017/11/24.
 */
import React, { PureComponent } from 'react';

class Title extends PureComponent {
    render() {
        return <h1>{this.props.children}</h1>;
    }
}

export default Title;