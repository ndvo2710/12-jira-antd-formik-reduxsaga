import { SET_LIST_PROJECT } from "../constants/TaskFlowConst";

const stateDefault = {
    projectList: [
    ]

}


const ProjectManagementReducer = (state = stateDefault, action) => {


    switch (action.type) {

        case SET_LIST_PROJECT: {
            state.projectList = action.projectList;
            console.log("projectList", action.projectList)
            return { ...state };
        }

        default: return { ...state }
    }
}

export default ProjectManagementReducer