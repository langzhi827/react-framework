import React, { PureComponent } from 'react';

class Title extends PureComponent {
    render() {
        return <h1>{this.props.children}</h1>;
    }
}

export default Title;