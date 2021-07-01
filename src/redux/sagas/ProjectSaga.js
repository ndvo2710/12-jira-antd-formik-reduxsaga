import { call, delay, put, takeLatest } from "redux-saga/effects";
import { taskFlowService } from "../../services/TaskFlowServices";
import { STATUS_CODE } from "../../util/constants/settingSystem";
import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/LoadingConst";
import { CREATE_PROJECT_SAGA } from "../constants/TaskFlowConst";

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
            console.log(data)
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

const projectTrackingList = [
    trackingActionProjectSaga(),
];

export default projectTrackingList;