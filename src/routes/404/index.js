/**
 *  Author: harry.lang
 *  Date: 2017/11/20
 *  Description: Created by harrylang on 2017/11/20.
 */
import Container from './containers';
import reducer from './redux/reducers';
import {injectReducer} from 'rootReducer';

injectReducer({key: 'noMatchReducer', reducer: reducer});

export default Container;
 