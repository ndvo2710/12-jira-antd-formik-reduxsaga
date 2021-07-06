import { all } from "redux-saga/effects"
import projectCategoryTrackingList from "./ProjectCategorySaga";
import projectTrackingList from "./ProjectSaga";
import userTaskFlowSagaActionTrackingList from "./UserTaskFlowSaga";

export function* rootSaga() {
    yield all([
        ...userTaskFlowSagaActionTrackingList,
        ...projectCategoryTrackingList,
        ...projectTrackingList,
    ])
}