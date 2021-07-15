import { call, put, takeLatest } from "redux-saga/effects";
import { priorityService } from "../../services/PriorityServices";
import { STATUS_CODE } from "../../util/constants/settingSystem";
import { GET_ALL_PRIORITY, GET_ALL_PRIORITY_SAGA } from "../constants/TaskFlowConst";


function* trackingActionGetAllPriority() {
    function* getAllPrioritySaga(action) {
        try {
            const { data, status } = yield call(() => priorityService.getAllPriority());

            

            // Dispatch data through reducer via put
            if (status === STATUS_CODE.SUCCESS) {
                yield put({
                    type: GET_ALL_PRIORITY,
                    arrPriority: [...data.content]
                });
            }


        } catch (err) {
            console.log(err);
        }
    }

    yield takeLatest(GET_ALL_PRIORITY_SAGA, getAllPrioritySaga);
}

const priorityTrackingList = [
    trackingActionGetAllPriority(),
];

export default priorityTrackingList;