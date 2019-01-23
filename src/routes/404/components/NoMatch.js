import React from 'react';
import CSSModules from 'react-css-modules';

import styles from '../assets/noMatch.css';
import img from '../assets/images/hehe.png';

const NoMatch = ({ nomatch, updateTitle, location }) => {
    return <div styleName="no-match">
        <h2>{nomatch.title}</h2>
        <img styleName="img" src={img} alt="404" onClick={() => { updateTitle('404-' + (+new Date)); }} />

        <h3>No match for <code>{location.pathname}</code></h3>
    </div>;
};

export default CSSModules(NoMatch, styles);
