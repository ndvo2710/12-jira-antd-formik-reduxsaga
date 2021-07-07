import baseService from "./base";


class ProjectService extends baseService {

    deleteProject = (id) => {
       return this.delete(`Project/deleteProject?projectId=${id}`);
    }




}


export const projectService = new ProjectService();