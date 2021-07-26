import { ACCESS_TOKEN_LC_KEY} from "../util/constants/settingSystem";
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
        return this.put(`Project/updateProject?projectId=${projectUpdate.id}`, projectUpdate);
    }

    createTask = (taskObject) => {
        return this.post('Project/createTask',taskObject);
    }

    getTaskDetail = (taskId) => {
        return this.get(`Project/getTaskDetail?taskId=${taskId}`)
    }

    updateStatusTask = (taskStatusUpdate) => {
        return this.put(`Project/updateStatus`,taskStatusUpdate);
    }

    updateTask = (taskUpdate) => {
        return this.post(`Project/updateTask`,taskUpdate);
    }
}

export const taskFlowService = new TaskFlowService();