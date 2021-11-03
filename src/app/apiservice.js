import axios from "axios";

const  httpClient = axios.create({
    baseURL:'http://localhost:8080'

})

class ApiService{
    constructor(apiurl){
        this.apiurl=apiurl;
    }

    post(url,objeto){
        const requestUrl= `${this.apiurl}${url}`
        return httpClient.post(requestUrl,objeto);
    }
    
    put(url,objeto){
        const requestUrl= `${this.apiurl}${url}`
        return httpClient.put(requestUrl,objeto);
    }

    delete(url,id){
        const requestUrl= `${this.apiurl}${url}`
        return httpClient.delete(requestUrl,id);
    }

    get(url){
        const requestUrl= `${this.apiurl}${url}`
        return httpClient.get(requestUrl);
    }

    getPorId(url,objeto){
        const requestUrl= `${this.apiurl}${url}`
        return httpClient.get(requestUrl,objeto);
    }
}


export default ApiService