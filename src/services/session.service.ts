/**
 * @description a getSession function that returns data or an empty array
 * @param token 
 * @returns 
 */
export function getSession( token:string ){
    const source = window.localStorage[ token ];
    return source ? JSON.parse(source) : [];
}

/**
 * @description a setSession function set and delete the data
 * @param token 
 * @param data 
 */
export function setSession( token:string, data?: any ){
    if( data ){
        window.localStorage[ token ] = JSON.stringify(data);
    } else{
        delete window.localStorage[ token ];
    }
}


export enum SessionTokens{
    PODCASTS = "test-podcasts",
    EPISODES = "test-episodes",
    EXPIRE = "test-expire-date"
}