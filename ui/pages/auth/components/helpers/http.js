import axios from "axios";
const apiEndpoint = location.origin + "/api/"

export const fetchApiData = (method,path,others = {}) => {
    var config = {
        method: method,
        url: apiEndpoint + path
    }
    Object.assign(config, others)
    return axios(
        config
    )
}