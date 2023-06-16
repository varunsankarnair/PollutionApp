import axios from 'axios';

export async function getAPI(path) {   
    try {
        const response = await axios.get(path)
        return response
    } catch (e) {
        return { error: e.toString() }
    }

}