import { call, put, takeLatest } from "redux-saga/effects";
import { CLOSE_DRAWER, CREATE_TASK_SAGA } from "../constants/TaskFlowConst";
import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/LoadingConst";
import { notifiFunction } from "../../util/notification";
import { taskFlowService } from "../../services/TaskFlowServices";
import { STATUS_CODE } from "../../util/constants/settingSystem";

function* trackingActionCreateTask() {
    function* createTaskSaga(action) {
        try {
            yield put({
                type: DISPLAY_LOADING
            })
            console.log('Hello World from here 1');
            const { data, status } = yield call(() => taskFlowService.createTask(action.taskObject));
            console.log('Hello World from here 2');
            
            if (status === STATUS_CODE.SUCCESS) {
                console.log(data)

            }
            yield put({
                type: CLOSE_DRAWER
            })
            notifiFunction('success', 'Create task successfully !');
        }
        catch (err) {
            console.log(err.response.data)
        }

        yield put({
            type: HIDE_LOADING
        })
    }

    yield takeLatest(CREATE_TASK_SAGA, createTaskSaga);
}

const taskTrackingList = [
    trackingActionCreateTask(),
];

export default taskTrackingList;