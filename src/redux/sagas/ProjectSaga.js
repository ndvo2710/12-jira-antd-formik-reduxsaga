import { call, delay, put, takeLatest } from "redux-saga/effects";
import { taskFlowService } from "../../services/TaskFlowServices";
import { STATUS_CODE } from "../../util/constants/settingSystem";
import { history } from "../../util/history";
import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/LoadingConst";
import { CREATE_PROJECT_SAGA, SET_LIST_PROJECT, GET_LIST_PROJECT_SAGA, CLOSE_DRAWER, UPDATE_PROJECT_SAGA } from "../constants/TaskFlowConst";

function* createProjectSaga(action) {

    console.log('actionCreateProject', action)

    // Show Loading gif
    yield put({
        type: DISPLAY_LOADING
    })

    yield delay(500);

    try {

        // Call API service to get data
        const { data, status } = yield call(() => taskFlowService.createProjectAuthorization(action.newProject));



        // Dispatch data to reducer via put
        if (status === STATUS_CODE.SUCCESS) {
            console.log('data', data);
            history.push('/projectmanagement');
        }


    } catch (err) {
        console.log(err);
    }

    yield put({
        type: HIDE_LOADING
    })
}
function* trackingActionProjectSaga() {
    yield takeLatest(CREATE_PROJECT_SAGA, createProjectSaga);
}


// Saga to get all project from API
function* getListProjectSaga(action) {

    try {
        const { data, status } = yield call(() => taskFlowService.getListProject());

        // Dispatch data to reducer via put
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: SET_LIST_PROJECT,
                projectList: data.content
            })
        }
    } catch (err) {
        console.log(err)
    }

}

function* trackingActionGetListProjectSaga() {
    yield takeLatest(GET_LIST_PROJECT_SAGA, getListProjectSaga);
}


//UpdateProject
function* updateProjectSaga(action) {
    // console.log('action123',action);
    // return;
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay (500);

    try {
        const { data, status } = yield call(() => taskFlowService.updateProject(action.prjectUpdate));
        
        if (status === STATUS_CODE.SUCCESS) {
            console.log(data)

            // history.push('/projectmanagement');
        }
        // Dispatch data to reducer via put
        // yield put({
        //     type:'GET_LIST_PROJECT_SAGA'
        // })

        yield call(() => getListProjectSaga);
        yield put({
            type: CLOSE_DRAWER
        })
    } catch (err) {
        console.log(err);
    }

    yield put({
        type: HIDE_LOADING
    })
}


function* trackingActionUpdateProjectSaga() {
    yield takeLatest(UPDATE_PROJECT_SAGA, updateProjectSaga);
}



const projectTrackingList = [
    trackingActionProjectSaga(),
    trackingActionGetListProjectSaga(),
    trackingActionUpdateProjectSaga()
];

export default projectTrackingList;