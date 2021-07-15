import { GET_ALL_PROJECT, SET_LIST_PROJECT } from "../constants/TaskFlowConst";

const stateDefault = {
    projectList: [],
    arrProject: []

}


const ProjectManagementReducer = (state = stateDefault, action) => {


    switch (action.type) {

        case SET_LIST_PROJECT: {
            state.projectList = action.projectList;
            console.log("projectList", action.projectList)
            return { ...state };
        }

        case GET_ALL_PROJECT: {
            // state.arrProject = action.arrProject;
            return { ...state, arrProject: action.arrProject }
        }

        default: return { ...state }
    }
}

export default ProjectManagementReducer