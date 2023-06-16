import { getAPI } from '../../api/index'

export async function getPollutionDetails(city, date){ 
    if(!date){
        const Details = getAPI(`https://api.openaq.org/v2/measurements?limit=10&location=${city}`)
        return Details
    } else{
        const Details = getAPI(`https://api.openaq.org/v2/measurements?limit=10&location=${city}&date=${date}`)
        return Details
    }

}