import Axios from "axios"
import { DOMAIN_TASKFLOW } from "../util/constants/settingSystem";

class TaskFlowService {

    signInApi = (userLogin) => {
        return Axios({
            url: `${DOMAIN_TASKFLOW}/users/signin`,
            method: 'POST',
            data: userLogin
        })
    }
}

export const taskFlowService = new TaskFlowService();