import { SET_ALL_PROJECT_CATEGORY } from "../constants/TaskFlowConst";

const stateDefault = {
    arrProjectCategory: []
}

const ProjectCategoryReducer = (state = stateDefault, action) => {
    switch (action.type) {

        case SET_ALL_PROJECT_CATEGORY: {
            state.arrProjectCategory = action.data;
            return { ...state }
        }


        default: return { ...state }
    }
}

export default ProjectCategoryReducer;