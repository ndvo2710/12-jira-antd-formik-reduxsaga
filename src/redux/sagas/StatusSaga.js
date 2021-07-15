import { call, put, takeLatest } from "redux-saga/effects";
import { statusService } from "../../services/StatusServices";
import { GET_ALL_STATUS, GET_ALL_STATUS_SAGA } from "../constants/TaskFlowConst";


function* trackingActionGetAllStatus() {
    function* getAllStatusSaga(action) {
        try {
            const { data, status } = yield call(() => statusService.getAllStatus());
            console.log('getAllStatusSaga', data.content);

            yield put({
                type: GET_ALL_STATUS,
                arrStatus: data.content
            })


        } catch (err) {
            console.log(err);
            console.log(err.response?.data)
        }
    }

    yield takeLatest(GET_ALL_STATUS_SAGA, getAllStatusSaga);
}



const statusTrackingList = [
    trackingActionGetAllStatus(),
];

export default statusTrackingList;


