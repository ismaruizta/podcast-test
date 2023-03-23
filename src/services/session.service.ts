export function getSession(){
    const source = window.localStorage[ SessionTokens.PODCASTS ];
    return source ? JSON.parse(source) : [];
}

export function setSession( data ? : any[] ){
    if( data ){
        window.localStorage[ SessionTokens.PODCASTS ] = JSON.stringify(data);
    } else{
        delete window.localStorage[ SessionTokens.PODCASTS ];
    }
}


export enum SessionTokens{
    PODCASTS = "test-podcasts"
}