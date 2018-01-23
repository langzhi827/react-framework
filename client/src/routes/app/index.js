/**
 *  Author: harry.lang
 *  Date: 2017/11/20
 *  Description: Created by harrylang on 2017/11/20.
 */
import Container from './containers';
import reducer from './reducers';
import {injectReducer} from '../../store/rootReducer';
import './assets/style.less';

injectReducer({key: 'appReducer', reducer: reducer});

export default Container;