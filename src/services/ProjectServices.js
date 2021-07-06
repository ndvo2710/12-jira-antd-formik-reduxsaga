import baseService from "./base";


class ProjectService extends baseService {

    constructor(){
        super();
    }

    deleteProject = (id) => {

       return this.delete(`/Project/deleteProject?projectId=${id}`);
    }


}


export const projectService = new ProjectService();