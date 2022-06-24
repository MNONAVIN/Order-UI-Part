import rootReducer from '../store/reducers/RootReducer';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk'

function ConfigureStore(){
    return createStore(
        rootReducer,
        applyMiddleware(thunk)
    )
}

export default ConfigureStore;