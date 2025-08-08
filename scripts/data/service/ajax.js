import { CONSTANTS } from "../service/config.js";
export async function doAjaxCall(){
    try {
        const response = await fetch(CONSTANTS.API_URL);
    const json = await response.json()
    return json;
    } catch (err) {
        throw err;
    }
    
}