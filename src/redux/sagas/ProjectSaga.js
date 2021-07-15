import { call, delay, put, takeLatest } from "redux-saga/effects";
import { projectService } from "../../services/ProjectServices";
import { taskFlowService } from "../../services/TaskFlowServices";
import { STATUS_CODE } from "../../util/constants/settingSystem";
import { history } from "../../util/history";
import { notifiFunction } from "../../util/notification";
import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/LoadingConst";
import { CREATE_PROJECT_SAGA, SET_LIST_PROJECT, GET_LIST_PROJECT_SAGA, CLOSE_DRAWER, UPDATE_PROJECT_SAGA, DELETE_PROJECT_SAGA, GET_PROJECT_DETAIL, PUT_PROJECT_DETAIL, GET_ALL_PROJECT_SAGA, GET_ALL_PROJECT, GET_USER_BY_PROJECT_ID_SAGA } from "../constants/TaskFlowConst";


function* trackingActionCreateProject() {
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


    yield takeLatest(CREATE_PROJECT_SAGA, createProjectSaga);
}


function* trackingActionGetListProject() {
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

    yield takeLatest(GET_LIST_PROJECT_SAGA, getListProjectSaga);
}


function* trackingActionUpdateProject() {
    //UpdateProject
    function* updateProjectSaga(action) {
        yield put({
            type: DISPLAY_LOADING
        })
        yield delay(500);

        try {
            console.log('action.projectUpdate', action.projectUpdate);
            const { data, status } = yield call(() => taskFlowService.updateProject(action.projectUpdate));

            if (status === STATUS_CODE.SUCCESS) {
                console.log(data)

                // history.push('/projectmanagement');
            }

            yield put({
                type: GET_LIST_PROJECT_SAGA
            })

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
    yield takeLatest(UPDATE_PROJECT_SAGA, updateProjectSaga);
}

// Saga to delete project from API
function* trackingActionDeleteProject() {
    function* deleteProjectSaga(action) {
        yield put({
            type: DISPLAY_LOADING
        })
        yield delay(500);

        try {
            const { data, status } = yield call(() => projectService.deleteProject(action.idProject));
            // Dispatch data to reducer via put
            if (status === STATUS_CODE.SUCCESS) {
                console.log(data)

                notifiFunction('success', 'Delete project successfully !')

                // history.push('/projectmanagement');
            } else {
                notifiFunction('error', 'Delete project fail !')
            }

            yield put({
                type: GET_LIST_PROJECT_SAGA
            })

            yield put({
                type: CLOSE_DRAWER
            })
        } catch (err) {
            notifiFunction('error', 'Delete project fail !')
            console.log(err);
        }

        yield put({
            type: HIDE_LOADING
        })
    }
    yield takeLatest(DELETE_PROJECT_SAGA, deleteProjectSaga);
}


// Saga to get project detail from API
function* trackingActionGetProjectDetail() {
    function* getProjectDetailSaga(action) {
        yield put({
            type: DISPLAY_LOADING
        })
        yield delay(500);

        try {
            const { data, status } = yield call(() => projectService.getProjectDetail(action.projectId));

            console.log('data', data);
            // Dispatch data to ProjectReducer
            yield put({
                type: PUT_PROJECT_DETAIL,
                projectDetail: data.content
            })

        } catch (err) {
            console.log('404 not found !')
            history.push('/projectmanagement');
        }

        yield put({
            type: HIDE_LOADING
        })
    }

    yield takeLatest(GET_PROJECT_DETAIL, getProjectDetailSaga);
}



// 
function* trackingActionGetProjectAll() {
    function* getProjectAllSaga(action) {
        yield put({
            type: DISPLAY_LOADING
        })
        yield delay(500);

        try {
            const { data, status } = yield call(() => projectService.getAllProject());

            yield put({
                type: GET_ALL_PROJECT,
                arrProject: data.content
            })

            yield put({
                type:GET_USER_BY_PROJECT_ID_SAGA,
                idProject:data.content[0].id
            })

        } catch (err) {
            console.log('404 not found !')
            history.push('/projectmanagement');
        }

        yield put({
            type: HIDE_LOADING
        })
    }

    yield takeLatest(GET_ALL_PROJECT_SAGA, getProjectAllSaga);
}



const projectTrackingList = [
    trackingActionCreateProject(),
    trackingActionGetListProject(),
    trackingActionUpdateProject(),
    trackingActionDeleteProject(),
    trackingActionGetProjectDetail(),
    trackingActionGetProjectAll()
];

export default projectTrackingList;