import { all } from "redux-saga/effects"
import priorityTrackingList from "./PrioritySaga";
import projectCategoryTrackingList from "./ProjectCategorySaga";
import projectTrackingList from "./ProjectSaga";
import statusTrackingList from "./StatusSaga";
import taskTrackingList from "./TaskSaga";
import taskTypeTrackingList from "./TaskTypeSaga";
import userTaskFlowSagaActionTrackingList from "./UserTaskFlowSaga";

export function* rootSaga() {
    yield all([
        ...userTaskFlowSagaActionTrackingList,
        ...projectCategoryTrackingList,
        ...projectTrackingList,
        ...priorityTrackingList,
        ...taskTypeTrackingList,
        ...taskTrackingList,
        ...statusTrackingList,
    ])
}