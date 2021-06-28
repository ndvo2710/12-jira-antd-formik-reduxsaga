import { USER_LOGIN_LC_KEY } from "../../util/constants/settingSystem";
import { USER_LOGIN } from "../constants/Login/LoginTaskFlow";

let userLogin = {};

if(localStorage.getItem(USER_LOGIN_LC_KEY)) {
    userLogin = JSON.parse(localStorage.getItem(USER_LOGIN_LC_KEY));
}


const stateDefault =  {
    userLogin : userLogin
}


const UserLogInReducer = (state = stateDefault, action) => {
    switch(action.type) {
        case USER_LOGIN: {
            state.userLogin = action.userLogin;
            return {...state}
        }

        default : return {...state};
    }
}

export default UserLogInReducer;