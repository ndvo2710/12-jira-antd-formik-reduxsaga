import { all } from "redux-saga/effects"
import projectCategoryTrackingList from "./ProjectCategorySaga";
import projectTrackingList from "./ProjectSaga";
import logInSagaActionTrackingList from "./UserTaskFlowSaga";

export function* rootSaga() {
    yield all([
        ...logInSagaActionTrackingList,
        ...projectCategoryTrackingList,
        ...projectTrackingList,
    ])
}