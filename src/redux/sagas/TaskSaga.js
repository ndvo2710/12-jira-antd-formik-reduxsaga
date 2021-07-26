import { call, put, select, takeLatest } from "redux-saga/effects";
import { CHANGE_ASSIGNESS, CHANGE_TASK_MODAL, CLOSE_DRAWER, CREATE_TASK_SAGA, GET_PROJECT_DETAIL, GET_TASK_DETAIL, GET_TASK_DETAIL_SAGA, HANDLE_CHANGE_POST_API_SAGA, REMOVE_USER_ASSIGN, UPDATE_STATUS_TASK_SAGA, UPDATE_TASK_SAGA } from "../constants/TaskFlowConst";
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

function* trackingActionGetTaskDetail() {
    function* getTaskDetailSaga(action) {
        const { taskId } = action;

        try {
            const { data, status } = yield call(() => taskFlowService.getTaskDetail(taskId));

            yield put({
                type: GET_TASK_DETAIL,
                taskDetailModal: data.content
            })

        } catch (err) {

            console.log(err);
            console.log(err.response?.data);

        }
    }

    yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetailSaga);
}

function* trackingActionUpdateTaskStatus() {
    function* updateTaskStatusSaga(action) {
        const { taskUpdateStatus } = action;
        console.log(action)
        try {
            const { data, status } = yield call(() => taskFlowService.updateStatusTask(taskUpdateStatus));

            if (status === STATUS_CODE.SUCCESS) {
                yield put({
                    type: GET_PROJECT_DETAIL,
                    projectId: taskUpdateStatus.projectId
                })

                yield put({
                    type: GET_TASK_DETAIL_SAGA,
                    taskId: taskUpdateStatus.taskId
                })
            }



        } catch (err) {
            console.log(err);
            console.log(err.response?.data);

        }
    }

    yield takeLatest(UPDATE_STATUS_TASK_SAGA, updateTaskStatusSaga);
}

function* trackingActionUpdateTask() {
    function* updateTaskSaga(action) {

    }

    yield takeLatest(UPDATE_TASK_SAGA, updateTaskSaga);
}



function* trackingActionHandlePostApi() {
    function* handlePostApiSaga(action) {
        // console.log('abc', action)
        // Call action to update taskDetailModal
        switch (action.actionType) {
            case CHANGE_TASK_MODAL: {
                const { value, name } = action;

                yield put({
                    type: CHANGE_TASK_MODAL,
                    name,
                    value
                });
                break;
            }
            case CHANGE_ASSIGNESS: {
                const { userSelected } = action;
                yield put({
                    type: CHANGE_ASSIGNESS,
                    userSelected
                });
                break;

            }
            case REMOVE_USER_ASSIGN: {
                const { userId } = action;
                yield put({
                    type: REMOVE_USER_ASSIGN,
                    userId
                })
                break;
            }
            default: {
                console.log('doing nothing');
                break;
            }
        }

        // Save through api updateTaskSaga
        // Get data from state.taskDetailModal 
        let { taskDetailModal } = yield select(state => state.TaskReducer);
        console.log('taskDetailModal after update', taskDetailModal)
        // Transform state.taskDetailModal to feed api

        const listUserAsign = taskDetailModal.assigness?.map((user, index) => {
            return user.id;
        });


        const taskUpdateApi = { ...taskDetailModal, listUserAsign }
        try {
            const { data, status } = yield call(() => taskFlowService.updateTask(taskUpdateApi));

            if (status === STATUS_CODE.SUCCESS) {
                yield put({
                    type: GET_PROJECT_DETAIL,
                    projectId: taskUpdateApi.projectId
                })

                yield put({
                    type: GET_TASK_DETAIL_SAGA,
                    taskId: taskUpdateApi.taskId
                })
            }
        } catch (err) {
            console.log(err.response?.data);
            console.log(err);
        }
    }

    yield takeLatest(HANDLE_CHANGE_POST_API_SAGA, handlePostApiSaga);
}


const taskTrackingList = [
    trackingActionCreateTask(),
    trackingActionGetTaskDetail(),
    trackingActionUpdateTaskStatus(),
    trackingActionUpdateTask(),
    trackingActionHandlePostApi(),
];

export default taskTrackingList;