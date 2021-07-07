import Axios from "axios"
import { ACCESS_TOKEN_LC_KEY, DOMAIN_TASKFLOW } from "../util/constants/settingSystem";
import baseService from "./base";

class TaskFlowService extends baseService {

    signInApi = (userLogin) => {
        return this.post('/users/signin', userLogin);
    }

    getAllProjectCategory = () => {
        return this.get('/ProjectCategory');
    }

    createProject = (newProject) => {
        return this.post('/Project/createProject', newProject);
    }

    createProjectAuthorization = (newProject) => {
        console.log(localStorage.getItem(ACCESS_TOKEN_LC_KEY))
        return this.post('/Project/createProjectAuthorize', newProject);
    }

    getListProject = () => {
        return this.get('/Project/getAllProject');
    }

    updateProject = (projectUpdate) => {
        console.log('Right Before service PUT', projectUpdate)
        return this.put(`/Project/updateProject?projectId=${projectUpdate.id}`, projectUpdate);
    }
}

export const taskFlowService = new TaskFlowService();