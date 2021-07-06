
import Axios from "axios"
import { ACCESS_TOKEN_LC_KEY, DOMAIN_TASKFLOW } from "../util/constants/settingSystem";

export default class baseService {

    // PUT json to backend
    put = (url, model) => {
        return Axios({
            url: `${DOMAIN_TASKFLOW}/${url}`,
            method: 'PUT',
            data: model,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_LC_KEY) } //JWT
        })
    }

    post = (url, model) => {
        return Axios({
            url: `${DOMAIN_TASKFLOW}/${url}`,
            method: 'POST',
            data: model,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_LC_KEY) } //JWT
        })
    }


    get = (url) => {
        return Axios({
            url: `${DOMAIN_TASKFLOW}/${url}`,
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_LC_KEY) } // token from backend to prove user has already logged in
        })
    }

    delete = (url) => {
        return Axios({
            url: `${DOMAIN_TASKFLOW}/${url}`,
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_LC_KEY) } // token from backend to prove user has already logged in
        })
    }
}