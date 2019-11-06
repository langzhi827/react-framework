import reducer from './redux/reducer';
import { injectReducer } from 'rootReducer';
import NoMatch from './components/NoMatch';

injectReducer({ key: 'noMatch', reducer: reducer });

export default NoMatch;
