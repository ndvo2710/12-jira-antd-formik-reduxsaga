import { USER_LOGIN_LC_KEY } from "../../util/constants/settingSystem";
import { USER_LOGIN } from "../constants/Login/LoginTaskFlow";
import { GET_USER_SEARCH, GET_USER_BY_PROJECT_ID } from "../constants/TaskFlowConst";

let userLogin = {};

if (localStorage.getItem(USER_LOGIN_LC_KEY)) {
    userLogin = JSON.parse(localStorage.getItem(USER_LOGIN_LC_KEY));
}


const stateDefault = {
    userLogin: userLogin,
    userSearch: [],
    arrUser: [],

}

const UserLogInReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case USER_LOGIN: {
            state.userLogin = action.userLogin;
            return { ...state }
        }

        case GET_USER_SEARCH: {
            state.userSearch = action.lstUserSearch;
            console.log('stateUser', state);
            return { ...state }
        }

        case GET_USER_BY_PROJECT_ID: {
            return  {...state,arrUser:action.arrUser}
        }

        default: return { ...state };
    }
}

export default UserLogInReducer;