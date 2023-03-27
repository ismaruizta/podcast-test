/**
 * @description this function is used for redirecting the api calls 
 * to our local server which acts as reverse proxy for avoiding CORS problems in 
 * development time
 * @param url 
 * @returns a full url for consuming data
 */
export function getEndpoint( url:string ){
    if (process.env.NODE_ENV === environments.DEV){
        return "http://localhost:3001/api"+url;
    }else{
        return "https://itunes.apple.com"+url;
    }
}


export enum environments {
    DEV = "development",
    PRO = "production"
}