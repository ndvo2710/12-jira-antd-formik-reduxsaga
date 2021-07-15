import baseService from "./base";


class ProjectService extends baseService {

    deleteProject = (id) => {
       return this.delete(`Project/deleteProject?projectId=${id}`);
    }

    getProjectDetail = (projectId) => {
        return this.get(`Project/getProjectDetail?id=${projectId}`);
    }

    getAllProject = () => {
        return this.get(`Project/getAllProject`);
    }

}


export const projectService = new ProjectService();