import Axios from "axios"
import { ACCESS_TOKEN_LC_KEY, DOMAIN_TASKFLOW } from "../util/constants/settingSystem";

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

    createProjectAuthorization = (newProject) => {
        console.log(localStorage.getItem(ACCESS_TOKEN_LC_KEY))
        return Axios({
            url: `${DOMAIN_TASKFLOW}/Project/createProjectAuthorize`,
            method:'POST',
            data:newProject,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_LC_KEY)} //JWT 
        })
    }
}

export const taskFlowService = new TaskFlowService();