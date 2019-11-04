import Container from './containers';
import reducer from './redux/reducer';
import {injectReducer} from 'rootReducer';

injectReducer({key: 'noMatchReducer', reducer: reducer});

export default Container;
 