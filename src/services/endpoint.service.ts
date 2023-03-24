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