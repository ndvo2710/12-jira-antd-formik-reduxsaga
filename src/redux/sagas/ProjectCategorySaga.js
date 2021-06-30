import { call, put, takeLatest } from "redux-saga/effects";
import { taskFlowService } from "../../services/TaskFlowServices";
import { STATUS_CODE } from "../../util/constants/settingSystem";
import { SET_ALL_PROJECT_CATEGORY, GET_ALL_PROJECT_CATEGORY_SAGA } from "../constants/TaskFlowConst";

function* getAllProjectCategorySaga(action) {
    console.log('actionSaga', action);

    try {

        // Call Api to get data
        const { data, status } = yield call(() => taskFlowService.getAllProjectCategory());
        console.log('data', data)

        // Dispatch data through reducer via put
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: SET_ALL_PROJECT_CATEGORY,
                data: data.content
            });
        }


    } catch (err) {
        console.log(err);
    }
}

function* trackingActionGetAllProjectCategory() {
    yield takeLatest(GET_ALL_PROJECT_CATEGORY_SAGA, getAllProjectCategorySaga);
}

const projectCategoryTrackingList = [
    trackingActionGetAllProjectCategory(),
];

export default projectCategoryTrackingList;