import Container from './containers';
import reducer from './redux/reducer';
import {injectReducer} from 'rootReducer';

injectReducer({key: 'appReducer', reducer: reducer});

export default Container;
