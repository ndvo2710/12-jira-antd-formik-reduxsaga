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

    getAllProjectCategory = () => {
        return Axios({
            url: `${DOMAIN_TASKFLOW}/ProjectCategory`,
            method: 'GET'
        })
    }

    createProject = (newProject) => {
        return Axios({
            url: `${DOMAIN_TASKFLOW}/Project/createProject`,
            method: 'POST',
            data: newProject
        })
    }
}

export const taskFlowService = new TaskFlowService();