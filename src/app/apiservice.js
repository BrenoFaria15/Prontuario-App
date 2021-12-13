import axios from "axios";

const  httpClient = axios.create({
    baseURL:'https://prontuarioweb-api.herokuapp.com'

})

class ApiService{
    
    constructor(apiurl,){
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

    getRelatorio(url){
        const requestUrl= `${this.apiurl}${url}`
        const response = httpClient.get(requestUrl,{responseType:"blob"});
        //let bytes = response.data
       // var newBlob = new Blob([bytes], {type: 'application/pdf'});
        return  response.data
    }

    getPorId(url,objeto){
        const requestUrl= `${this.apiurl}${url}`
        return httpClient.get(requestUrl,objeto);
    }

    getPorConsulta(url,params){
        const requestUrl=`${this.apiurl}${url}${params}`
        return httpClient.get(requestUrl);
    }
}


export default ApiService