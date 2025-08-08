import { CONSTANTS } from "../service/config.js";

export async function doAjaxCall(limit = 10, skip = 0){
    try {
        const response = await axios.get(`${CONSTANTS.API_URL}?limit=${limit}&skip=${skip}`);
        console.log("Response from server:", response.data);
    return response.data;
    } catch (err) {
        throw err;
    }
    
}