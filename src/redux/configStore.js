import {applyMiddleware, combineReducers, createStore} from 'redux';
import LoadingReducer from './reducers/LoadingReducer';

// middleware saga
import createMiddlewareSaga from 'redux-saga';
import { rootSaga } from './sagas/rootSaga';
const middlewareSaga = createMiddlewareSaga();

const rootReducer = combineReducers({
    LoadingReducer
});

const store = createStore(
    rootReducer,
    applyMiddleware(middlewareSaga)
    );

// Call Saga
middlewareSaga.run(rootSaga);

export default store;
