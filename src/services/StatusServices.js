import Axios from "axios"
import baseService from "./base";

class StatusService extends baseService {

    getAllStatus = () => {
        return this.get(`Status/getAll`)
    }

}

export const statusService = new StatusService();