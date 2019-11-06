import reducer from './redux/reducer';
import { injectReducer } from 'rootReducer';
import App from './components/App';

injectReducer({ key: 'app', reducer: reducer });

export default App;
