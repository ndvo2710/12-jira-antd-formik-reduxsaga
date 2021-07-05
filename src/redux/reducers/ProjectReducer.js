import { EDIT_PROJECT } from "../constants/TaskFlowConst";

const initialState = {
    projectEdit: {
        "id": 0,
        "projectName": "string",
        "creator": 0,
        "description": "string",
        "categoryId": "2"
    }
};

const ProjectReducer = (state = initialState, action) => {
    switch (action.type) {
        case EDIT_PROJECT: {
            state.projectEdit = action.projectEditModel;
            return { ...state }

        }

        default:
            return state
    }
};

export default ProjectReducer;