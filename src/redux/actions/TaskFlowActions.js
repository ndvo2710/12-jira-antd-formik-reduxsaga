import { USER_SIGNIN_API } from "../constants/Login/LoginTaskFlow"


export const signInTaskFlowAction = (email, password) => {
    return {
        type: USER_SIGNIN_API,
        userLogin: {
            email: email,
            password: password
        }
    }
}
