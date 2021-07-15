/* eslint-disable no-unused-vars */
import Axios from 'axios';
import { call, delay, fork, take, takeEvery, takeLatest, put, select } from 'redux-saga/effects';
import { taskFlowService } from '../../services/TaskFlowServices';
import { userService } from '../../services/UserServices';
import { ACCESS_TOKEN_LC_KEY, STATUS_CODE, USER_LOGIN_LC_KEY } from '../../util/constants/settingSystem';
import { DISPLAY_LOADING, HIDE_LOADING } from '../constants/LoadingConst';
import { USER_LOGIN, USER_SIGNIN_API } from '../constants/Login/LoginTaskFlow';
import { ADD_USER_PROJECT_API, GET_LIST_PROJECT_SAGA, GET_USER_API, GET_USER_BY_PROJECT_ID, GET_USER_BY_PROJECT_ID_SAGA, GET_USER_SEARCH, REMOVE_USER_PROJECT_API } from '../constants/TaskFlowConst';

// Manage Action Saga



function* trackingActionSignIn() {
    //  Sign In Saga
    function* signinSaga(action) {
        console.log(action);
        yield put({
            type: DISPLAY_LOADING
        })
        yield delay(300);

        // Call Service API
        try {
            console.log("action.userLogin", action.userLogin);
            const { data, status } = yield call(() => taskFlowService.signInApi(action.userLogin));

            //Save to localStorage after successfully signed in
            localStorage.setItem(ACCESS_TOKEN_LC_KEY, data.content.accessToken);
            localStorage.setItem(USER_LOGIN_LC_KEY, JSON.stringify(data.content));

            console.log("Sucessfully Logged In!");
            // console.log(data);
            yield put({
                type: USER_LOGIN,
                userLogin: data.content
            })

            let history = yield select(state => state.HistoryReducer.history)

            history.push('/home');


        } catch (err) {
            console.log("There are some errors !!!");
            console.log(err.response.data)
        }


        yield put({
            type: HIDE_LOADING
        })
    }

    yield takeLatest(USER_SIGNIN_API, signinSaga);
}


function* trackingActionGetUser() {
    //  Get User Saga
    function* getUserSaga(action) {

        //action.keyWord

        // Call API
        try {
            const { data, status } = yield call(() => userService.getUser(action.keyWord));

            yield put({
                type: GET_USER_SEARCH,
                lstUserSearch: data.content
            })
            console.log("data", data);

        } catch (err) {
            console.log(err.response.data)
        }
    }
    yield takeLatest(GET_USER_API, getUserSaga);
}

function* trackingActionAddUserProject() {
    function* addUserProjectSaga(action) {
        try {
            const { data, status } = yield call(() => userService.assignUserProject(action.userProject));

            yield put({
                type: GET_LIST_PROJECT_SAGA
            })

        } catch (err) {
            console.log(err.response.data)
        }
    }

    yield takeLatest(ADD_USER_PROJECT_API, addUserProjectSaga);
}

function* trackingActionRemoveUserProject() {
    function* removeUserProjectSaga(action) {
        try {
            const { data, status } = yield call(() => userService.deleteUserFromProject(action.userProject));

            yield put({
                type: GET_LIST_PROJECT_SAGA
            })

        } catch (err) {
            console.log(err.response.data)
        }
    }
    yield takeLatest(REMOVE_USER_PROJECT_API, removeUserProjectSaga);
}

function* trackingActionGetUserByProjectId() {
    function* getUserByProjectIdSaga(action) {
        const { idProject } = action;
        console.log('action', idProject)

        try {
            const { data, status } = yield call(() => userService.getUserByProjectId(idProject));
            console.log('checkdata', data);

            if (status === STATUS_CODE.SUCCESS) {
                yield put({
                    type: GET_USER_BY_PROJECT_ID,
                    arrUser: data.content
                })
            }

        } catch (err) {
            console.log(err);
            console.log(err.response?.data);
            if (err.response?.data.statusCode === STATUS_CODE.NOT_FOUND) {
                yield put({
                    type: GET_USER_BY_PROJECT_ID,
                    arrUser: []
                })
            }
        }
    }
    yield takeLatest(GET_USER_BY_PROJECT_ID_SAGA, getUserByProjectIdSaga)
}


const userTaskFlowSagaActionTrackingList = [
    trackingActionSignIn(),
    trackingActionGetUser(),
    trackingActionAddUserProject(),
    trackingActionRemoveUserProject(),
]

export default userTaskFlowSagaActionTrackingList;