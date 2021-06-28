import { all } from "redux-saga/effects"
import logInSagaActionTrackingList from "./UserTaskFlowSaga";

export function* rootSaga() {
    yield all([
        ...logInSagaActionTrackingList,
    ])
}