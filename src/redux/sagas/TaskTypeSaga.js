import { call, put, takeLatest } from "redux-saga/effects";
import { taskTypeService } from "../../services/TaskTypeServices";
import { GET_ALL_TASK_TYPE, GET_ALL_TASK_TYPE_SAGA } from "../constants/TaskFlowConst";

// 
function* trackingActionGetAllTaskType() {
    function* getAllTaskTypeSaga(action) {
        try {
            const { data, status } = yield call(() => taskTypeService.getAllTaskType());

            yield put({
                type: GET_ALL_TASK_TYPE,
                arrTaskType: data.content
            })



        } catch (err) {
            console.log(err);
        }
    }

    yield takeLatest(GET_ALL_TASK_TYPE_SAGA, getAllTaskTypeSaga);
}


const taskTypeTrackingList = [
    trackingActionGetAllTaskType(),
];

export default taskTypeTrackingList;