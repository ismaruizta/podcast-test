export function getSession( token:string ){
    const source = window.localStorage[ token ];
    return source ? JSON.parse(source) : [];
}

export function setSession( token:string, data?: any[] ){
    if( data ){
        window.localStorage[ token ] = JSON.stringify(data);
    } else{
        delete window.localStorage[ token ];
    }
}


export enum SessionTokens{
    PODCASTS = "test-podcasts",
    EPISODES = "test-episodes"
}