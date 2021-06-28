import {applyMiddleware, combineReducers, createStore} from 'redux';
import LoadingReducer from './reducers/LoadingReducer';
import UserLogInReducer from './reducers/UserLogInReducer';
import HistoryReducer from './reducers/HistoryReducer';

// middleware saga
import createMiddlewareSaga from 'redux-saga';
import { rootSaga } from './sagas/rootSaga';
const middlewareSaga = createMiddlewareSaga();

const rootReducer = combineReducers({
    LoadingReducer,
    UserLogInReducer,
    HistoryReducer
});

const store = createStore(
    rootReducer,
    applyMiddleware(middlewareSaga)
    );

// Call Saga
middlewareSaga.run(rootSaga);

export default store;
