import {applyMiddleware, combineReducers, createStore} from 'redux';
import createMiddlewareSaga from 'redux-saga';
// import { rootSaga } from './sagas/rootSaga';

// middleware saga
const middlewareSaga = createMiddlewareSaga();
const rootReducer = combineReducers({

});

const store = createStore(
    rootReducer,
    // applyMiddleware(middlewareSaga)
    );

// Call Saga
// middlewareSaga.run(rootSaga);

export default store;
