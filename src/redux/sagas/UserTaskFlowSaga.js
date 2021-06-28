import Axios from 'axios';
import { call, delay, fork, take, takeEvery, takeLatest, put } from 'redux-saga/effects';
import { taskFlowService } from '../../services/TaskFlowServices';
import { ACCESS_TOKEN, USER_LOGIN } from '../../util/constants/settingSystem';
import { DISPLAY_LOADING, HIDE_LOADING } from '../constants/LoadingConst';
import { USER_SIGNIN_API } from '../constants/Login/LoginTaskFlow';

// Manage Action Saga

function* signinSaga(action) {
    console.log(action);
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay (300);

    // Call Service API
    try {
        console.log("action.userLogin", action.userLogin);
        const { data, status } = yield call(() => taskFlowService.signInApi(action.userLogin));

        //Save to localStorage after successfully signed in
        localStorage.setItem(ACCESS_TOKEN, data.content.accessToken);
        localStorage.setItem(USER_LOGIN,JSON.stringify(data.content));

        console.log("Sucessfully Logged In!");
        console.log(data);


    }catch(err){ 
        console.log("There are some errors !!!");
        console.log(err.response.data)
    }


    yield put({
        type: HIDE_LOADING
    })

}

function* trackingActionSignIn() {
    yield takeLatest(USER_SIGNIN_API, signinSaga);
}

const logInSagaActionTrackingList = [
    trackingActionSignIn(),
]

export default logInSagaActionTrackingList;