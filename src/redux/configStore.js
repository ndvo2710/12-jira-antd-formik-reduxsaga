import { applyMiddleware, combineReducers, createStore } from 'redux';
import LoadingReducer from './reducers/LoadingReducer';
import UserLogInReducer from './reducers/UserLogInReducer';
import HistoryReducer from './reducers/HistoryReducer';
import ProjectCategoryReducer from './reducers/ProjectCategoryReducer';
import ProjectManagementReducer from './reducers/ProjectManagementReducer';
import DrawerReducer from './reducers/DrawerReducer';
import ProjectReducer from './reducers/ProjectReducer';
import PriorityReducer from './reducers/PriorityReducer';
import TaskTypeReducer from './reducers/TaskTypeReducer';
import StatusReducer from './reducers/StatusReducer';
import TaskReducer from './reducers/TaskReducer';

// middleware saga
import createMiddlewareSaga from 'redux-saga';
import { rootSaga } from './sagas/rootSaga';
const middlewareSaga = createMiddlewareSaga();

const rootReducer = combineReducers({
    LoadingReducer,
    UserLogInReducer,
    HistoryReducer,
    ProjectCategoryReducer,
    ProjectManagementReducer,
    DrawerReducer,
    ProjectReducer,
    PriorityReducer,
    TaskTypeReducer,
    StatusReducer,
    TaskReducer,
});

const store = createStore(
    rootReducer,
    applyMiddleware(middlewareSaga)
);

// Call Saga
middlewareSaga.run(rootSaga);

export default store;
